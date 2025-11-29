-- ============================================
-- INSERTS PARA ESPECIALIDADES
-- ============================================

INSERT INTO "Specialty" (name) VALUES
('Medicina General'),
('Pediatría'),
('Dermatología'),
('Cardiología'),
('Odontología'),
('Neurología'),
('Nutrición'),
('Oftalmología');

-- ============================================
-- INSERTS PARA DOCTORES
-- ============================================

INSERT INTO "Doctor" (id, name, "lastName", email, tlf, biography, photo, "createdAt", "updatedAt") VALUES
('d1a48e7f-6b12-4d8e-a31f-cfd1fb100001', 'Carlos', 'Rodríguez', 'carlos.rodriguez@hospital.com', '555-0101', 'Especialista en medicina general con 15 años de experiencia', 'https://i.pravatar.cc/150?img=12', NOW(), NOW()),
('d1a48e7f-6b12-4d8e-a31f-cfd1fb100002', 'María', 'González', 'maria.gonzalez@hospital.com', '555-0102', 'Pediatra dedicada al cuidado infantil desde hace 10 años', 'https://i.pravatar.cc/150?img=45', NOW(), NOW()),
('d1a48e7f-6b12-4d8e-a31f-cfd1fb100003', 'José', 'Martínez', 'jose.martinez@hospital.com', '555-0103', 'Dermatólogo experto en tratamientos estéticos y médicos', 'https://i.pravatar.cc/150?img=13', NOW(), NOW()),
('d1a48e7f-6b12-4d8e-a31f-cfd1fb100004', 'Ana', 'López', 'ana.lopez@hospital.com', '555-0104', 'Cardióloga con especialización en cirugía cardíaca', 'https://i.pravatar.cc/150?img=47', NOW(), NOW()),
('d1a48e7f-6b12-4d8e-a31f-cfd1fb100005', 'Luis', 'Fernández', 'luis.fernandez@hospital.com', '555-0105', 'Odontólogo con más de 12 años de experiencia', 'https://i.pravatar.cc/150?img=14', NOW(), NOW()),
('d1a48e7f-6b12-4d8e-a31f-cfd1fb100006', 'Carmen', 'Sánchez', 'carmen.sanchez@hospital.com', '555-0106', 'Neuróloga especializada en trastornos del sueño', 'https://i.pravatar.cc/150?img=48', NOW(), NOW()),
('d1a48e7f-6b12-4d8e-a31f-cfd1fb100007', 'Pedro', 'Ramírez', 'pedro.ramirez@hospital.com', '555-0107', 'Nutricionista certificado en deportes de alto rendimiento', 'https://i.pravatar.cc/150?img=15', NOW(), NOW()),
('d1a48e7f-6b12-4d8e-a31f-cfd1fb100008', 'Laura', 'Torres', 'laura.torres@hospital.com', '555-0108', 'Oftalmóloga experta en cirugía refractiva', 'https://i.pravatar.cc/150?img=49', NOW(), NOW()),
('d1a48e7f-6b12-4d8e-a31f-cfd1fb100009', 'Miguel', 'Flores', 'miguel.flores@hospital.com', '555-0109', 'Médico general con enfoque en medicina preventiva', 'https://i.pravatar.cc/150?img=16', NOW(), NOW()),
('d1a48e7f-6b12-4d8e-a31f-cfd1fb100010', 'Isabel', 'Vargas', 'isabel.vargas@hospital.com', '555-0110', 'Pediatra especializada en neonatología', 'https://i.pravatar.cc/150?img=50', NOW(), NOW()),
('d1a48e7f-6b12-4d8e-a31f-cfd1fb100011', 'Roberto', 'Castro', 'roberto.castro@hospital.com', '555-0111', 'Dermatólogo experto en enfermedades de la piel', 'https://i.pravatar.cc/150?img=17', NOW(), NOW()),
('d1a48e7f-6b12-4d8e-a31f-cfd1fb100012', 'Patricia', 'Morales', 'patricia.morales@hospital.com', '555-0112', 'Cardióloga intervencionista con 8 años de experiencia', 'https://i.pravatar.cc/150?img=51', NOW(), NOW()),
('d1a48e7f-6b12-4d8e-a31f-cfd1fb100013', 'Fernando', 'Jiménez', 'fernando.jimenez@hospital.com', '555-0113', 'Odontólogo especializado en ortodoncia', 'https://i.pravatar.cc/150?img=18', NOW(), NOW()),
('d1a48e7f-6b12-4d8e-a31f-cfd1fb100014', 'Sofía', 'Ruiz', 'sofia.ruiz@hospital.com', '555-0114', 'Neuróloga experta en enfermedades neurodegenerativas', 'https://i.pravatar.cc/150?img=52', NOW(), NOW()),
('d1a48e7f-6b12-4d8e-a31f-cfd1fb100015', 'Diego', 'Herrera', 'diego.herrera@hospital.com', '555-0115', 'Nutricionista especializado en obesidad y diabetes', 'https://i.pravatar.cc/150?img=19', NOW(), NOW()),
('d1a48e7f-6b12-4d8e-a31f-cfd1fb100016', 'Gabriela', 'Méndez', 'gabriela.mendez@hospital.com', '555-0116', 'Oftalmóloga con subespecialidad en retina', 'https://i.pravatar.cc/150?img=53', NOW(), NOW()),
('d1a48e7f-6b12-4d8e-a31f-cfd1fb100017', 'Andrés', 'Ramos', 'andres.ramos@hospital.com', '555-0117', 'Médico general certificado en medicina familiar', 'https://i.pravatar.cc/150?img=20', NOW(), NOW()),
('d1a48e7f-6b12-4d8e-a31f-cfd1fb100018', 'Verónica', 'Cruz', 'veronica.cruz@hospital.com', '555-0118', 'Pediatra con maestría en desarrollo infantil', 'https://i.pravatar.cc/150?img=54', NOW(), NOW()),
('d1a48e7f-6b12-4d8e-a31f-cfd1fb100019', 'Javier', 'Ortiz', 'javier.ortiz@hospital.com', '555-0119', 'Cardiólogo especializado en arritmias', 'https://i.pravatar.cc/150?img=21', NOW(), NOW()),
('d1a48e7f-6b12-4d8e-a31f-cfd1fb100020', 'Daniela', 'Navarro', 'daniela.navarro@hospital.com', '555-0120', 'Nutricionista experta en nutrición clínica', 'https://i.pravatar.cc/150?img=55', NOW(), NOW());

