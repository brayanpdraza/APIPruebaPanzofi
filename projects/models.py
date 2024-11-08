from django.db import models

# Create your models here.

class MT_Landing_Page(models.Model):
    ID_MT_Landing_Page = models.AutoField(primary_key=True) 
    Imagen= models.BinaryField()
    Titulo= models.CharField(max_length=100)
    Descripcion= models.TextField(max_length=100)

