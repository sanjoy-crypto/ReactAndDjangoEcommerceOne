from django.shortcuts import render
from rest_framework import generics, mixins, viewsets, views
from .serializers import *
from .models import *
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from django.contrib.auth.models import User


from rest_framework.decorators import api_view
from rest_framework.response import Response
# Create your views here.


class ProductView(generics.GenericAPIView, mixins.ListModelMixin, mixins.RetrieveModelMixin):
    queryset = Product.objects.all().order_by('-id')
    serializer_class = ProductSerializer

    lookup_field = "id"

    def get(self, request, id=None):
        if id:
            return self.retrieve(request)
        else:
            return self.list(request)


# @api_view(['GET'])
# def ProductView(request):
#     query = Product.objects.all().order_by('-id')
#     serializers = ProductSerializer(query,many=True)

#     return Response(serializers.data)


class CategoryView(viewsets.ViewSet):
    def list(self, request):
        query = Category.objects.all()
        serializers = CategorySerializer(query, many=True)
        return Response(serializers.data)

    def retrieve(self, request, pk=None):
        query = Category.objects.get(id=pk)
        serializers = CategorySerializer(query)
        serializers_data = serializers.data
        all_data = []
        category_products = Product.objects.filter(
            category_id=serializers_data['id'])
        category_products_serializer = ProductSerializer(
            category_products, many=True)
        serializers_data['category_products'] = category_products_serializer.data
        all_data.append(serializers_data)
        return Response(all_data)
    
class CategoryProductView(viewsets.ViewSet):
    def retrieve(self, request, pk=None):
        query = Category.objects.get(id=pk)
        serializers = CategorySerializer(query)
        serializers_data = serializers.data
        all_data = []
        category_products = Product.objects.filter(
            category_id=serializers_data['id'])[:4]
        category_products_serializer = ProductSerializer(
            category_products, many=True)
        serializers_data['category_products'] = category_products_serializer.data
        all_data.append(serializers_data)
        return Response(all_data)    


class ProfileView(views.APIView):
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]

    def get(self, request):
        try:
            query = Profile.objects.get(prouser=request.user)
            serializers = ProfileSerializer(query)
            res_msg = {"error": False, "data": serializers.data}
        except:
            res_msg = {"error": True,
                       "message": "Something is wrong ! Try Again !!!"}
        return Response(res_msg)


class UserDataUpdate(views.APIView):
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]

    def post(self, request):
        try:
            user = request.user
            data = request.data
            user_obj = User.objects.get(username=user)
            user_obj.first_name = data["first_name"]
            user_obj.last_name = data["last_name"]
            user_obj.email = data["email"]
            user_obj.save()
            res_msg = {"error": False, "message": "User data is updated"}
        except:
            res_msg = {"error": False,
                       "message": "Something is wrong . Try Again !"}

        return Response(res_msg)


class ProfileImageUpdate(views.APIView):
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]

    def post(self, request):
        try:
            user = request.user
            query = Profile.objects.get(prouser=user)
            data = request.data
            serializers = ProfileSerializer(
                query, data=data, context={"request": request})
            serializers.is_valid(raise_exception=True)
            serializers.save()
            return_res = {"message": "Profile is Updated"}

        except:
            return_res = {"message": "Something is wrong ... Try again !"}

        return Response(return_res)


class Mycart(viewsets.ViewSet):
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]
    def list(self,request):
        query = Cart.objects.filter(customer=request.user.profile)
        serializers = CartSerializer(query,many=True)
        all_data = []
        for cart in serializers.data:
            cart_product = CartProduct.objects.filter(cart=cart['id'])
            cart_product_serializer = CartProductSrializer(cart_product,many=True)
            cart["cartproduct"] = cart_product_serializer.data
            all_data.append(cart)
        return Response(all_data)


class Oldorders(viewsets.ViewSet):
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]
    
    def list(self,request):
        query = Order.objects.filter(cart__customer=request.user.profile)
        serializers = OrderSerializer(query,many=True)
        all_data = []
        for order in serializers.data:
            cart_product = CartProduct.objects.filter(cart_id = order['cart']['id'])
            cart_product_serializer = CartProductSrializer(cart_product,many=True)
            order['cartproduct'] = cart_product_serializer.data
            all_data.append(order)
        return Response(all_data)
    
    def retrieve(self,request,pk=None):
        try:
            query = Order.objects.get(id=pk)
            serializers = OrderSerializer(query)
            all_data = []
            mydata = serializers.data
            cart_product = CartProduct.objects.filter(cart_id=mydata['cart']['id'])
            cart_product_serializer = CartProductSrializer(cart_product,many=True)
            mydata["cartproduct"]=cart_product_serializer.data
            all_data.append(mydata)
            res_msg = {"error":"False","data":all_data}    
        except:
            res_msg = {"error":"True","msg":"Something is wrong . Try Again !"}    
        return Response(res_msg)
    
    def create(self,request):
        try:
            data = request.data
            cart_id = data['cartid']
            address = data['address']
            email = data['email']
            mobile = data['mobile']

            cart_obj = Cart.objects.get(id=cart_id)
            cart_obj.complete = True
            cart_obj.save()
            Order.objects.create(
                cart=cart_obj,
                address=address,
                email=email,
                mobile=mobile,
                total=cart_obj.total,
                discount=5
            )
            res_msg = {"error":False,'message':'Your Order is Complete'}
        except:
            res_msg = {"error":True,'message':'Something is wrong!!!'}

        return Response(res_msg)
    
    def destroy(self,request,pk=None):
        try:
            order_obj = Order.objects.get(id=pk)
            cart_obj = Cart.objects.get(id=order_obj.cart.id)
            
            order_obj.delete()
            cart_obj.delete()
            res_msg = {'error':False,'Message':'Order is Deleted'}
        except:
            res_msg = {'error':True,'Message':'Something is wrong'}
        
        return Response(res_msg)


