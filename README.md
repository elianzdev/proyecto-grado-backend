# Emprendix Backend

Backend para la plataforma, un sistema de cursos para microemprendedores desarrollado con Node.js, Express.js y MongoDB.

---

## Características

- Autenticación de usuarios (JWT)
- Sistema de roles (administrador y usuario)
- Gestión de cursos y módulos educativos
- Sistema de inscripción a cursos
- Progreso del usuario por curso
- Carrito de compras de cursos
- Gestión de pagos simulados o integrables
- Panel de administración de cursos
- API REST documentada
- Sistema de categorías de cursos

---

## Estructura del Proyecto

​```
emprendix_backend/
├── src/
│   ├── config/
│   │   └── database.js          # Conexión a MongoDB
│   ├── controllers/             # Lógica de negocio
│   │   ├── auth.controller.js
│   │   ├── course.controller.js
│   │   ├── user.controller.js
│   │   ├── cart.controller.js
│   │   └── admin.controller.js
│   ├── middleware/              # Middleware (auth, roles, errores)
│   │   ├── auth.middleware.js
│   │   └── role.middleware.js
│   ├── models/                  # Esquemas de MongoDB (Mongoose)
│   │   ├── User.js
│   │   ├── Course.js
│   │   ├── Category.js
│   │   ├── Cart.js
│   │   └── Enrollment.js
│   ├── routes/                  # Rutas de la API
│   │   ├── auth.routes.js
│   │   ├── course.routes.js
│   │   ├── user.routes.js
│   │   ├── cart.routes.js
│   │   └── admin.routes.js
│   ├── utils/                   # Utilidades (JWT, helpers)
│   └── server.js                # Punto de entrada
├── .env.example
├── .gitignore
├── package.json
└── README.md
​```

---

## Instalación

**1. Clonar el repositorio:**
​```bash
git clone <repo-url>
​```

**2. Instalar dependencias:**
​```bash
npm install
​```

**3. Configurar variables de entorno:**
​```bash
cp .env.example .env
​```

**4. Configurar MongoDB:**

Crear un cluster en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) o usar una instancia local, luego agregar la URI en el archivo `.env`:

​```env
MONGO_URI=mongodb+srv://usuario:password@cluster.mongodb.net/emprendix
JWT_SECRET=tu_secreto_super_seguro
PORT=3000
​```

**5. Ejecutar el servidor:**
​```bash
npm run dev
​```

---

## Estructura de Base de Datos (MongoDB)

### Colecciones Principales

| Colección     | Descripción                          |
|---------------|--------------------------------------|
| `users`       | Usuarios del sistema                 |
| `courses`     | Cursos disponibles                   |
| `categories`  | Categorías de cursos                 |
| `carts`       | Carrito de compras                   |
| `enrollments` | Cursos inscritos por usuario         |
| `progress`    | Progreso por curso del usuario       |
| `reviews`     | Reseñas de cursos                    |

### Relaciones Principales

- Un usuario puede tener múltiples cursos inscritos
- Un curso pertenece a una categoría
- Un usuario tiene un carrito activo
- Un usuario puede dejar reseñas en cursos

---

## API Endpoints

### Autenticación — `/api/auth`

| Método | Ruta        | Descripción                |
|--------|-------------|----------------------------|
| POST   | `/register` | Registrar usuario          |
| POST   | `/login`    | Iniciar sesión             |
| GET    | `/profile`  | Obtener perfil del usuario |

### Cursos — `/api/courses`

| Método | Ruta            | Descripción                 |
|--------|-----------------|-----------------------------|
| GET    | `/`             | Listar cursos               |
| GET    | `/:id`          | Obtener detalle de un curso |
| POST   | `/`             | Crear curso *(admin)*       |
| PUT    | `/:id`          | Actualizar curso *(admin)*  |
| DELETE | `/:id`          | Eliminar curso *(admin)*    |
| GET    | `/category/:id` | Cursos por categoría        |

### Carrito — `/api/cart`

| Método | Ruta                | Descripción              |
|--------|---------------------|--------------------------|
| GET    | `/`                 | Ver carrito del usuario  |
| POST   | `/add`              | Agregar curso al carrito |
| DELETE | `/remove/:courseId` | Eliminar del carrito     |
| POST   | `/checkout`         | Comprar cursos           |

### Inscripciones — `/api/enrollments`

| Método | Ruta                  | Descripción         |
|--------|-----------------------|---------------------|
| GET    | `/`                   | Cursos del usuario  |
| GET    | `/:courseId/progress` | Ver progreso        |
| POST   | `/start/:courseId`    | Iniciar curso       |
| PUT    | `/progress/:courseId` | Actualizar progreso |

### Admin — `/api/admin`

| Método | Ruta               | Descripción            |
|--------|--------------------|------------------------|
| GET    | `/users`           | Listar usuarios        |
| GET    | `/stats`           | Estadísticas generales |
| GET    | `/courses/popular` | Cursos más vendidos    |

### Salud del Servidor

| Método | Ruta          | Descripción        |
|--------|---------------|--------------------|
| GET    | `/api/health` | Estado del backend |

---

## Tecnologías

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/)
- [JWT](https://jwt.io/) — Autenticación
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [cors](https://www.npmjs.com/package/cors)
- [express-validator](https://express-validator.github.io/)

---

## Notas Importantes

> - Todas las rutas (excepto `/api/auth`) requieren token JWT
> - Solo los administradores pueden crear, editar o eliminar cursos
> - El carrito se limpia automáticamente después del checkout
> - El progreso del curso se guarda de forma individual por usuario
> - Los cursos pueden contener módulos y lecciones internas

---

## Documentación Futura

- 📄 Swagger UI disponible en `/api/docs` *(en desarrollo)*
- 🖥️ Panel administrativo web en React *(frontend próximamente)*