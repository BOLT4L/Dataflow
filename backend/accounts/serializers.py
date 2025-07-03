from rest_framework import serializers
from .models import User, ScrapingConfiguration, ScrapingElement

class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'name', 'profession']

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

class ScrapingElementSerializer(serializers.ModelSerializer):
    class Meta:
        model = ScrapingElement
        fields = ['selector', 'attribute']

class ScrapingConfigurationSerializer(serializers.ModelSerializer):
    elements = ScrapingElementSerializer(many=True, required=False, default=list)
    class Meta:
        model = ScrapingConfiguration
        fields = ['id', 'name', 'url', 'frequency', 'output_format', 'elements', 'created_at', 'updated_at']

    def create(self, validated_data):
        elements_data = validated_data.pop('elements', [])
        config = ScrapingConfiguration.objects.create(**validated_data)
        for element_data in elements_data:
            ScrapingElement.objects.create(configuration=config, **element_data)
        return config 