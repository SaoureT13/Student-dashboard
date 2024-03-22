from django.urls import include, path
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework import renderers
from .views import *

student_list = StudentsViewSet.as_view({"get": "list", "post": "create"})
student_detail = StudentsViewSet.as_view(
    {"get": "retrieve", "put": "update", "delete": "destroy", "patch": "partial_update"}
)

batch_list = BatchsViewSet.as_view({"get": "list", "post": "create"})
batch_detail = BatchsViewSet.as_view(
    {"get": "retrieve", "put": "update", "delete": "destroy", "patch": "partial_update"}
)

paymentStatus_list = PaymentStatusViewSet.as_view({"get": "list", "post": "create"})
paymentStatus_detail = PaymentStatusViewSet.as_view(
    {"get": "retrieve", "put": "update", "delete": "destroy", "patch": "partial_update"}
)

urlpatterns = format_suffix_patterns(
    [
        path("", api_root),
        path("students/", student_list, name="student-list"),
        path("student/<int:pk>", student_detail, name="student-detail"),
        path("batchs/", batch_list, name="batch-list"),
        path("batch/<int:pk>", batch_detail, name="batch-detail"),
        path("paymentStatus/", paymentStatus_list, name="paymentStatus-list"),
        path("paymentStatus/<int:pk>", paymentStatus_detail, name="paymentStatus-detail"),
    ]
)

urlpatterns += [path("api-auth/", include("rest_framework.urls"))]
