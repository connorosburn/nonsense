from django.urls import path
from app.views.square_mover import square_mover_view
from app.views.index import index_view
from app.views.snake import snake_view

urlpatterns = [
    path('', index_view, name='index'),
    path('square_mover', square_mover_view, name='square_mover'),
    path('snake', snake_view, name='snake'),
]