from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
import uuid

# Create your models here.

class UserManager(BaseUserManager):
    def create_user(self, email, name, profession, password=None):
        if not email:
            raise ValueError('Users must have an email address')
        username = f"user_{uuid.uuid4().hex[:8]}"
        user = self.model(
            email=self.normalize_email(email),
            name=name,
            profession=profession,
            username=username,
        )
        user.set_unusable_password()
        user.save(using=self._db)
        return user

    def create_superuser(self, email, name, profession, password):
        user = self.create_user(
            email=email,
            name=name,
            profession=profession,
        )
        user.is_admin = True
        user.save(using=self._db)
        return user

class User(AbstractBaseUser):
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=255)
    profession = models.CharField(max_length=255, blank=True)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'profession']

    def __str__(self):
        return self.email

    @property
    def is_staff(self):
        return self.is_admin

class ScrapingConfiguration(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='scraping_configurations')
    name = models.CharField(max_length=255)
    url = models.URLField()
    frequency = models.CharField(max_length=50, choices=[('hourly', 'Hourly'), ('daily', 'Daily'), ('weekly', 'Weekly'), ('monthly', 'Monthly')])
    output_format = models.CharField(max_length=10, choices=[('json', 'JSON'), ('csv', 'CSV'), ('xml', 'XML')], default='json')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class ScrapingElement(models.Model):
    configuration = models.ForeignKey(ScrapingConfiguration, on_delete=models.CASCADE, related_name='elements')
    selector = models.CharField(max_length=255)
    attribute = models.CharField(max_length=50, default='text')
