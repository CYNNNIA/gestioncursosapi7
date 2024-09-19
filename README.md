# Gestión de Cursos API

## Descripción

Este proyecto es una API REST para gestionar cursos y usuarios con autenticación y roles de usuario. La API permite a los administradores gestionar los usuarios y los cursos, mientras que los usuarios pueden inscribirse en cursos.

## Tecnologías

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- JWT para autenticación

## Instalación

1. Clona este repositorio:

   ```bash
   git clone https://github.com/CYNNNIA/gestioncursosapi7.git
   cd gestioncursosapi7
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Crea un archivo `.env` en la raíz del proyecto con las siguientes variables de entorno:

   ```bash
   DB_URL=tu_mongo_db_url
   JWT_SECRET=tu_secreto_jwt
   PORT=3000
   ```

4. Inicia el servidor en modo desarrollo:
   ```bash
   npm run dev
   ```

## Variables de Entorno

Asegúrate de configurar las siguientes variables de entorno:

- `DB_URL`: URL de conexión a MongoDB Atlas.
- `JWT_SECRET`: Clave secreta para firmar los tokens JWT.

## Semilla de datos

Para poblar la base de datos con usuarios y cursos iniciales, ejecuta el archivo `seed.js`:

```bash
node seed.js
```

Esto creará:

- Un administrador.
- Un usuario regular.
- Dos cursos.
- Dos categorías.

## Endpoints

### Usuarios

- **POST** `/api/v1/users/register`: Crear un nuevo usuario (rol 'user' por defecto).
- **POST** `/api/v1/users/login`: Iniciar sesión.
- **GET** `/api/v1/users`: Obtener todos los usuarios (solo admin).
- **PUT** `/api/v1/users/rol/:id`: Cambiar el rol de un usuario (solo admin).
- **DELETE** `/api/v1/users/:id`: Eliminar un usuario (un usuario puede eliminarse a sí mismo, los admins pueden eliminar cualquier usuario).

### Cursos

- **GET** `/api/v1/cursos`: Obtener todos los cursos.
- **POST** `/api/v1/cursos`: Crear un curso.
- **PUT** `/api/v1/cursos/:id`: Actualizar un curso existente.
- **DELETE** `/api/v1/cursos/:id`: Eliminar un curso.

### Categorías

Las categorías están vinculadas a los cursos. Los cursos pueden pertenecer a una categoría mediante el campo `categoria` que referencia a una categoría existente.

- **GET** `/api/v1/categorias`: Obtener todas las categorías.
- **POST** `/api/v1/categorias`: Crear una categoría (solo admin).

## Testing

Este proyecto utiliza **Jest** para las pruebas. Puedes ejecutar las pruebas con:

```bash
npm test
```

## Licencia

Este proyecto está bajo la licencia ISC.
