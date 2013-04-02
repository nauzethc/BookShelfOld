from tastypie import fields
from tastypie.resources import ModelResource, ALL, ALL_WITH_RELATIONS
from tastypie.authorization import Authorization
from models import Book, Author
from users.resources import UserResource


class AuthorResource(ModelResource):
    class Meta:
        queryset = Author.objects.all()
        authorization = Authorization()
        fields = ['id', 'first_name', 'last_name', 'full_name']

    def dehydrate(self, bundle):
        bundle.data['full_name'] = bundle.obj.full_name
        return bundle


class BookResource(ModelResource):
    author = fields.ForeignKey(AuthorResource, 'author')
    user = fields.ForeignKey(UserResource, 'user')

    class Meta:
        queryset = Book.objects.all()
        authorization = Authorization()
        filtering = {
            'slug': ALL,
            'author': ALL_WITH_RELATIONS,
            'user': ALL_WITH_RELATIONS,
        }

    def dehydrate(self, bundle):
        bundle.data['author_full_name'] = bundle.obj.author.full_name
        return bundle
