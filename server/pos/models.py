from django.db import models
from rest_framework import serializers

class Customer(models.Model):
    name = models.CharField(max_length=255)
    max_credit = models.IntegerField()
    card = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class Ingredient(models.Model):
    name = models.CharField(max_length=255)
    price = models.CharField(max_length=255)
    stock = models.IntegerField()

    def __str__(self):
        return self.name


class Category(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class Item(models.Model):
    name = models.CharField(max_length=255)
    price = models.IntegerField()
    stock = models.IntegerField()
    barcode = models.CharField(max_length=255)
    #image = models.ImageField()
    category = models.ForeignKey(Category)

    def __str__(self):
        return self.name



class Order(models.Model):
    customer = models.ForeignKey(Customer)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.customer) + " " + self.date.strftime('%Y-%m-%d %H:%M:%S')


class Purchase(object):
    order = None
    orderlines = None


# Serializers define the API representation.
class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ('name', 'max_credit', 'card')


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ('id', 'name')


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ('id', 'name', 'price', 'stock', 'barcode', 'category')


class OrderLineSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderLine
        fields = ('id', 'ingredients', 'item', 'order')


class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ('id', 'name')


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ('id', 'customer', 'date')


class PurchaseSerializer(serializers.Serializer):
    order = OrderSerializer
    orderlines = OrderLineSerializer


class OrderLine(models.Model):
    ingredients = models.ManyToManyField(Ingredient, blank=True)
    item = models.ForeignKey(Item)
    order = models.ForeignKey(Order)

    def __str__(self):
        s = self.item.name

        if len(self.ingredients.all()) > 0:
            s += " med "
            s += ", ".join([str(item).lower() for item in self.ingredients.all()])

        return s
