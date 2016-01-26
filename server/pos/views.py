from django.http import HttpResponse
from pos.models import *
from pos.serializers import *
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.utils import timezone
from rest_framework import viewsets


# ViewSets define the view behavior.
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = CustomerSerializer


class IngredientViewSet(viewsets.ModelViewSet):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class OrderLineViewSet(viewsets.ModelViewSet):
    queryset = OrderLine.objects.all()
    serializer_class = OrderLineSerializer


class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer


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


class PurchaseViewSet(viewsets.ViewSet):
    def list(self, request):
        orders = Order.objects.all()
        queryset = []
        for order in orders:
            queryset.append(Purchase(order))
        serializer = PurchaseSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        orders = Order.objects.all()
        order = get_object_or_404(orders, pk=pk)
        queryset = Purchase(order)
        serializer = PurchaseSerializer(queryset)
        return Response(serializer.data)

    def create(self, request):
        serializer = PurchaseSerializer(data=request.data)

        if serializer.is_valid():
            print(serializer.validated_data)

            p = serializer.create(serializer.validated_data)
            print(p)
        else:
            print("w00t")

        return Response(serializer.data)
