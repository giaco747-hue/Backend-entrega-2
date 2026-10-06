# Sistema Backend de Turnos y Reservas - Pre-entrega 2

Este repositorio contiene la segunda pre-entrega del curso de Programación Backend I. El objetivo principal de este proyecto es la construcción de una API REST utilizando Express para gestionar el recurso `services`, conectando las rutas HTTP con la lógica de persistencia en archivos mediante la clase `ServiceManager`.

## Arquitectura del Proyecto

El proyecto sigue una arquitectura basada en la separación de responsabilidades:

*   **`src/app.js`**: Configuración de la aplicación Express y middlewares (JSON y URL-encoded).
*   **`src/server.js`**: Punto de entrada de la aplicación encargado de levantar el servidor.
*   **`src/config/env.config.js`**: Gestión de variables de entorno utilizando `dotenv`.
*   **`src/routes/services.router.js`**: Definición de los endpoints REST para la entidad de servicios.
*   **`src/managers/ServiceManager.js`**: Lógica de negocio y persistencia de datos en el sistema de archivos (`services.json`).
*   **`src/data/services.json`**: Archivo de almacenamiento de datos.

## Instalación y Configuración

1. Clonar el repositorio.
2. Instalar las dependencias del proyecto:
   ```bash
   npm install

   PORT=8080

 ##  Tecnologías Utilizadas

* Node.js

* Express

* Dotenv

* File System (fs/promises)