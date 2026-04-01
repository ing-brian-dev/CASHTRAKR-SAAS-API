# Especificaciones del Proyecto

Este documento describe las **librerías, dependencias y configuraciones principales** utilizadas en el proyecto **CashTrackr Backend**.

El proyecto está construido utilizando **Node.js, Express y TypeScript**, siguiendo buenas prácticas de desarrollo para APIs REST.

La documentacion del proyecto la encuentras en el siguiente enlace:
https://documenter.getpostman.com/view/43228681/2sBXinJWxG 

---

# Información General del Proyecto

- **Nombre:** cashtrackr_backend
- **Versión:** 1.0.0
- **Autor:** Brian Valdivia
- **Licencia:** ISC
- **Descripción:** Proyecto CashTrackr construido con React, TypeScript y Node.js.

---

# Scripts del Proyecto

Los siguientes scripts están definidos en el archivo `package.json` para facilitar el desarrollo y ejecución del proyecto.

### Desarrollo

Ejecuta el proyecto en modo desarrollo utilizando **tsx** para ejecutar TypeScript directamente.


npm run dev


Script:


tsx watch src/


---

### Desarrollo API

Ejecuta el servidor API en modo desarrollo.


npm run dev:api


Script:


tsx watch src/ --api


---

### Compilar el Proyecto

Compila el código TypeScript a JavaScript en la carpeta `dist`.


npm run build


Script:


tsc


---

### Ejecutar Proyecto Compilado

Ejecuta el proyecto una vez compilado.


npm start


Script:


node ./dist/index.js


---

# Dependencias del Proyecto

Estas son las **dependencias principales utilizadas en producción**.

### Express

Framework para la creación de APIs REST.


express


---

### Sequelize TypeScript

ORM para interactuar con bases de datos SQL utilizando TypeScript.


sequelize-typescript


---

### MySQL2

Driver para conectarse a bases de datos **MySQL**.


mysql2


---

### PostgreSQL

Soporte para bases de datos **PostgreSQL**.


pg
pg-hstore


---

### JSON Web Token

Utilizado para **autenticación basada en tokens**.


jsonwebtoken


---

### Bcrypt

Utilizado para **encriptar contraseñas de usuarios**.


bcrypt


---

### Express Validator

Middleware utilizado para **validar datos enviados en las peticiones HTTP**.


express-validator


---

### Express Rate Limit

Middleware para **limitar la cantidad de peticiones y prevenir ataques de fuerza bruta**.


express-rate-limit


---

### Morgan

Middleware utilizado para **registrar logs de las peticiones HTTP**.


morgan


---

### Dotenv

Permite cargar variables de entorno desde un archivo `.env`.


dotenv


---

### Nodemailer

Librería utilizada para **enviar correos electrónicos desde la aplicación**.


nodemailer


---

### Colors

Permite mostrar mensajes con **colores en la consola** para mejorar la lectura de logs.


colors


---

# Dependencias de Desarrollo

Estas dependencias se utilizan únicamente durante el **desarrollo del proyecto**.

---

### TypeScript

Lenguaje principal utilizado para el desarrollo del proyecto.


typescript


---

### TSX

Permite ejecutar archivos TypeScript directamente sin necesidad de compilarlos manualmente.


tsx


---

### TS Node

Permite ejecutar TypeScript directamente en Node.js.


ts-node


---

### Nodemon

Reinicia automáticamente el servidor cuando se detectan cambios en los archivos.


nodemon


---

### Tipos de TypeScript

Se utilizan definiciones de tipos para mejorar el soporte de TypeScript.


@types/express
@types/bcrypt
@types/jsonwebtoken
@types/morgan
@types/nodemailer
@types/jest


---

# Configuración de Jest

Jest es el framework utilizado para realizar **pruebas unitarias en el proyecto**.

---

## Instalación de Jest

Para instalar Jest junto con las dependencias necesarias para trabajar con TypeScript ejecutar:

```bash
npm install -D jest @types/jest ts-jest
Crear archivo de configuración

Para generar automáticamente el archivo de configuración de Jest:

npx ts-jest config:init

Este comando creará el archivo:

jest.config.js

Esta dependencia llamada node-mocks-http ayuda a hacer mocks y simular los llamados a una API

npm i -D node-mocks-http