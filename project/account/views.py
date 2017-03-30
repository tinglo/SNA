from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.shortcuts import render

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Group


from rest_framework.authentication import SessionAuthentication 
class CsrfExemptSessionAuthentication(SessionAuthentication):
    def enforce_csrf(self, request):
        return  # To not perform the csrf check previously happening


class UserInfo(APIView):

    def get(self, request):
        return Response(request.user.username)


class SignUp(APIView):
    
    def post(self, request):
        
        username = request.data.get('username', '')
        password = request.data.get('password', '')
        group_name = request.data.get('group', '')
        
        if username == '' or password == '':
            return Response(status=status.HTTP_400_BAD_REQUEST)

        # create user
        new_user = User()
        new_user.username = username
        new_user.set_password(password)
        new_user.save()

        group, created = Group.objects.get_or_create(name=group_name)
        group.user = new_user
        group.save()
        return Response("it's work")


class SignIn(APIView):

    template = 'signin.html'

    def get(self, request):
        return render(request, SignIn.template)
   
    def post(self, request):

        if request.user.is_authenticated():
            return Response(status=status.HTTP_400_BAD_REQUEST)

        username = request.data.get('username', '')
        password = request.data.get('password', '')

        user = authenticate(username=username, password=password)
        if user is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        login(request, user)
        return Response(user.username, status=status.HTTP_200_OK)


class SignOut(APIView):
    
    authentication_classes = (CsrfExemptSessionAuthentication,)
 
    def post(self, request):
        logout(request)
        return Response("logout successfully", status=status.HTTP_200_OK)


class ChangePassword(APIView):
    
    authentication_classes = (CsrfExemptSessionAuthentication,)
    template = 'change_password.html'

    def get(self, request):
        return render(request, ChangePassword.template)

    def post(self, request):
        if not request.user.is_authenticated():
            return Response(status=status.HTTP_400_BAD_REQUEST)

        origin_password = request.data.get('origin_password', '')
        new_password = request.data.get('new_password', '')
        confirm_new_password = request.data.get('confirm_new_password', '')
        
        if new_password != confirm_new_password:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        current_user = request.user
        authenticated_user = authenticate(username=current_user.username, password=origin_password)
        if current_user != authenticated_user:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        authenticated_user.set_password(new_password)
        authenticated_user.save()
        
        return Response(status=status.HTTP_200_OK)
        
