# Create your views here.

from django.http import HttpResponse
from django.shortcuts import render
from django.template import loader

def index(request):
    context={'title': 'index'}
    return render(request, 'base.html', context)
