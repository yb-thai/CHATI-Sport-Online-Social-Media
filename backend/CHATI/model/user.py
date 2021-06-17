# Just user
from django.http import Http404
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from django.contrib.auth.hashers import make_password

from rest_framework.permissions import IsAuthenticated, AllowAny
from CHATI.permissions import IsOwner, IsAdmin, IsUser

# All classes
from rest_framework import serializers
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework import generics
from rest_framework import status, response


class User( AbstractUser ):
	def __str__( self ):
		return f'{ self.username }'

class UserProfile( models.Model ):
	user = models.OneToOneField(
			settings.AUTH_USER_MODEL,
			on_delete = models.CASCADE,
			related_name = 'profile' )

	# extra attributes can go here
	favorite_sport = models.CharField( max_length = 100, default = 'Pro Wrestling' )
	organization = models.CharField(max_length=100, default='any')
	role = models.CharField(max_length=100, default='any')

# SERIALIZE
class UserProfileSerializer( serializers.ModelSerializer ):
	class Meta:
		model = UserProfile
		fields = [ 'favorite_sport', 'organization', 'role' ]

class UserSerializer( serializers.HyperlinkedModelSerializer ):
	profile = UserProfileSerializer( required = True )

	class Meta:
		model = User
		fields = ( 'id', 'url', 'username', 'email', 'first_name', 'last_name', 'password', 'profile' )
		extra_kwargs = { 'username': { 'write_only': True }, 'password': { 'write_only': True }}

	def create( self, data ):
		profile_data = data.pop( 'profile' )
		password = data.pop( 'password' )
		user = User( **data )
		user.set_password( password )
		user.save()

		UserProfile.objects.create( user = user, **profile_data )
		return user

	def update( self, obj, data ):
		profile_data = data.pop( 'profile' )
		profile = obj.profile

		obj.email = data.get( 'email', obj.email )
		obj.first_name = data.get( 'first_name', obj.first_name )
		obj.last_name = data.get( 'last_name', obj.last_name )
		if data.get('password', obj.password) != "":	
			obj.password = make_password(data.get('password', obj.password))
		obj.save()

		# extra attributes go here
		profile.favorite_sport = profile_data.get( 'favorite_sport', profile.favorite_sport )
		profile.organization = profile_data.get( 'organization', profile.organization )
		profile.role = profile_data.get( 'role', profile.role )
		profile.save()

		return obj

# VIEW
class UserViewSet( viewsets.ModelViewSet ):
	queryset = User.objects.all()
	serializer_class = UserSerializer

	def destroy( self, request, *args, **kwargs ):
		try:
			obj = self.get_object()
			if obj.id == request.user.id:
				self.perform_destroy( obj )
		except:
			pass
		return response.Response( status = status.HTTP_204_NO_CONTENT )

	def get_queryset( self ):
		if self.request.user.is_authenticated:
			return User.objects.all()

	def get_permissions( self ):
		permission_classes = []
		if self.action == 'create':
			permission_classes = [ AllowAny ]
		elif self.action == 'retrieve':
			permission_classes = [ IsAuthenticated ]
		elif self.action == 'update' or self.action == 'partial_update':
			permission_classes = [ IsAuthenticated, IsUser ]
		elif self.action == 'list':
			permission_classes = [ IsAuthenticated ]
		elif self.action == 'destory':
			permission_classes = [ IsUser ]

		return[ permission() for permission in permission_classes ]