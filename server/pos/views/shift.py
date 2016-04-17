from django.utils import timezone

from pos.models.shift import Shift

from pos.serializers.shift import ShiftSerializer

from rest_framework import viewsets


class ShiftViewSet(viewsets.ModelViewSet):
    queryset = Shift.objects.all()
    serializer_class = ShiftSerializer

    def create(self, request, *args, **kwargs):
        if Shift.objects.count() > 0:
            current_shift = Shift.objects.latest('id')
            current_shift.end = timezone.now()
            current_shift.save()
            # TODO: Calculate how much money should be in the register
        return super(ShiftViewSet, self).create(request, args, kwargs)
