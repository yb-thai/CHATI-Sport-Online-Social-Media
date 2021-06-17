from django.db import models
from .model.user import User, UserProfile
from .model.event import Event
# Create your models here.
class Status(models.Model):
    class Meta:
    	app_label = "CHATI"
        
    event = models.ForeignKey(Event, on_delete = models.CASCADE, related_name = "event")
    owner = models.ForeignKey(User, on_delete = models.CASCADE, related_name = "status_owner" )
    createdAt= models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)
    title = models.CharField(max_length=100, blank=True)
    description = models.TextField(null=True, blank=True)

    def __str__(self) -> str:
        return self.title

    def setTitle(self, title):
        if title:
            self.title = title
    
    def setDescription(self, description):
        if description:
            self.description = description

class Comment(models.Model):
    class Meta:
        app_label = "CHATI"
    
    status = models.ForeignKey(Status, on_delete=models.CASCADE)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField(max_length=2000)
    createdAt= models.DateTimeField(auto_now_add=True) 
    _id = models.AutoField(primary_key=True, editable=False)
