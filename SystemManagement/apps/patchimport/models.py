from django.db import models


from django.contrib.auth.models import User

# Create your models here.


class Patch(models.Model):
    last_patch_number = models.CharField(max_length=20)
    package_name = models.CharField(max_length=100)
    package_url = models.CharField(max_length=100)
    download_package = models.BooleanField()
    jira_key = models.CharField(max_length=20)
    project_name = models.CharField(max_length=20)
    ip = models.GenericIPAddressField()
    add_date = models.DateTimeField(auto_now_add=True)
    complete_date = models.DateTimeField(auto_now=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    status = models.IntegerField(default=2)

    class Meta:
        ordering = ['add_date']
