from django.http import HttpResponse
from django.template import loader

def snake_view(request):
    template = loader.get_template('snake.html')
    return HttpResponse(template.render({}, request))