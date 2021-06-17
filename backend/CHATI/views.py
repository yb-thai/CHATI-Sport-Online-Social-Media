from django.shortcuts import render
from rest_framework.serializers import Serializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from .permissions import *
from .serializer import StatusSerializer, CommentSerializer
from .models import Status, Event, User, Comment
from rest_framework.response import Response
# Create your views here.
from rest_framework import status
#status views
@api_view(["GET"])
def getAllStatus(request):
    statuses = Status.objects.all()
    serializer = StatusSerializer(statuses, many=True)
    return Response(serializer.data)

@api_view(["GET"])
def getStatusInformation(request, pk):
    status = Status.objects.get(_id=pk)
    serializer = StatusSerializer(status, many=False)
    return Response(serializer.data)

@api_view(["GET"])
def getAllStatusOfUser(request, pk):
    owner=User.objects.get(id=pk)
    status=Status.objects.all().filter(owner=owner)
    serializer = StatusSerializer(status, many=True)
    return Response(serializer.data)

@api_view(["POST", "GET"])
@permission_classes([IsAuthenticated])
def createStatus(request, pk):
    if request.method == "POST":
        user = request.user
        event = Event.objects.get(_id=pk)
        data = request.data
        status = Status.objects.create(
            owner=user,
            event=event, 
            title=data['title'],
            description=data['description'],
        )
        serializer = StatusSerializer(status, many=False)
        return Response(serializer.data)
    elif request.method == "GET":
        event = Event.objects.get(_id=pk)
        status = Status.objects.all().filter(event=event)
        serializer = StatusSerializer(status, many=True)
        return Response(serializer.data)

def validateUpdateStatusField(data=dict(), key = ''):
    return data[key] if key in data and data[key] else None
@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def updateStatus(request, pk):
    owner=request.user
    data=request.data
    statusInfo=Status.objects.get(_id=pk)
    if owner == statusInfo.owner or owner.is_staff:
        statusInfo.setTitle(validateUpdateStatusField(data, 'title')),
        statusInfo.setDescription(validateUpdateStatusField(data, 'description'))
        statusInfo.save()
        serializer=StatusSerializer(statusInfo, many=False)
        return Response(serializer.data)
    else:
        return Response({'detail': 'Not authorized to update this status'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def deleteStatus(request, pk):
    owner=request.user
    statusInfo=Status.objects.get(_id=pk)
    if owner == statusInfo.owner or owner.is_staff:
        statusInfo.delete()
        return Response("Status deleted successfully")
    else:
        return Response({'detail': 'Not authorized to delete this status'}, status=status.HTTP_400_BAD_REQUEST)

# comment views
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def createComment(request, pk):
    owner=request.user
    statusInfo=Status.objects.get(_id=pk)
    data=request.data
    comment = Comment.objects.create(
        owner=owner,
        status=statusInfo,
        content=data['content'],
    )
    serializer = CommentSerializer(comment, many=False)
    return Response(serializer.data)


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def updateComment(request, pk):
    owner=request.user
    data=request.data
    comment=Comment.objects.get(_id=pk)
    if owner == comment.owner or owner.is_staff:
        if data['content'] != '':
            comment.content = data['content']
            comment.save()
            serializer = CommentSerializer(comment, many=False)
            return Response(serializer.data)
        else:
            return Response({'detail': 'empty input'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({'detail': 'Not authorized to update this comment'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def deleteComment(request, pk):
    owner=request.user
    comment=Comment.objects.get(_id=pk)
    if owner == comment.owner or owner.is_staff:
        comment.delete()
        return Response("Comment deleted successfully")
    else:
        return Response({'detail': 'Not authorized to delete this comment'}, status=status.HTTP_400_BAD_REQUEST)