from django.http import HttpResponse
from django.template import loader

def square_mover_view(request):
    template = loader.get_template('square_mover.html')
    return HttpResponse(template.render({}, request))