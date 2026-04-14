from django.contrib.auth import authenticate
from django.shortcuts import get_object_or_404

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from api.models import *
from api.serializers import *


@api_view(["POST"])
def login_view(request):
    username = request.data.get("username")
    password = request.data.get("password")
    user = authenticate(request, username=username, password=password)

    if user is not None:
        refresh = RefreshToken.for_user(user)
    else:
        return Response({"error": "Bad Request"}, status=400)

    return Response({"access": str(refresh.access_token)})


@api_view(["POST"])
def register_view(request):
    email = request.data.get("email")
    username = request.data.get("username")
    password = request.data.get("password")

    try:
        User.objects.create_user(email=email, username=username, password=password)
    except Exception:
        return Response({"error": "Bad Request"}, status=400)

    user = authenticate(request, username=username, password=password)

    if user is not None:
        refresh = RefreshToken.for_user(user)
    else:
        return Response({"error": "Bad Request"}, status=400)

    return Response({"access": str(refresh.access_token)})


@api_view(["POST"])
def logout_view(request):
    refresh_token = request.data.get("refresh")
    RefreshToken(refresh_token).blacklist()

    return Response({"message": "OK"}, status=200)


class CategoryDetailView(APIView):
    def get(self, request, id):
        category = get_object_or_404(Category, id=id)
        json = CategorySerializer(category).data

        return Response({"get": json})


class CategoryListView(APIView):
    def get(self, request):
        categories = Category.objects.all()
        json = CategorySerializer(categories, many=True).data

        return Response(json)

    def post(self, request):
        if not request.user.is_authenticated:
            return Response({"error": "Unauthorized"}, status=401)
            
        name = request.data.get("name")

        try:
            Category.objects.create(name=name)
        except Exception:
            return Response({"error": "Bad Request"}, status=400)

        return Response({"message": "Created"}, status=201)


class ThreadDetailView(APIView):
    def get(self, request, id):
        thread = get_object_or_404(Thread, id=id)
        json = ThreadSerializer(thread).data

        return Response({"get": json})

    def put(self, request, id):
        if not request.user.is_authenticated:
            return Response({"error": "Unauthorized"}, status=401)

        thread = get_object_or_404(Thread, id=id)

        if thread.author == request.user:
            thread.title = request.data.get("title")
            thread.content = request.data.get("content")
            category_id = request.data.get("category_id")
            thread.category = get_object_or_404(Category, id=category_id)

            thread.save()
        else:
            return Response({"error": "Forbidden"}, status=403)

        return Response({"message": "OK"}, status=200)

    def delete(self, request, id):
        if not request.user.is_authenticated:
            return Response({"error": "Unauthorized"}, status=401)

        thread = get_object_or_404(Thread, id=id)

        if thread.author == request.user:
            thread.delete()
        else:
            return Response({"error": "Forbidden"}, status=403)

        return Response(status=204)


class ThreadListView(APIView):
    def get(self, request):
        category_id = request.query_params.get("category_id")

        if category_id is not None:
            category = get_object_or_404(Category, id=category_id)
            threads = Thread.objects.filter(category=category)
        else:
            threads = Thread.objects.all()

        json = ThreadSerializer(threads, many=True).data

        return Response({"get": json})

    def post(self, request):
        if not request.user.is_authenticated:
            return Response({"error": "Unauthorized"}, status=401)

        title = request.data.get("title")
        content = request.data.get("content")
        category_id = request.data.get("category_id")
        category = get_object_or_404(Category, id=category_id)

        Thread.objects.create(title=title, content=content, category=category, author=request.user)

        return Response({"message": "Created"}, status=201)


class PostDetailView(APIView):
    def get(self, request, thread_id):
        thread = get_object_or_404(Thread, id=thread_id)
        posts = Post.objects.filter(thread=thread)
        json = PostSerializer(posts, many=True).data

        return Response({"get": json})

    def put(self, request, id):
        if not request.user.is_authenticated:
            return Response({"error": "Unauthorized"}, status=401)

        post = get_object_or_404(Post, id=id)

        if post.author == request.user:
            post.content = request.data.get("content")
            post.save()
        else:
            return Response({"error": "Forbidden"}, status=403)

        return Response({"message": "OK"}, status=200)

    def delete(self, request, id):
        if not request.user.is_authenticated:
            return Response({"error": "Unauthorized"}, status=401)

        post = get_object_or_404(Post, id=id)

        if post.author == request.user:
            post.delete()
        else:
            return Response({"error": "Forbidden"}, status=403)

        return Response(status=204)


class PostListView(APIView):
    def post(self, request):
        if not request.user.is_authenticated:
            return Response({"error": "Unauthorized"}, status=401)

        content = request.data.get("content")
        thread_id = request.data.get("thread_id")
        thread = get_object_or_404(Thread, id=thread_id)

        Post.objects.create(content=content, thread=thread, author=request.user)

        return Response({"message": "Created"}, status=201)
