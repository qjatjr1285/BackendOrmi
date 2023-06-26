from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    email = models.EmailField(unique=True, max_length=255) # email 값이 기본키가 된다
    name = models.CharField(max_length=50, null=True, blank=True)
    password = models.CharField(max_length=50)
    registered_date = models.DateTimeField(auto_now_add=True)
    # auto_now_add 는 처음 한번 생성했을 때(수정이 필요 없을 때)
    # auto_now 는 업데이트 할 때마다(수정이 필요할 때)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.name