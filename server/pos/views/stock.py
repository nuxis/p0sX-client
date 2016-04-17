from django.shortcuts import get_object_or_404

from pos.models.stock import Category, Ingredient, Item, Order, OrderLine, Purchase

from pos.serializers.stock import CategorySerializer, IngredientSerializer, ItemSerializer, OrderLineSerializer, OrderSerializer, PurchaseSerializer

from rest_framework import viewsets
from rest_framework.response import Response


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
            print('w00t')

        return Response(serializer.data)
