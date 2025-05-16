# 🔗 UrlShorter

**UrlShorter** es un proyecto personal para acortar URLs y organizarlas fácilmente desde un panel. Fue desarrollado con el objetivo de practicar tecnologías modernas como Next.js, Prisma, autenticación con Discord y base de datos PostgreSQL.

## 🚀 Funcionalidades principales

- ✂️ Acorta URLs largas de forma simple y rápida.
- 👤 Autenticación con Discord (usando NextAuth).
- 📋 Visualiza todas tus URLs acortadas desde un dashboard.
- 🧠 Arquitectura full-stack moderna con backend y frontend en Next.js 14.
- 🌐 Desplegado en Vercel.

---

## 🛠️ Tecnologías utilizadas

Este proyecto fue creado con la T3 Stack:

- [Next.js](https://nextjs.org)
- [Prisma](https://prisma.io)
- [NextAuth.js](https://next-auth.js.org)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Vercel](https://vercel.com) (para producción)

---

## 📦 Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/tu-usuario/urlshorter.git
cd urlshorter
```

2. Instala las dependencias:

```bash
npm install
```

3. Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
DATABASE_URL=postgresql://<usuario>:<contraseña>@<host>:<puerto>/<nombre_db>
AUTH_SECRET=supersecreto
NEXT_PUBLIC_BASE_URL=http://localhost:3000

AUTH_DISCORD_ID=tu_client_id
AUTH_DISCORD_SECRET=tu_client_secret
```

4. Genera el cliente de Prisma:

```bash
npx prisma generate
```

5. Ejecuta el servidor en modo desarrollo:

```bash
npm run dev
```

---

## 📁 Estructura del proyecto
```
.
├── app/                  # Rutas y páginas de Next.js (App Router)
├── prisma/               # Schema y cliente generado de Prisma
├── public/               # Archivos estáticos
├── src/                  # Código fuente (si usas estructura T3)
│   ├── pages/            # Páginas en caso de usar Pages Router
│   ├── server/           # Lógica de backend (trpc, auth, db, etc.)
│   └── components/       # Componentes UI
├── .env                  # Variables de entorno
├── README.md
```

---

## 📌 Tareas pendientes

## ✅ Completadas
- [x] Mostrar vistas a la URL en el card  
- [x] Añadir botón para cerrar sesión  

## 🔧 Pendientes
- [ ] Mostrar la card nueva cuando se cree un nuevo slug  
- [ ] Darle funcionalidad al buscador en el dashboard  
- [ ] Añadir Toasts  
- [ ] Añadir usuario predeterminado para que la gente lo use sin necesidad de iniciar con su Discord  
- [ ] Añadir la sesión a una variable de contexto o global tipo Zustand  
- [ ] Añadir ruta `settings` para eliminar cuenta o exportar los links  
- [ ] Mejor UX de la card del slug: mostrar un placeholder hasta que se recuperen los datos de la base de datos (igual con otros componentes)  


---

## 🧠 Recursos útiles

Si estás aprendiendo sobre la T3 Stack, aquí tienes algunos recursos:

- [T3 Stack Docs](https://create.t3.gg/)
- [T3 Discord](https://t3.gg/discord)
- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs/)
- [NextAuth Docs](https://next-auth.js.org/getting-started/introduction)
- [tRPC Docs](https://trpc.io/docs)

---

## 🚀 Despliegue

Puedes desplegar esta app fácilmente en Vercel:

1. Crea el proyecto en [vercel.com](https://vercel.com).
2. Añade las variables de entorno del archivo `.env` desde el panel de Vercel.
3. Haz push a tu rama principal (`main` o `master`) y Vercel se encargará del resto.

Guías de despliegue:

- [Despliegue en Vercel](https://create.t3.gg/en/deployment/vercel)
- [Despliegue en Netlify](https://create.t3.gg/en/deployment/netlify)
- [Docker](https://create.t3.gg/en/deployment/docker)

---

## 👤 Autor

Desarrollado por [Tu Nombre](https://github.com/tu-usuario) como proyecto personal para mejorar habilidades en desarrollo full-stack.

---

## 📝 Licencia

Este proyecto es de uso personal y no tiene licencia abierta. Puedes usarlo como inspiración o base para tus propios proyectos.

---
