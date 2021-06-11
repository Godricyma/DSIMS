from django.db import models

class Project(models.Model):
    URL_CHIOCES = (('jira', 'http://jira.tinno.com:8081'), ('oldjira', 'http://oldjira.tinno.com:8080'))
    pname = models.CharField(max_length=10, unique=True)
    pkey = models.CharField(max_length=10)
    version = models.CharField(max_length=10, null=True)
    URL = models.CharField(max_length=50, choices=URL_CHIOCES, default=URL_CHIOCES[0][1])
    LEAD = models.CharField(max_length=10, null=True)
    DESCRIPTION = models.CharField(max_length=200, null=True)

    def __str__(self):
        return self.pname
