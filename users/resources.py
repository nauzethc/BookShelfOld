from models import User
from tastypie.resources import ModelResource, ALL


class UserResource(ModelResource):
    class Meta:
        queryset = User.objects.all()
        fields = ['id', 'username', 'first_name', 'last_name']
        filtering = {
            'username': ALL,
        }
