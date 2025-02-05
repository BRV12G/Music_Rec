from django.shortcuts import render

# Create your views here.
# music_rec/views.py
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import FileSystemStorage
import os

@csrf_exempt  # Disables CSRF validation for testing (don't use this in production)
def upload_photo(request):
    if request.method == 'POST' and request.FILES.get('photo') and request.POST.get('language'):
        image = request.FILES['photo']
        language = request.POST.get('language')

        # Save the file temporarily
        fs = FileSystemStorage(location='media')
        filename = fs.save(image.name, image)
        file_url = fs.url(filename)

        # Process the image and language to recommend songs
        recommendations = recommend_songs(file_url, language)

        # Clean up after processing
        os.remove(f"media/{filename}")

        return JsonResponse({'recommendations': recommendations})

    return JsonResponse({'error': 'Image and language are required!'}, status=400)

# music_rec/views.py

def recommend_songs(image_url, language):
    # Here, you can add your image processing and recommendation logic
    # For now, we are just returning mock data
    recommendations = [
        {
            'title': 'Song 1',
            'artist': 'Artist 1',
            'albumArt': 'https://via.placeholder.com/150',
        },
        {
            'title': 'Song 2',
            'artist': 'Artist 2',
            'albumArt': 'https://via.placeholder.com/150',
        },
    ]
    return recommendations
