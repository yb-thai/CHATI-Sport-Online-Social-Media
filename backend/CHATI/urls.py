from django.conf.urls import include, url
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework import routers

from CHATI.model.user import UserViewSet
from CHATI.model.event import EventViewSet
from . import views
router = routers.DefaultRouter()
router.register( r'users', UserViewSet )
router.register( r'events', EventViewSet )
urlpatterns = [
	#for status urls
	path('statuses/', views.getAllStatus, name="statuses"),
	path('status/<str:pk>/', views.getStatusInformation, name="status"),
	path('status/user/<str:pk>/', views.getAllStatusOfUser, name="status-user"),
	path('status/event/<str:pk>/', views.createStatus, name="create-status"),
	path('status/update/<str:pk>/', views.updateStatus, name="update-status"),
	path('status/delete/<str:pk>/', views.deleteStatus, name="delete-status"),
	#for comment urls
	path('comment/status/<str:pk>/', views.createComment, name="create-comment"),
	path('comment/update/<str:pk>/', views.updateComment, name="update-comment"),
	path('comment/delete/<str:pk>/', views.deleteComment, name="delete-comment"),
	url( r'^', include( router.urls )),
	url( r'^auth/', include( 'rest_auth.urls' )),
]