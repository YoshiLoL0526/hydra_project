# 🚀 Hydra Project

Un proyecto fullstack moderno para registro de usuarios, construido con tecnologías de vanguardia. Incluye un frontend interactivo en React, un workflow automatizado con n8n y una base de datos PostgreSQL.

## 🛠️ Tecnologías Utilizadas

### Frontend
- ⚛️ **React 19** - Framework de JavaScript para interfaces de usuario
- ⚡ **Vite** - Herramienta de construcción rápida y moderna
- 🎨 **Tailwind CSS 4** - Framework de CSS utilitario
- 📡 **Axios** - Cliente HTTP para peticiones API
- 🔧 **ESLint** - Linting para código JavaScript/React

### Backend & Workflow
- 🤖 **n8n** - Plataforma de automatización de workflows
- 🐘 **PostgreSQL** - Base de datos relacional
- 📧 **SMTP** - Envío de correos electrónicos
- 🔐 **Crypto (SHA256)** - Encriptación de contraseñas

### Desarrollo
- 📦 **pnpm** - Gestor de paquetes eficiente
- 🏗️ **Vite** - Servidor de desarrollo y construcción

## 📋 Prerrequisitos

Antes de comenzar, asegúrate de tener instalados:

- 🟢 **Node.js** (versión 18 o superior)
- 📦 **pnpm** - Instálalo con: `npm install -g pnpm`
- 🐘 **PostgreSQL** (versión 12 o superior)
- 🤖 **n8n** - Instálalo con: `pnpm install n8n -g`

## 🚀 Instalación y Configuración

### 1. Clonar el Repositorio

```bash
git clone <url-del-repositorio>
cd hydra_project
```

### 2. Configurar la Base de Datos

1. **Instalar PostgreSQL** si no lo tienes
2. **Crear una base de datos** llamada `hydra_db` (o el nombre que prefieras)
3. **Crear un usuario** con permisos para la base de datos

### 3. Configurar n8n

1. **Instalar n8n** siguiendo las instrucciones oficiales
2. **Ejecutar n8n** en el puerto 5678 (por defecto):
   ```bash
   n8n start
   ```
3. **Importar el workflow**:
   - Ve a n8n en tu navegador (http://localhost:5678)
   - Importa el archivo `workflow/n8n_workflow.json`
4. **Configurar credenciales**:
   - **PostgreSQL**: Configura la conexión a tu base de datos
   - **SMTP**: Configura tu proveedor de email (Gmail, Outlook, etc.)

### 4. Configurar el Frontend

1. **Instalar dependencias**:
   ```bash
   cd frontend
   pnpm install
   ```

2. **Configurar variables de entorno**:
   ```bash
   cp .env.example .env
   ```
   Edita el archivo `.env` con la URL correcta del webhook.

3. **Ejecutar el frontend**:
   ```bash
   pnpm run dev
   ```

## 🔗 URL del Webhook

El frontend consume el siguiente webhook de n8n:

```
http://localhost:5678/webhook/e82e4243-9ff0-44ab-8b9f-837db6814a79
```

Esta URL está configurada en el archivo `.env` bajo la variable `VITE_API_URL`.

## 🎯 Uso del Proyecto

1. **Asegúrate de que n8n esté ejecutándose** con el workflow importado
2. **Ejecuta el frontend** con `pnpm run dev`
3. **Accede a la aplicación** en http://localhost:5173
4. **Registra un nuevo usuario** completando el formulario
5. **Recibe un email de bienvenida** automáticamente

## 📁 Estructura del Proyecto

```
hydra_project/
├── frontend/                 # Aplicación React
│   ├── src/
│   │   ├── components/       # Componentes reutilizables
│   │   ├── services/         # Servicios API
│   │   └── utils/            # Utilidades
│   ├── .env.example          # Variables de entorno de ejemplo
│   └── package.json          # Dependencias del frontend
├── workflow/                 # Workflow de n8n
│   └── n8n_workflow.json     # Definición del workflow
└── README.md                 # Este archivo
```

## 🔧 Scripts Disponibles

### Frontend
- `pnpm run dev` - Inicia el servidor de desarrollo
- `pnpm run build` - Construye la aplicación para producción
- `pnpm run preview` - Vista previa de la build de producción
- `pnpm run lint` - Ejecuta ESLint

## 🐳 Instalación y Ejecución con Docker

Si prefieres usar Docker para ejecutar el proyecto de manera simplificada, sigue estos pasos. Esta opción configura automáticamente todos los servicios necesarios (bases de datos, N8N y frontend) en contenedores.

### Prerrequisitos

- 🐳 **Docker** (versión 20.10 o superior)
- 🐳 **Docker Compose** (versión 1.29 o superior)

### Pasos

1. **Clonar el repositorio**:
   ```bash
   git clone <url-del-repositorio>
   cd hydra_project
   ```

2. **Ejecutar con Docker Compose**:
   ```bash
   docker-compose up --build
   ```
   Esto construirá e iniciará todos los servicios:
   - Base de datos PostgreSQL para el proyecto (puerto 5433)
   - Base de datos PostgreSQL para N8N
   - Servicio N8N (puerto 5678)
   - Frontend React (puerto 3000)

3. **Acceder a la aplicación**:
   - **Frontend**: http://localhost:3000
   - **N8N**: http://localhost:5678
   - **Base de datos del proyecto**: localhost:5433

### Notas Importantes

- Se debe importar el workflow desde `workflow/n8n_workflow.json`
- El frontend está configurado para consumir el webhook en `http://localhost:5678/webhook/e82e4243-9ff0-44ab-8b9f-837db6814a79`
- Para detener los contenedores: `docker-compose down`
- Para reconstruir después de cambios: `docker-compose up --build --force-recreate`
