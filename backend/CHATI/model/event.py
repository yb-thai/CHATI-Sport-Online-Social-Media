# All classes
from django.db import models
from django.shortcuts import get_object_or_404
from rest_framework import generics
from rest_framework import serializers
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.permissions import IsAuthenticated
from datetime import datetime
from CHATI.model import user
from CHATI.permissions import IsMember, IsOwner

class Event( models.Model ):
	class Meta:
		app_label = "CHATI"

	owner = models.ForeignKey( user.User, on_delete = models.CASCADE, related_name = "owner" )
	title =models.CharField( max_length = 100 )
	description = models.CharField( max_length = 1000 )
	location = models.CharField( max_length = 100 )
	start = models.DateTimeField()
	price = models.CharField( max_length = 100)
	members = models.ManyToManyField( user.User, related_name = "member" )
	createdAt = models.DateTimeField(auto_now_add=True)
	_id = models.AutoField(primary_key=True, editable=False)

class EventSerializer( serializers.ModelSerializer ):
	class Meta:
		model = Event

		fields = [ '_id', 'owner', 'title', 'description', 'location', 'start', 'price', 'members' ,'createdAt']


	owner = serializers.ReadOnlyField( source = 'owner.username' )

class EventViewSet( viewsets.ModelViewSet ):
	queryset = Event.objects.all()
	serializer_class = EventSerializer

	def get_queryset( self ):
		if self.request.user.is_authenticated:
			return Event.objects.all()

		# ONLY MEMBERS
		# user = self.request.user
		# return Event.objects.filter( members = user )

	def perform_create( self, serializer ):
		serializer.save( owner = self.request.user )

	def get_permissions( self ):
		permission_classes = [ IsAuthenticated ]

		if self.action == 'destroy' or self.action == 'update' or self.action == 'partial_update':
			permission_classes = [ IsAuthenticated, IsOwner ]
		elif self.action == 'list' or self.action == 'retrieve':
			permission_classes = [ IsAuthenticated ]
			# permission_classes = [ IsAuthenticated & IsMember ]

		return [ permission() for permission in permission_classes ]