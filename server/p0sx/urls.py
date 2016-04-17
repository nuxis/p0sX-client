from django.conf.urls import include, url
from django.contrib import admin

from pos.views.shift import ShiftViewSet
from pos.views.stock import CategoryViewSet, IngredientViewSet, ItemViewSet, OrderLineViewSet, OrderViewSet, PurchaseViewSet
from pos.views.user import UserViewSet

from rest_framework import routers

# Routers provide an easy way of automatically determining the URL conf.
router = routers.SimpleRouter()
router.register(r'users', UserViewSet)
router.register(r'categories', CategoryViewSet)
router.register(r'orderlines', OrderLineViewSet)
router.register(r'ingredients', IngredientViewSet)
router.register(r'items', ItemViewSet)
router.register(r'orders', OrderViewSet)
router.register(r'shifts', ShiftViewSet)
router.register(r'purchases', PurchaseViewSet, 'purchase')
urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^', include(router.urls)),
]
