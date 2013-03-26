from tastypie import fields
from tastypie.resources import ModelResource, ALL, ALL_WITH_RELATIONS
from tastypie.authorization import Authorization
from models import Book
from users.resources import UserResource


class BookResource(ModelResource):
    user = fields.ForeignKey(UserResource, 'user')

    class Meta:
        queryset = Book.objects.all()
        authorization = Authorization()
        filtering = {
            'slug': ALL,
            'user': ALL_WITH_RELATIONS,
        }
