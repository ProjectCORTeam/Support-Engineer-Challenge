# Challenge Técnico: Support Engineer

## Introducción

Hola,

Gracias por tu interés en unirte a nuestro equipo de Ingeniería. Este challenge está diseñado para simular un problema real que podrías encontrar en tu día a día como Support Engineer. Queremos ver cómo abordas un problema desde la investigación inicial hasta la propuesta de una solución técnica, incluyendo la comunicación con otros equipos.

No buscamos una solución perfecta, sino entender tu proceso de pensamiento, tus habilidades de diagnóstico y cómo aplicas tus conocimientos técnicos.

**Tiempo estimado:** 2-3 horas

**Entregable:** Un único documento (PDF, Google Doc) o un email con tus respuestas a las 3 partes del challenge.

---

## El Escenario: Ticket Escalado

Imagina que trabajas en una empresa SaaS que ofrece una plataforma de gestión de proyectos llamada **"TaskMaster"**. El equipo de Customer Support te escala el siguiente ticket:

### Ticket #86753

**Cliente:** "Global Corp Inc."

**Usuario Afectado:** Sarah Miller (Manager, `user_id: 12`)

**Reporte del Cliente (resumido por CS):**

> "Sarah Miller nos contactó muy preocupada. Su dashboard de 'Tareas por Vencer' para su equipo no está funcionando correctamente. Específicamente, dice que su empleado, **John Smith** (`user_id: 25`), no tiene ninguna tarea que venza en los próximos 7 días. Sin embargo, John le ha confirmado que tiene al menos dos tareas importantes con fecha de entrega para esta semana.
>
> Sarah depende de este dashboard para gestionar a su equipo y está perdiendo la confianza en nuestra plataforma. **Necesitamos una investigación urgente.**"

---

## Recursos a tu Disposición

Para tu investigación, te proporcionamos los siguientes recursos de nuestro sistema:

### 1. Documentación de la API (Endpoint relevante)

**Endpoint:** `GET /api/v1/users/{userId}/tasks`

**Descripción:** Devuelve una lista de tareas asignadas a un usuario específico.

**Parámetros de Query:**

| Parámetro | Tipo | Requerido | Descripción |
|-----------|------|-----------|-------------|
| `status` | string | Opcional | Filtra por estado. Valores posibles: `pending`, `in_progress`, `completed` |
| `due_date_before` | date (YYYY-MM-DD) | Opcional | Devuelve tareas con fecha de entrega anterior o igual a la fecha indicada |

### 2. Esquema de la Base de Datos (Tablas relevantes)

#### Tabla `users`

| Columna | Tipo | Descripción |
|---------|------|-------------|
| `id` | int (PK) | Identificador único |
| `name` | varchar | Nombre del usuario |
| `email` | varchar | Email del usuario |
| `role` | varchar | Rol del usuario |

#### Tabla `tasks`

| Columna | Tipo | Descripción |
|---------|------|-------------|
| `id` | int (PK) | Identificador único |
| `title` | varchar | Título de la tarea |
| `assignee_id` | int (FK) | Referencia a `users.id` |
| `status` | varchar | Estado: `pending`, `in_progress`, `completed`, `archived` |
| `due_date` | datetime | Fecha de entrega |
| `is_deleted` | boolean | Indica si la tarea fue eliminada (soft delete) |

### 3. Datos de la Base de Datos

```sql
-- Datos relevantes para el usuario John Smith (user_id: 25)
INSERT INTO tasks (id, title, assignee_id, status, due_date, is_deleted) VALUES
(101, 'Preparar reporte Q3', 25, 'in_progress', '2025-10-16 17:00:00', false),
(102, 'Contactar a nuevos leads', 25, 'pending', '2025-10-22 10:00:00', false),
(103, 'Actualizar presentación de ventas', 25, 'in_progress', '2025-10-17 12:00:00', true),
(104, 'Revisar métricas de la campaña', 25, 'archived', '2025-10-15 11:00:00', false),
(105, 'Finalizar draft del blog post', 25, 'in_progress', '2025-10-14 18:00:00', false);
```

