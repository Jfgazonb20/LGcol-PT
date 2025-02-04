# 📌 To-Do List Application

## 🚀 Tecnologías Utilizadas

### 🖥️ Frontend
- ⚛️ **React** (Biblioteca para construir interfaces de usuario)
- 🔄 **Redux** (Manejo de estado global)
- 🔧 **Axios & Fetch** (Para llamadas a la API REST)
- 🎨 **Bootstrap** (Estilos y diseño responsivo)

### 🛠️ Backend
- ☕ **Spring Boot** (Framework para construir aplicaciones Java)
- 🗄️ **PostgreSQL** (Base de datos relacional)
- 🌐 **Spring Web** (Para la API REST)
- 📄 **Spring Data JPA** (Interacción con la base de datos)

---

## 📌 Características Implementadas
- 📝 **Crear tareas** con título, descripción y estado (completado o pendiente)
- 📋 **Listar todas las tareas** con opciones de filtrado (Todas, Completadas, Pendientes)
- ✏️ **Editar tareas**
- ❌ **Eliminar tareas**
- 🔄 **Gestión de estado con Redux**
- 🔗 **Conexión con Backend (Spring Boot + PostgreSQL)**
- 🎨 **Diseño responsivo con Bootstrap**
- 🌙 **Modo oscuro/claro con botón de toggle** (Bonus)
- 📦 **Drag-and-Drop para reordenar tareas** (Bonus)

---

## 🛠️ Instalación y Ejecución

### 🔹 Backend (Spring Boot)
```bash
# Clonar el repositorio
$ git clone https://github.com/Jfgazonb20/LGcol-PT.git
$ cd LGcol-PT/backend

# Configurar PostgreSQL y actualizar application.properties
# Ubicado en src/main/resources/application.properties

# Compilar y ejecutar la aplicación
$ mvn clean install
$ mvn spring-boot:run
```

### 🔹 Frontend (React)
```bash
$ cd LGcol-PT/frontend

# Instalar dependencias
$ npm install

# Ejecutar la aplicación
$ npm start
```

---

## 🔗 Endpoints de la API

| Método | Endpoint | Descripción |
|--------|---------|-------------|
| GET | `/tasks` | Obtiene todas las tareas |
| POST | `/tasks` | Crea una nueva tarea |
| PUT | `/tasks/{id}` | Edita una tarea existente |
| DELETE | `/tasks/{id}` | Elimina una tarea |

---

## 📂 Estructura del Proyecto

```
task-service/
├── frontend/               # Código del frontend (React)
│   ├── public/             # Archivos públicos
│   ├── src/                # Código fuente
│   │   ├── components/     # Componentes de React
│   │   ├── services/       # Servicios para llamadas API
│   │   ├── store/          # Configuración de Redux
│   │   └── App.js          # Componente principal
│   └── package.json        # Dependencias de Node.js
├── backend/                # Código del backend (Spring Boot)
│   ├── src/main/java/      # Código fuente Java
│   │   ├── controller/     # Controladores REST
│   │   ├── model/          # Entidades de la base de datos
│   │   ├── repository/     # Repositorios de datos
│   │   ├── service/        # Lógica de negocio
│   │   ├── config/         # Configuración del backend
│   │   └── TaskServiceApplication.java # Clase principal
│   └── pom.xml             # Dependencias de Maven
└── README.md               # Este archivo
```

---



