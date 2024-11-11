# API Backend - Django

Este proyecto proporciona la API para la aplicación web de Clicks y administración de datos. Utiliza **Django** junto con **Django REST Framework** para manejar las rutas y endpoints, y **JWT** (JSON Web Token) para la autenticación de usuarios.

## Requisitos

Antes de comenzar, asegúrate de tener instalados los siguientes requisitos:

- **Python** (versión 3.8 o superior)
- **pip** (gestor de paquetes de Python)
- **Django** (versión 3.2 o superior)
- **Django REST Framework** (DRF)
- **Django REST Framework - Token Authentication** (para la autenticación con tokens)
- **django-cors-headers** (para permitir peticiones CORS desde el frontend)
  
Puedes instalar estos requisitos usando `pip`.

## Instalación

### 1. Clona el repositorio

  Primero, clona el repositorio de la API:+

  git clone https://github.com/brayanpdraza/APIPruebaPanzofi.git

### 2. Crear un entorno virtual
  Es recomendable trabajar en un entorno virtual para gestionar las dependencias de Python. Para crear y activar el entorno virtual, utiliza los siguientes comandos:
  python -m venv venv
  # En Windows:
  venv\Scripts\activate
  # En macOS/Linux:
  source venv/bin/activate

### 3. Instalar las dependencias
  Una vez dentro del entorno virtual, instala las dependencias requeridas
  
  pip install django djangorestframework djangorestframework-simplejwt django-cors-headers

### 4.  Configuración inicial

  #### 1. CORS (Cross-Origin Resource Sharing):

  Para permitir que el frontend interactúe con el backend, se configura CORS en Django. En el archivo settings.py, agrega 'corsheaders' en INSTALLED_APPS y configura los permisos CORS:

    INSTALLED_APPS = [
        ...,
        'corsheaders',
    ]
    
    MIDDLEWARE = [
        ...,
        'corsheaders.middleware.CorsMiddleware',
    ]
    
    CORS_ALLOWED_ORIGINS = [
        'http://localhost:3000',  //Si usas React en localhost:3000
    ]
    
  Si necesitas agregar más dominios permitidos, simplemente edita la lista `CORS_ALLOWED_ORIGINS` en el archivo.
  
### 5. Migraciones y Fixtures

  #### 1. Migraciones:
    Django usa migraciones para crear y actualizar la base de datos. Para ejecutar las migraciones, usa el siguiente comando

    python manage.py migrate

    Esto configurará las tablas de la base de datos de acuerdo a los modelos que hayas definido en tu proyecto.
  #### 2. Data Fixtures:
    Para cargar los datos necesarios de manera ágil en la base de datos, usaremos fixtures:

    - Tabla perfiles: python manage.py loaddata perfiles_fixture.json
    - Tabla Usuarios:  python manage.py loaddata usuarios_fixture.json
    - Tabla Landing_Page:  python manage.py loaddata MT_Landing_Page_fixture.json
    
### 6. Ejecución del Servidor de Desarrollo
  Una vez configurado todo, ejecuta el servidor de desarrollo con el siguiente comando:

  python manage.py runserver

  Esto iniciará el servidor de desarrollo en el puerto 8000: http://127.0.0.1:8000

### 7. Endpoint de prueba
  - Login: Con este endpoint, seremos capaces de loguearnos, y recibiremos el token del usuario logueado.
    
    http://127.0.0.1:8000/register POST
    
    body:
    {
    "Nombre_Usuario":"Usuario Prueba",
    "Clave":"1234"
    }

    respuesta:
    {
      "token": "fdc2a1b046ad236a97257e3ccdd9106518021764",
      "usuario": {
          "ID_Usuarios": 52,
          "ID_MT_Perfiles": 2,
          "Nombre_Usuario": "Jaime Duque",
          "Clave": "pbkdf2_sha256$870000$4YAtUoaB6ssSTFAHRJy4fr$e8aXR7r9AgPZlx31haWcc5d784O7xCVQMlpTsAN5Uj0="
      }
    }
    
