from pos.models.user import User

from rest_framework import serializers


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('name', 'max_credit', 'card')
