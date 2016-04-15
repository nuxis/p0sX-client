from pos.models.stock import *

from rest_framework import serializers


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name')


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ('id', 'name', 'price', 'stock', 'barcode', 'category')


class OrderLineSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderLine
        fields = ('id', 'ingredients', 'item')


class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ('id', 'name', 'stock', 'price')


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ('id', 'customer', 'date')


class PurchaseSerializer(serializers.Serializer):
    user = serializers.IntegerField(required=False)
    lines = OrderLineSerializer(many=True)

    def create(self, validated_data):
        user = validated_data.get('user')
        if user:
            order = Order.create(User.objects.get(pk=user))
        else:
            order = Order.create(None)
        order.save()
        for line in validated_data.get('lines'):
            l = OrderLine.create(line.get('item'), order)
            l.save()
            for ingredient in line.get('ingredients'):
                l.ingredients.add(ingredient)
            l.save()
        return Purchase(order)