> ⚠️ **Nota importante:** Para este ejercicio, asume que la fecha de hoy es **14 de octubre de 2025**.

---

## Tu Tarea (Dividida en 3 Partes)

### Parte 1: La Investigación Técnica

1. **Consulta a la Base de Datos:** Escribe la consulta SQL exacta que ejecutarías para verificar cuántas tareas activas y no eliminadas tiene John Smith (`user_id: 25`) que vencen en los próximos 7 días (incluyendo hoy, 14 de octubre).

2. **Análisis de la Causa Raíz (RCA):** Basándote en la consulta anterior y los recursos proporcionados, ¿cuál es la causa más probable del bug? Explica tu razonamiento en 2-3 frases. ¿Hay una discrepancia entre la lógica de la base de datos y la funcionalidad de la API?

### Parte 2: La Solución (Simulación de Proceso de Ingeniería)

1. **Propuesta de Arreglo:** El bug está en el código del backend que implementa el endpoint `GET /api/v1/users/{userId}/tasks`. Describe qué cambios harías en la lógica del backend para solucionar el bug de forma permanente.

2. **Descripción de Pull Request (PR):** Escribe una breve descripción para un Pull Request que contenga tu arreglo. Debe incluir:
   - Un título claro
   - Un resumen del problema
   - Una explicación de la solución

### Parte 3: La Comunicación

**Respuesta al Equipo de Customer Support:** Escribe la respuesta que le darías al equipo de Customer Support en el ticket interno. Tu respuesta debe ser:
- Clara y concisa
- No excesivamente técnica
- Establecer una expectativa realista sobre los próximos pasos

---

## Configuración del Entorno (Opcional)

Este repositorio incluye un servidor funcional que reproduce el bug. Puedes usarlo para investigar el problema de forma interactiva.

### Opción 1: Con Docker (Recomendado)

```bash
# Levantar el servicio
docker compose up

# El servidor estará disponible en http://localhost:3000
```

### Opción 2: Con Node.js local

**Requisitos:**
- Node.js >= 18.0.0
- npm

```bash
# Instalar dependencias
npm install

# Ejecutar migraciones y seed
npm run setup

# Iniciar el servidor en modo desarrollo
npm run dev

# El servidor estará disponible en http://localhost:3000
```

### Ejemplos de llamadas al API

```bash
# Health check
curl http://localhost:3000/health

# Obtener tareas de John Smith (user_id: 25)
curl "http://localhost:3000/api/v1/users/25/tasks"

# Obtener tareas de John Smith con fecha límite (próximos 7 días desde el 14 de octubre)
curl "http://localhost:3000/api/v1/users/25/tasks?due_date_before=2025-10-21"

# Obtener tareas filtradas por status
curl "http://localhost:3000/api/v1/users/25/tasks?status=in_progress"

# Combinando filtros
curl "http://localhost:3000/api/v1/users/25/tasks?status=in_progress&due_date_before=2025-10-21"
```

### Acceso a la Base de Datos

Si deseas ejecutar consultas SQL directamente:

```bash
# Con Docker
docker compose exec app sqlite3 /usr/src/app/data/taskmaster.db

# Sin Docker
sqlite3 data/taskmaster.db
```

---

## Estructura del Proyecto

```
├── src/
│   ├── server.js          # Servidor Express
│   ├── routes/
│   │   └── tasks.js       # Implementación del endpoint de tareas
│   └── db/
│       ├── connection.js  # Conexión a SQLite
│       ├── migrations/    # Scripts de migración
│       └── seeds/         # Datos de ejemplo
├── scripts/
│   ├── migrate.js         # Script de migración
│   ├── seed.js            # Script de seeding
│   └── entrypoint.sh      # Entrypoint para Docker
├── data/
│   └── taskmaster.db      # Base de datos SQLite (generada)
├── Dockerfile
├── docker-compose.yml
└── package.json
```

---

## Entregable

Por favor, envía tus respuestas a las **3 partes del challenge** en un único documento (PDF, Google Doc, o email).

**No es necesario que modifiques el código del repositorio**, aunque puedes hacerlo localmente si te ayuda a entender el problema.

¡Buena suerte! 🚀