-- ============================================
-- INSERTS PARA TABLA INTERMEDIA DoctorSpecialty
-- Asigna especialidades a los doctores
-- ============================================

INSERT INTO "DoctorSpecialty" ("doctorId", "specialtyId") VALUES
-- Doctor Carlos Rodríguez - Medicina General
('d1a48e7f-6b12-4d8e-a31f-cfd1fb100001', 1),

-- Doctora María González - Pediatría
('d1a48e7f-6b12-4d8e-a31f-cfd1fb100002', 2),

-- Doctor José Martínez - Dermatología
('d1a48e7f-6b12-4d8e-a31f-cfd1fb100003', 3),

-- Doctora Ana López - Cardiología
('d1a48e7f-6b12-4d8e-a31f-cfd1fb100004', 4),

-- Doctor Luis Fernández - Odontología
('d1a48e7f-6b12-4d8e-a31f-cfd1fb100005', 5),

-- Doctora Carmen Sánchez - Neurología
('d1a48e7f-6b12-4d8e-a31f-cfd1fb100006', 6),

-- Doctor Pedro Ramírez - Nutrición
('d1a48e7f-6b12-4d8e-a31f-cfd1fb100007', 7),

-- Doctora Laura Torres - Oftalmología
('d1a48e7f-6b12-4d8e-a31f-cfd1fb100008', 8),

-- Doctor Miguel Flores - Medicina General
('d1a48e7f-6b12-4d8e-a31f-cfd1fb100009', 1),

-- Doctora Isabel Vargas - Pediatría
('d1a48e7f-6b12-4d8e-a31f-cfd1fb100010', 2),

-- Doctor Roberto Castro - Dermatología
('d1a48e7f-6b12-4d8e-a31f-cfd1fb100011', 3),

-- Doctora Patricia Morales - Cardiología
('d1a48e7f-6b12-4d8e-a31f-cfd1fb100012', 4),

-- Doctor Fernando Jiménez - Odontología
('d1a48e7f-6b12-4d8e-a31f-cfd1fb100013', 5),

-- Doctora Sofía Ruiz - Neurología
('d1a48e7f-6b12-4d8e-a31f-cfd1fb100014', 6),

-- Doctor Diego Herrera - Nutrición
('d1a48e7f-6b12-4d8e-a31f-cfd1fb100015', 7),

-- Doctora Gabriela Méndez - Oftalmología
('d1a48e7f-6b12-4d8e-a31f-cfd1fb100016', 8),

-- Doctor Andrés Ramos - Medicina General
('d1a48e7f-6b12-4d8e-a31f-cfd1fb100017', 1),

-- Doctora Verónica Cruz - Pediatría
('d1a48e7f-6b12-4d8e-a31f-cfd1fb100018', 2),

-- Doctor Javier Ortiz - Cardiología
('d1a48e7f-6b12-4d8e-a31f-cfd1fb100019', 4),

-- Doctora Daniela Navarro - Nutrición
('d1a48e7f-6b12-4d8e-a31f-cfd1fb100020', 7),

-- Algunos doctores con especialidades adicionales (multidisciplinarios)
('d1a48e7f-6b12-4d8e-a31f-cfd1fb100001', 7), -- Carlos también en Nutrición
('d1a48e7f-6b12-4d8e-a31f-cfd1fb100004', 1), -- Ana también en Medicina General
('d1a48e7f-6b12-4d8e-a31f-cfd1fb100007', 1), -- Pedro también en Medicina General
('d1a48e7f-6b12-4d8e-a31f-cfd1fb100012', 1); -- Patricia también en Medicina General
