from django.db import models
from django.utils import timezone
from Perfiles.models import MT_Perfiles  # Asegúrate de importar el modelo correctamente
from Auditorias.models import Auditoria_Usuarios_Sesion

class Usuarios(models.Model):
    ID_Usuarios = models.AutoField(primary_key=True)
    ID_MT_Perfiles = models.ForeignKey(MT_Perfiles, on_delete=models.PROTECT, null=True)
    Nombre_Usuario = models.CharField(max_length=100)
    Clave = models.CharField(max_length=100)

class Usuarios_Sesion(models.Model):
    ID_Usuarios_Sesion = models.AutoField(primary_key=True)
    ID_Usuarios = models.ForeignKey(Usuarios, on_delete=models.PROTECT, null=True)
    Inicio_Sesion = models.DateTimeField(default=timezone.localtime(timezone.now()))
    Boton_1 = models.IntegerField(default=0)
    Boton_2 = models.IntegerField(default=0)
    Tiempo = models.IntegerField(default=0)

    def start_session(self):
        self.Inicio_Sesion = timezone.localtime(timezone.now())
        self.Boton_1 = 0  # Reiniciar contador de clics al iniciar sesión
        self.Boton_2 = 0  # Reiniciar contador de clics al iniciar sesión
        self.Tiempo = 0
        self.save()

    def end_session(self):
        if self.Inicio_Sesion:
            #self.Tiempo = int((timezone.now() - self.Inicio_Sesion).total_seconds() // 60)

            # Guardar la sesión en el registro de auditoría
            Auditoria_Usuarios_Sesion.objects.create(
                ID_Usuarios=self.ID_Usuarios,
                Inicio_Sesion=self.Inicio_Sesion,
                Cierre_Sesion=timezone.localtime(timezone.now()),
                Tiempo=self.Tiempo,
                Boton_1=self.Boton_1,
                Boton_2=self.Boton_2
            )

            self.save()

    def increment_click(self, button_number):
        if button_number == 1:
            self.Boton_1 += 1
        elif button_number == 2:
            self.Boton_2 += 1
        self.save()

    def increment_Time(self):
        self.Tiempo+=1
        self.save()