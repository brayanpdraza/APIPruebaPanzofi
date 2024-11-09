# API Backend - Django

Este proyecto proporciona la API para el sistema de administración de sesiones y gráficos. Utiliza **Django** junto con **Django REST Framework** para manejar las rutas y endpoints, y **JWT** (JSON Web Token) para la autenticación de usuarios.

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

### 5. Migraciones y Fixtures

  #### 1. Migraciones:
  Django usa migraciones para crear y actualizar la base de datos. Para ejecutar las migraciones, usa el siguiente comando
