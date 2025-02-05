# music_rec/urls.py
from django.urls import path
from .views import upload_photo

urlpatterns = [
    path('upload/', upload_photo, name='upload_photo'),
]
