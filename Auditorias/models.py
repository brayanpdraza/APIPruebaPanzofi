from django.db import models

# Create your models here.
class Auditoria_Usuarios_Sesion(models.Model):
    ID_Auditoria_Usuarios_Sesion = models.AutoField(primary_key=True)
    ID_Usuarios = models.ForeignKey('Users.Usuarios', on_delete=models.PROTECT, null=True)
    Inicio_Sesion = models.DateTimeField()
    Cierre_Sesion = models.DateTimeField()
    Tiempo = models.IntegerField()  # Duración de la sesión en minutos
    Boton_1 = models.IntegerField()  # Conteo de clics del primer botón
    Boton_2 = models.IntegerField()  # Conteo de clics del segundo botón

    def __str__(self):
        return f"Auditoria de sesión para usuario con ID: {self.ID_Usuarios} del {self.Inicio_Sesion}"