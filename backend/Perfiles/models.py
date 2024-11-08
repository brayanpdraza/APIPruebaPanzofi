from django.db import models

# Create your models here.
class MT_Perfiles(models.Model):
    ID_MT_Perfiles = models.AutoField(primary_key=True) 
    Nombre_Perfil= models.CharField(max_length=100)
    Jerarquia= models.IntegerField()
    Descripcion= models.TextField()

