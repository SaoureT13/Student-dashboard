from django.db import models


class Batchs(models.Model):
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return f"{self.name}"


class PaymentStatus(models.Model):
    status = models.CharField(max_length=255)

    def __str__(self) -> str:
        return f"{self.status}"


class Students(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField(max_length=255)
    phone_number = models.CharField(max_length=255)
    course = models.CharField(max_length=255)
    batch = models.ForeignKey(Batchs, related_name="batch", on_delete=models.CASCADE)
    payment_status = models.ForeignKey(
        PaymentStatus,
        related_name="payment_status",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )

    def __str__(self):
        return f"{self.name}"
