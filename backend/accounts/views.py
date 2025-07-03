from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserRegisterSerializer
from .models import ScrapingConfiguration, ScrapingElement
from .serializers import ScrapingConfigurationSerializer, ScrapingElementSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from bs4 import BeautifulSoup
import requests as pyrequests

# Create your views here.

class GoogleRegisterView(APIView):
    def post(self, request):
        email = request.data.get('email')
        name = request.data.get('name', '')
        profession = request.data.get('profession', '')
        from .models import User
        user, created = User.objects.get_or_create(email=email, defaults={'name': name, 'profession': profession})
        return Response({'username': user.username, 'email': user.email, 'created': created}, status=status.HTTP_200_OK)

class ScrapingConfigurationListCreateView(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        email = request.query_params.get('email')
        if email:
            from .models import User
            try:
                user = User.objects.get(email=email)
                configs = ScrapingConfiguration.objects.filter(user=user)
            except User.DoesNotExist:
                configs = ScrapingConfiguration.objects.none()
        elif request.user and request.user.is_authenticated:
            configs = ScrapingConfiguration.objects.filter(user=request.user)
        else:
            return Response({'error': 'User email required'}, status=status.HTTP_400_BAD_REQUEST)
        serializer = ScrapingConfigurationSerializer(configs, many=True)
        return Response(serializer.data)
    def post(self, request):
        data = request.data.copy()
        elements_data = data.pop('elements', [])
        # Accept user email in the request for unauthenticated creation
        email = data.pop('email', None)
        user = None
        if email:
            from .models import User
            user, _ = User.objects.get_or_create(email=email, defaults={'name': '', 'profession': ''})
        elif request.user and request.user.is_authenticated:
            user = request.user
        else:
            return Response({'error': 'User email required'}, status=status.HTTP_400_BAD_REQUEST)
        serializer = ScrapingConfigurationSerializer(data=data)
        if serializer.is_valid():
            config = serializer.save(user=user)
            for element in elements_data:
                ScrapingElement.objects.create(configuration=config, **element)
            # Run scraping logic here
            result = run_scraping(config)
            return Response({"config": ScrapingConfigurationSerializer(config).data, "scraped_data": result}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

def run_scraping(config):
    try:
        response = pyrequests.get(config.url)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, 'html.parser')
        data = []
        for element in config.elements.all():
            selector = element.selector
            attribute = element.attribute
            selected = soup.select(selector)
            extracted = []
            for tag in selected:
                if attribute == 'text':
                    extracted.append(tag.get_text(strip=True))
                else:
                    extracted.append(tag.get(attribute, ''))
            data.append({"selector": selector, "attribute": attribute, "values": extracted})
        return data
    except Exception as e:
        return {"error": str(e)}

class GoogleLoginView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        id_token = request.data.get('idToken')
        if not id_token:
            return Response({'error': 'No ID token provided'}, status=status.HTTP_400_BAD_REQUEST)
        # Verify the token with Google
        google_verify_url = f'https://oauth2.googleapis.com/tokeninfo?id_token={id_token}'
        resp = pyrequests.get(google_verify_url)
        if resp.status_code != 200:
            return Response({'error': 'Invalid ID token'}, status=status.HTTP_400_BAD_REQUEST)
        payload = resp.json()
        email = payload.get('email')
        name = payload.get('name', '')
        profession = ''  # You can extend this to accept more fields
        from .models import User
        user, created = User.objects.get_or_create(email=email, defaults={'name': name, 'profession': profession})
        return Response({'username': user.username, 'email': user.email, 'created': created}, status=status.HTTP_200_OK)
