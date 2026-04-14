from django.urls import path

from api.views import *


urlpatterns = [
    path("sign-in/", login_view, name="sign-in"),
    path("sign-up/", register_view, name="sign-up"),
    path("sign-out/", logout_view, name="sign-out"),

    path("threads/<int:id>/", ThreadDetailView.as_view(), name="thread_detail"),
    path("threads/", ThreadListView.as_view(), name="thread_list"),

    path("posts/<int:id>/", PostDetailView.as_view(), name="post_detail"),
    path("threads/<int:thread_id>/posts/", PostListView.as_view(), name="post_list"),
    path("posts/", PostListView.as_view(), name="posts"),

    path("categories/<int:id>/", CategoryDetailView.as_view(), name="category_detail"),
    path("categories/", CategoryListView.as_view(), name="category_list"),
]
