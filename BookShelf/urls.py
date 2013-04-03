from django.conf.urls import patterns, include, url
from django.views.generic import TemplateView
from tastypie.api import Api
from books.resources import BookResource, AuthorResource
from users.resources import UserResource

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

v1_api = Api(api_name='v1')
v1_api.register(AuthorResource())
v1_api.register(BookResource())
v1_api.register(UserResource())

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'BookShelf.views.home', name='home'),
    # url(r'^BookShelf/', include('BookShelf.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),
    (r'^/?$', TemplateView.as_view(template_name="index.html")),
    (r'^api/', include(v1_api.urls)),
)
