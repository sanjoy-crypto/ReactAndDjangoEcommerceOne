from django.urls import path, include
from .views import *
from rest_framework import routers

route = routers.DefaultRouter()

route.register("category", CategoryView, basename="CategoryView")
route.register("category_product", CategoryProductView,basename="category_product")
route.register("cart", Mycart, basename="cart")
route.register("orders",Oldorders, basename="orders")

urlpatterns = [
    path("", include(route.urls)),
    path('product/', ProductView.as_view(), name='product'),
    path('product/<int:id>/', ProductView.as_view(), name='product'),
    path('profile/', ProfileView.as_view(), name="profile"),
    path('userdataupdate/', UserDataUpdate.as_view(), name="userdataupdate"),
    path('profileimageupdate/', ProfileImageUpdate.as_view(),
         name="profileimageupdate"),
    path('addtocart/',AddToCart.as_view(),name="addtocart"),
    path('updatecart/',Updatecart.as_view(),name='updatecart'),
    path('removecart/',Removecart.as_view(),name='removecart'),
    path('deletecart/',Deletecart.as_view(),name='deletecart'),

    path('deletefullcart/',DeleteFullCart.as_view(),name='deletefullcart'),
    
    path('register/',RegisterView.as_view(),name="register")
    
]
