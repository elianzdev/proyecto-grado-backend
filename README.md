# Backend API - Proyecto Grado

Este directorio contiene el backend de la aplicación de cursos. Está construido con Node.js, Express y MongoDB, y sigue una arquitectura modular con controladores, modelos, rutas y middlewares.

## Tecnologías y herramientas

- Node.js
- Express
- MongoDB con Mongoose
- JSON Web Tokens (JWT)
- `bcryptjs` para hashing de contraseñas
- `dotenv` para variables de entorno
- `cors`, `helmet`, `express-rate-limit` y `morgan`
- `nodemon` para desarrollo

## Cómo ejecutar

1. Instala dependencias:
   - `pnpm install` o `npm install`
2. Crea un archivo `.env` con al menos:
   - `PORT=5000`
   - `MONGO_URI=<tu_uri_de_mongodb>`
   - `JWT_SECRET=<una_clave_secreta>`
3. Inicia el servidor en desarrollo:
   - `pnpm dev` o `npm run dev`
4. Inicia el servidor en producción:
   - `pnpm start` o `npm start`

## Estructura del proyecto

```
backend/
  package.json
  pnpm-lock.yaml
  README.md
  src/
    app.js
    server.js
    config/
      db.js
    controllers/
      course-controller.js
      order-controller.js
      user-controller.js
    middlewares/
      auth-middleware.js
      error-middleware.js
      notFound-middleware.js
    models/
      course.js
      order.js
      user.js
    routes/
      course-routes.js
      order-routes.js
      user-routes.js
    utils/
      generateToken.js
```

## Descripción general

- `src/server.js`
  - Carga variables de entorno y conecta con MongoDB.
  - Arranca el servidor Express en el puerto configurado.
- `src/app.js`
  - Configura middleware global: seguridad, CORS, límite de peticiones, parsing JSON, logging y rutas.
  - Registra rutas de usuarios, cursos y ordenes.
  - Añade manejo centralizado de rutas no encontradas y errores.
- `src/config/db.js`
  - Conecta a la base de datos MongoDB usando Mongoose.

## API principal

### Usuarios

- `POST /api/users/register` - registrar un usuario nuevo.
- `POST /api/users/login` - iniciar sesión y recibir token JWT.
- `GET /api/users/` - listar usuarios (requiere token y rol `admin`).
- `GET /api/users/:id` - obtener usuario por ID.
- `PUT /api/users/:id` - actualizar usuario.
- `DELETE /api/users/:id` - eliminar usuario (requiere `admin`).

### Cursos

- `GET /api/courses/` - obtener todos los cursos.
- `GET /api/courses/:id` - obtener un curso por ID.
- `GET /api/courses/:id/content` - obtener el contenido de un curso.
- `POST /api/courses/` - crear un curso (requiere token y `admin`).
- `PUT /api/courses/:id` - actualizar curso (requiere `admin`).
- `DELETE /api/courses/:id` - eliminar curso (requiere `admin`).

### Ordenes

- `POST /api/orders/` - crear orden de compra (requiere token).
- `GET /api/orders/my-courses` - obtener cursos comprados del usuario autenticado.

## Modelos principales

- `User`
  - `nombre`, `correo`, `contraseña`, `rol`
- `Course`
  - `titulo`, `descripcion`, `nivel`, `duracion`, `precio`, `categoria`, `imagenPortada`, `contenido`, `instructor`
  - `contenido` incluye módulos, lecciones y preguntas.
- `Order`
  - `usuario`, `cursos`, `total`

## Middlewares

- `auth-middleware.js`
  - `protect`: valida el JWT y agrega `req.usuario`.s
  - `admin`: valida que el usuario tenga el rol `admin`.
- `notFound-middleware.js`
  - Captura rutas no definidas.
- `error-middleware.js`
  - Maneja errores y devuelve una respuesta JSON uniforme.

## Notas adicionales

- `src/utils/generateToken.js` contiene lógica JWT adicional y de autenticación.
- `process.env.CLIENT_URL` permite configurar el origen de CORS desde el frontend.
- `express-rate-limit` protege contra peticiones abusivas.
- `helmet` agrega cabeceras de seguridad HTTP.
