# Backend API - Proyecto Grado 2024-2025 (Emigrado a nuevo repositorio)

## Descripción

Este proyecto implementa el backend de una plataforma de cursos en línea. Está construido con Node.js, Express y MongoDB, y sigue una arquitectura modular que separa claramente:

- lógica de enrutamiento
- controladores
- modelos de datos
- middlewares de seguridad y manejo de errores

## Tecnologías

- Node.js
- Express
- MongoDB + Mongoose
- JWT para autenticación
- `bcryptjs` para cifrar contraseñas
- `dotenv` para variables de entorno
- `helmet` para seguridad HTTP
- `cors` para control de origen
- `express-rate-limit` para limitar peticiones
- `morgan` para logging en desarrollo
- `nodemon` para ejecución en modo desarrollo

## Instalación

1. Abre una terminal en `backend/`.
2. Instala dependencias:
   - `pnpm install` o `npm install`
3. Crea un archivo `.env` con al menos las variables:
   ```env
   PORT=5000
   MONGO_URI=<tu_uri_de_mongodb>
   JWT_SECRET=<una_clave_secreta>
   CLIENT_URL=http://localhost:5173
   ```
4. Inicia el servidor:
   - Desarrollo: `pnpm dev` o `npm run dev`
   - Producción: `pnpm start` o `npm start`

## Estructura del proyecto

```text
backend
├─ src
│  ├─ config
│  │  └─ db.js
│  ├─ controllers
│  │  ├─ course-controller.js
│  │  ├─ order-controller.js
│  │  └─ user-controller.js
│  ├─ middlewares
│  │  ├─ auth-middleware.js
│  │  ├─ error-middleware.js
│  │  └─ notFound-middleware.js
│  ├─ models
│  │  ├─ course.js
│  │  ├─ order.js
│  │  └─ user.js
│  ├─ routes
│  │  ├─ course-routes.js
│  │  ├─ order-routes.js
│  │  └─ user-routes.js
│  ├─ utils
│  │  └─ generateToken.js
│  ├─ app.js
│  └─ server.js
├─ package.json
├─ pnpm-lock.yaml
└─ README.md
```

## Flujo de ejecución

1. `src/server.js` carga la configuración de entorno y establece la conexión con MongoDB.
2. `src/app.js` configura el servidor Express y aplica los middlewares globales.
3. Las rutas registradas exponen la API bajo `/api/users`, `/api/courses` y `/api/orders`.
4. Los controladores son responsables de la lógica de negocio y la interacción con la base de datos.
5. Los middlewares gestionan la seguridad, la autorización, las rutas no encontradas y los errores.

## API principal

### Usuarios

| Método | Ruta | Descripción | Autorización |
|---|---|---|---|
| POST | `/api/users/register` | Registrar usuario | Pública |
| POST | `/api/users/login` | Iniciar sesión y obtener JWT | Pública |
| GET | `/api/users/` | Listar usuarios | `protect + admin` |
| GET | `/api/users/:id` | Obtener usuario por ID | `protect` |
| PUT | `/api/users/:id` | Actualizar usuario | `protect` |
| DELETE | `/api/users/:id` | Eliminar usuario | `protect + admin` |

### Cursos

| Método | Ruta | Descripción | Autorización |
|---|---|---|---|
| GET | `/api/courses/` | Obtener todos los cursos | Pública |
| GET | `/api/courses/:id` | Obtener curso por ID | Pública |
| GET | `/api/courses/:id/content` | Obtener contenido de curso | Pública |
| POST | `/api/courses/` | Crear curso | `protect + admin` |
| PUT | `/api/courses/:id` | Actualizar curso | `protect + admin` |
| DELETE | `/api/courses/:id` | Eliminar curso | `protect + admin` |

### Órdenes

| Método | Ruta | Descripción | Autorización |
|---|---|---|---|
| POST | `/api/orders/` | Crear una orden de compra | `protect` |
| GET | `/api/orders/my-courses` | Obtener cursos comprados por usuario | `protect` |

## Modelos principales

- `User`
  - `nombre`, `correo`, `contraseña`, `rol`
  - Roles: `usuario`, `admin`
- `Course`
  - `titulo`, `descripcion`, `nivel`, `duracion`, `precio`, `categoria`, `imagenPortada`, `contenido`, `instructor`
  - `contenido` incluye módulos, lecciones y preguntas
- `Order`
  - `usuario`, `cursos`, `total`

## Middlewares

- `auth-middleware.js`
  - `protect`: valida JWT y adjunta el usuario a la petición.
  - `admin`: verifica rol administrador.
- `notFound-middleware.js`
  - Captura rutas no definidas y pasa el error al middleware global.
- `error-middleware.js`
  - Maneja errores y devuelve una respuesta JSON uniforme.

## Consideraciones

- `src/utils/generateToken.js` contiene lógica de verificación JWT adicional.
- El backend está preparado para manejar peticiones desde un frontend con CORS.
- La seguridad se refuerza con `helmet` y `express-rate-limit`.
- Es recomendable usar `NODE_ENV=production` en despliegues finales.

## Recomendaciones

- Usar `POSTMAN` o `Insomnia` para probar las rutas.
- Guardar el token JWT en el frontend para solicitudes protegidas.
- Validar que `MONGO_URI` apunte a una base de datos segura.
