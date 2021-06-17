from rest_framework import permissions

class IsOwner( permissions.BasePermission ):
	def has_object_permission( self, request, view, obj ):
		return obj == request.user or obj.owner == request.user or request.user.is_staff

class IsUser( permissions.BasePermission ):
	def has_object_permission( self, request, view, obj ):
		return request.user.pk == obj.id

class IsMember( permissions.BasePermission ):
	def has_object_permission( self, request, view, obj ):
		if obj.owner == request.user or request.user.is_staff:
			return True

		for member in obj.members.all():
			if member == request.user:
				return True

		return False

class IsLoggedIn( permissions.BasePermission ):
	def has_object_permission( self, request, view, obj ):
		return obj == request.user or request.user.is_staff

class IsAdmin( permissions.BasePermission ):
	def has_permission( self, request, view ):
		return request.user and request.user.is_staff

	def has_object_permission( self, request, view, obj ):
		return request.user and request.user.is_staff