from django.db import models
from django.template.defaultfilters import slugify
from tastypie.utils.timezone import now
from users.models import User


class Book(models.Model):
    title = models.CharField(max_length="50")
    datetime = models.DateTimeField(default=now)
    read = models.BooleanField(default=False)
    slug = models.SlugField()
    user = models.ForeignKey(User)

    def __unicode__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        return super(Book, self).save(*args, **kwargs)
