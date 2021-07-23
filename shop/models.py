from django.db import models
from django.contrib.auth.models import User
from django.utils.safestring import mark_safe
from ckeditor.fields import RichTextField
# Create your models here.

class Profile(models.Model):
    prouser = models.OneToOneField(User,on_delete=models.CASCADE,blank=True,null=True)
    image = models.ImageField(upload_to='profile_pic/',null=True,blank=True)

    def __str__(self):
        return self.prouser.username

    def image_tag(self):
        if self.image.url is not None:
            return mark_safe('<img src="{}" height="50px" />'.format(self.image.url))
        else:
            return ''

class Category(models.Model):
    title = models.CharField(max_length=100)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class Product(models.Model):
    title = models.CharField(max_length=100)

    category = models.ForeignKey(Category,on_delete=models.CASCADE,blank=True,null=True)
    image = models.ImageField(upload_to='product_pic/',null=True,blank=True)
    market_price = models.PositiveIntegerField()
    selling_price = models.PositiveIntegerField()
    description = models.TextField(blank=True, null=True)
    details = models.TextField(blank=True, null=True)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

    def image_tag(self):
        if self.image.url is not None:
            return mark_safe('<img src="{}" height="50px" />'.format(self.image.url))
        else:
            return ''
 
class Cart(models.Model):
    customer = models.ForeignKey(Profile, on_delete=models.CASCADE)
    total = models.PositiveIntegerField()
    complete = models.BooleanField(default=False)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Customer=={self.customer}==Total=={self.total}==Complete=={self.complete}"

class CartProduct(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    product = models.ManyToManyField(Product)
    price = models.PositiveIntegerField()
    quantity = models.PositiveIntegerField()
    subtotal = models.PositiveIntegerField()

    def __str__(self):
        return f"Cart=={self.cart.id}==Quantity=={self.quantity}" 


STATUS = {
        ("Order Received","Order Received"),
        ("Order Processing","Order Processing"),
        ("On the way","On the way"),
        ("Order Completed","Order Completed"),
        ("Order Canceled","Order Canceled"),
}
class Order(models.Model):
   
    cart = models.OneToOneField(Cart,on_delete=models.CASCADE)
    address = models.CharField(max_length=100)
    mobile = models.CharField(max_length=12)
    email = models.CharField(max_length=50)
    total = models.PositiveIntegerField()
    discount = models.PositiveIntegerField()
    status = models.CharField(max_length=30,choices=STATUS,default="Order Received")
    date = models.DateTimeField(auto_now_add=True)
    payment = models.BooleanField(default=False)

    def __str__(self):
        return f"Order=={self.id}==Address=={self.address}==Total=={self.total}==Status=={self.status}"
    

