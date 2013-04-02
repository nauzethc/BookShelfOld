from models import User
from tastypie.resources import ModelResource, ALL
from tastypie.authorization import Authorization


class UserResource(ModelResource):
    class Meta:
        queryset = User.objects.all()
        authorization = Authorization()
        fields = ['id', 'username', 'first_name', 'last_name', 'full_name']
        filtering = {
            'username': ALL,
        }

    def dehydrate(self, bundle):
        if bundle.obj.get_full_name() != '':
            bundle.data['full_name'] = bundle.obj.get_full_name()
        else:
            bundle.data['full_name'] = bundle.obj.username.capitalize()
        return bundle
