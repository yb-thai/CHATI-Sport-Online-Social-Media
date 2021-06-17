from rest_framework import serializers
from .models import Comment, Status, Event, User



class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['owner', 'content', 'createdAt', '_id']
    owner = serializers.ReadOnlyField(source ='owner.username')

class StatusSerializer(serializers.ModelSerializer):
    comments = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Status
        fields = ['_id', 'event', 'owner', 'createdAt', 'title', 'description', 'comments']
    
    owner = serializers.ReadOnlyField(source = 'owner.username')
    event = serializers.ReadOnlyField(source = 'event.title')
    def get_comments(self, obj):
        comments = obj.comment_set.all()
        serializer = CommentSerializer(comments, many=True)
        return serializer.data