# Proyecto React - Administrador de Sesiones y Gráficos

Este proyecto es una aplicación de administración/Interaccion que muestra estadísticas de usuarios y su interacción con botones dentro de un sistema, además de ofrecer gráficos interactivos con `chart.js` para mostrar datos como el tiempo de sesión por usuario y el uso de botones.

## Requisitos

Antes de ejecutar el proyecto, asegúrate de tener instalados los siguientes requisitos en tu máquina local:

- **Node.js** (version 14 o superior)
- **npm** (gestor de paquetes de Node.js, incluido con la instalación de Node.js)
- **React** (este proyecto utiliza React para la interfaz)
- **React Router DOM** (para el manejo de las rutas de la aplicación)
- **chart.js** y **react-chartjs-2** (para los gráficos)
- **chartjs-plugin-zoom** (para la funcionalidad de zoom en los gráficos)

## Instalación

Sigue estos pasos para descargar, configurar e iniciar el proyecto en tu máquina local:

1. **Clona el repositorio**:

   En tu terminal, usa el siguiente comando para clonar el repositorio:

   git clone https://github.com/usuario/repositorio.git
   
   Reemplaza usuario/repositorio.git por la URL de tu repositorio.

2. **Navega a la carpeta del proyecto**:
     Una vez que el repositorio esté clonado, entra en el directorio del proyecto:
   
     cd nombre-del-repositorio
3. **Instala las dependencias**:
     Asegúrate de estar en el directorio raíz del proyecto y ejecuta el siguiente comando para instalar todas las dependencias necesarias:
     npm install

     Esto descargará e instalará las dependencias de React y los paquetes que utilizamos para los gráficos (chart.js, react-chartjs-2, chartjs-plugin-zoom).
  ## Dependencias necesarias:
  react-router-dom: Para la gestión de rutas dentro de la aplicación.
  chart.js y react-chartjs-2: Para integrar gráficos interactivos.
  chartjs-plugin-zoom: Para permitir el zoom y desplazamiento en los gráficos.
  
  Si alguna de estas dependencias no se instala automáticamente o hay un error, verifica que la versión de Node.js instalada sea compatible.
  
4. **Configura las variables de entorno**
   en el archivo "config.json" debemos asegurarnos de apuntar a la url de la API:

   {
   "apiUrl": "https://mi-api.com"
   }

   Si se ejecuta localmente con Django, no se debe modificar nada

  ## Ejecución
  1. **Ejecuta el servidor de desarrollo**:

     En tu terminal, usa el siguiente comando para iniciar la aplicación:

     npm start

     Esto iniciará el servidor de desarrollo y abrirá la aplicación en tu navegador en http://localhost:3000.
2. **Accede a la aplicación**:

   Una vez que el servidor se esté ejecutando, abre tu navegador y dirígete a http://localhost:3000. Deberías poder ver la interfaz de usuario de la aplicación, donde se muestran los usuarios, tiempos de sesión y los gráficos de uso

## Funcionalidades

1. **Login**:
   Al abrir el proyecto, la página por default será la que nos permite loguearnos. Una vez sea exitoso el login, según la jerarquía del usuario pasaremos a la página "adminpage" o "regularpage"

2. **AdminPage**:
   Nos permite hacer uso de la parte administrativa. Nos muestra en una tabla todos los usuarios regulares del sistema y los datos de la sesión actual. Además ofrece dos gráficas; la primera para el tiempo de cada usuario, la segunda para observar la cantidad total entre todos los usuarios de veces que se dio click al botón 1 o 2.
3. **RegularPage**
   Nos muestra una interfaz con el logo, titulo y descripcion de la app, además de dos botones interactivos. Cada vez que hacemos click en los botones, aparece un mensaje y se actualiza la cantidad de clicks por sesión. Cada minuto que pasamos en la interfaz, se actualiza en la base de datos de la sesión del usuario.
   
