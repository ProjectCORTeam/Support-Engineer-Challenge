-- Seed data for TaskMaster challenge
-- Context: Today's date is October 14, 2025

-- Insert users
INSERT OR REPLACE INTO users (id, name, email, role) VALUES
(12, 'Sarah Miller', 'sarah.miller@globalcorp.com', 'manager'),
(25, 'John Smith', 'john.smith@globalcorp.com', 'employee'),
(30, 'Alice Johnson', 'alice.johnson@globalcorp.com', 'employee'),
(31, 'Bob Williams', 'bob.williams@globalcorp.com', 'employee');

-- Insert tasks for John Smith (user_id: 25)
-- These are the tasks mentioned in the challenge scenario
INSERT OR REPLACE INTO tasks (id, title, assignee_id, status, due_date, is_deleted) VALUES
(101, 'Preparar reporte Q3', 25, 'in_progress', '2025-10-16 17:00:00', 0),
(102, 'Contactar a nuevos leads', 25, 'pending', '2025-10-22 10:00:00', 0),
(103, 'Actualizar presentación de ventas', 25, 'in_progress', '2025-10-17 12:00:00', 1),
(104, 'Revisar métricas de la campaña', 25, 'archived', '2025-10-15 11:00:00', 0),
(105, 'Finalizar draft del blog post', 25, 'in_progress', '2025-10-14 18:00:00', 0);

-- Additional tasks for other users (for variety)
INSERT OR REPLACE INTO tasks (id, title, assignee_id, status, due_date, is_deleted) VALUES
(201, 'Revisar presupuesto Q4', 12, 'in_progress', '2025-10-18 09:00:00', 0),
(202, 'Reunión con stakeholders', 12, 'pending', '2025-10-15 14:00:00', 0),
(301, 'Completar onboarding', 30, 'completed', '2025-10-10 17:00:00', 0),
(302, 'Configurar entorno de desarrollo', 30, 'in_progress', '2025-10-16 12:00:00', 0);

