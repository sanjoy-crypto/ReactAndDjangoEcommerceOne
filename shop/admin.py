from django.contrib import admin
from .models import *


# Register your models here.
class ProfileAdmin(admin.ModelAdmin):
    list_display = ['prouser','id','image_tag']

class ProductAdmin(admin.ModelAdmin):
    list_display = ['title','category','selling_price','id','date','image_tag']


admin.site.register(Profile,ProfileAdmin)
admin.site.register(Category)
admin.site.register(Product,ProductAdmin)
admin.site.register(Cart)
admin.site.register(CartProduct)
admin.site.register(Order)