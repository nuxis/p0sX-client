from django.contrib import admin

from pos.models.shift import Shift
from pos.models.stock import Category, Ingredient, Item, Order, OrderLine
from pos.models.user import User


class CustomerAdmin(admin.ModelAdmin):
    pass


class IngredientAdmin(admin.ModelAdmin):
    pass


class ItemAdmin(admin.ModelAdmin):
    pass


class OrderAdmin(admin.ModelAdmin):
    pass


class CategoryAdmin(admin.ModelAdmin):
    pass


class OrderLineAdmin(admin.ModelAdmin):
    pass


class ShiftAdmin(admin.ModelAdmin):
    pass


admin.site.register(User, CustomerAdmin)
admin.site.register(Ingredient, IngredientAdmin)
admin.site.register(Item, ItemAdmin)
admin.site.register(Order, OrderAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(OrderLine, OrderLineAdmin)
admin.site.register(Shift, ShiftAdmin)
