from .serializers import *
from .models import *
from django.contrib.auth.models import User
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse


class BatchsViewSet(viewsets.ModelViewSet):
    queryset = Batchs.objects.all()
    serializer_class = BatchsSerializer


class PaymentStatusViewSet(viewsets.ModelViewSet):
    queryset = PaymentStatus.objects.all()
    serializer_class = PaymentStatusSerializer


class StudentsViewSet(viewsets.ModelViewSet):
    queryset = Students.objects.all()
    serializer_class = StudentsSerializer


@api_view(["GET"])
def api_root(request, format=None):
    return Response(
        {
            "student": reverse("student-list", request=request, format=format),
            "batch": reverse("batch-list", request=request, format=format),
            "paymentStatus": reverse(
                "paymentStatus-list", request=request, format=format
            ),
        }
    )
