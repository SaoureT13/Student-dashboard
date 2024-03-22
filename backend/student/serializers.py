from rest_framework import serializers
from .models import Students, Batchs, PaymentStatus


class StudentsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Students
        fields = [
            "id",
            "name",
            "email",
            "phone_number",
            "course",
            "batch",
            "payment_status",
        ]


class BatchsSerializer(serializers.ModelSerializer):
    students = StudentsSerializer(many=True, read_only=True, source="batch")

    class Meta:
        model= Batchs
        fields = ["id", "name", "students"]


class PaymentStatusSerializer(serializers.ModelSerializer):
    students = StudentsSerializer(many=True, read_only=True, source="payment_status")

    class Meta:
        model = PaymentStatus
        fields = ["id", "status", "students"]
