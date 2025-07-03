from django.contrib import admin
from .models import User, ScrapingConfiguration, ScrapingElement

# Register your models here.
admin.site.register(User)
admin.site.register(ScrapingConfiguration)
admin.site.register(ScrapingElement)
