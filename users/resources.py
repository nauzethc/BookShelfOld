from models import User
from tastypie.resources import ModelResource, ALL


class UserResource(ModelResource):
    class Meta:
        queryset = User.objects.all()
        fields = ['id', 'username', 'full_name']
        filtering = {
            'username': ALL,
        }

    def dehydrate(self, bundle):
        bundle.data['full_name'] = bundle.obj.get_full_name()
        return bundle
