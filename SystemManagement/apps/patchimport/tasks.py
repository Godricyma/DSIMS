# Create your tasks here
import time

from celery import shared_task
from .models import Patch


@shared_task
def start_patch_import(patch_id):
    patch = Patch.objects.get(id=patch_id)
    time.sleep(30)
    status = 0
    patch.status = status
    patch.save()
