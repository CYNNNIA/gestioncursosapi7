# Gestión de Cursos API

## Descripción

Este proyecto es una API REST para gestionar cursos y usuarios con autenticación y roles de usuario. La API permite a los administradores gestionar los usuarios y los cursos, mientras que los usuarios pueden inscribirse en cursos.

## Tecnologías

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- JWT para autenticación

## Endpoints

### Usuarios

- `POST /api/v1/users/register`: Crear un nuevo usuario (rol 'user' por defecto).
- `POST /api/v1/users/login`: Iniciar sesión.
- `GET /api/v1/users`: Obtener todos los usuarios (solo admin).
- `PUT /api/v1/users/rol/:id`: Cambiar el rol de un usuario (solo admin).
- `DELETE /api/v1/users/:id`: Eliminar un usuario (un usuario puede eliminarse a sí mismo, los admins pueden eliminar cualquier usuario).

### Cursos

- `GET /api/v1/cursos`: Obtener todos los cursos.
- `POST /api/v1/cursos`: Crear un curso (solo admin).
- `PUT /api/v1/cursos/:id`: Actualizar un curso.
- `DELETE /api/v1/cursos/:id`: Eliminar un curso.

### Categorías

- `GET /api/v1/categorias`: Obtener todas las categorías.
- `POST /api/v1/categorias`: Crear una categoría (solo admin).

## Instalación

1. Clonar el repositorio.
2. Instalar dependencias: `npm install`.
3. Configurar las variables de entorno en un archivo `.env`.
4. Iniciar el servidor: `npm run dev`.

## Variables de Entorno

Asegúrate de configurar las siguientes variables de entorno:

- `DB_URL`: URL de conexión a essongoDB Atlas.
- `JWT_SECRET`: Clave secreta para firmar los tokens JWT.

## Semillas

Para cargar datos iniciales en la base de datos, ejecutar el script de semillas:

```bash
node seed.js
```
