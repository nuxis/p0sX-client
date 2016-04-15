from pos.models.shift import Shift

from rest_framework import serializers


class ShiftSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shift
        fields = ('id', 'start', 'end', 'leader')
