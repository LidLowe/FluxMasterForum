from django.db import models
from django.contrib.auth.models import User


class Category(models.Model):
    name = models.CharField(max_length=255)

    # description = models.TextField


class Thread(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    category = models.ForeignKey(Category, on_delete=models.PROTECT)
    author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)

    """
    is_locked = models.BooleanField(default=False)
    is_pinned = models.BooleanField(default=False)
    created_at = models.DateTimeField
    updated_at = models.DateTimeField
    """


class Post(models.Model):
    content = models.TextField()
    thread = models.ForeignKey(Thread, on_delete=models.PROTECT)
    author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)

    """
    created_at = models.DateTimeField
    updated_at = models.DateTimeField
    """
