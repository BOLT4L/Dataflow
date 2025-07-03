from django.urls import path
from .views import GoogleRegisterView, ScrapingConfigurationListCreateView , GoogleLoginView

urlpatterns = [
    path('register-google/', GoogleRegisterView.as_view(), name='register-google'),
    path('scraping-configurations/', ScrapingConfigurationListCreateView.as_view(), name='scraping-configurations'),
    path('login-google/', GoogleLoginView.as_view(), name='login-google'),
] 