class AddToCart(views.APIView):
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]
    
    def post(self,request):
        product_id = request.data['id']
        product_obj = Product.objects.get(id=product_id)
        # print(product_obj,"product_obj")        
        cart_cart = Cart.objects.filter(customer=request.user.profile).filter(complete=False).first()
        cart_product_obj = CartProduct.objects.filter(product__id=product_id).first()
        
        try:
            if cart_cart:
                # print(cart_cart)
                # print("OLD CART")
                this_product_in_cart = cart_cart.cartproduct_set.filter(product=product_obj)
                if this_product_in_cart.exists():
                    # print("OLD CART PRODUCT--OLD CART")
                    cartprod_uct = CartProduct.objects.filter(product=product_obj).filter(cart__complete=False).first()
                    cartprod_uct.quantity +=1
                    cartprod_uct.subtotal +=product_obj.selling_price
                    cartprod_uct.save()
                    cart_cart.total +=product_obj.selling_price
                    cart_cart.save()
                else:
                    # print("NEW CART PRODUCT CREATED--OLD CART")
                    cart_product_new=CartProduct.objects.create(
                        cart = cart_cart,
                        price  =product_obj.selling_price,
                        quantity = 1,
                        subtotal = product_obj.selling_price
                    )
                    cart_product_new.product.add(product_obj)
                    cart_cart.total +=product_obj.selling_price
                    cart_cart.save()
            else:
                # print(cart_cart)
                # print("NEW CART CREATED")
                Cart.objects.create(customer=request.user.profile,total=0,complete=False)
                new_cart = Cart.objects.filter(customer=request.user.profile).filter(complete=False).first()
                cart_product_new=CartProduct.objects.create(
                        cart = new_cart,
                        price  =product_obj.selling_price,
                        quantity = 1,
                        subtotal = product_obj.selling_price
                    )
                cart_product_new.product.add(product_obj)
                # print("NEW CART PRODUCT CREATED")    
                new_cart.total +=product_obj.selling_price
                new_cart.save()

            res_msg = {'error':False,'message':"Product add to card successfully","productid":product_id}
        
        except:
            res_msg = {'error':True,'message':"Product Not add!Somthing is Wromg"}

        return Response(res_msg)
    

class Updatecart(views.APIView):
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]
    
    def post(self,request):
        cart_product_id = request.data['id']
        cart_product = CartProduct.objects.get(id=cart_product_id)
        cart_obj = cart_product.cart
        
        cart_product.quantity += 1
        cart_product.subtotal += cart_product.price
        cart_product.save()
    
        cart_obj.total += cart_product.price
        cart_obj.save()
        
        return Response({'message':'CartProduct is Added'})
    
class Removecart(views.APIView):
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]
    
    def post(self,request):
        cart_product_id = request.data['id']
        cart_product = CartProduct.objects.get(id=cart_product_id)
        cart_obj = cart_product.cart
        
        cart_product.quantity -= 1
        cart_product.subtotal -= cart_product.price
        cart_product.save()
    
        cart_obj.total -= cart_product.price
        cart_obj.save()
        
        if(cart_product.quantity == 0):
            cart_product.delete()
        
        return Response({'message':'CartProduct is Removed'})
    
class Deletecart(views.APIView):
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]
    
    def post(self,request):
        cart_product_id = request.data['id']
        cart_product = CartProduct.objects.get(id=cart_product_id)
        cart_product.delete()
        return Response({'message':'CartProduct is Deleted'})
    
    
class DeleteFullCart(views.APIView):
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]
    
    def post(self,request):
        try:
            cart_id = request.data['id']
            cart_obj = Cart.objects.get(id=cart_id)
            cart_obj.delete()
            res_msg = {'error':False,'message':'Cart is Deleted'}
        except:
            res_msg = {'error':True,'message':'Cart is not Deleted'}
        
        return Response(res_msg)

class RegisterView(views.APIView):
    def post(self,request):
        serializers = UserSerializer(data=request.data)
        if serializers.is_valid():
            serializers.save()
            return Response({"error":False,"Message":f"User is created for '{serializers.data['username']}'"})

        return Response({"error":True,"message":"Something is wrong"})