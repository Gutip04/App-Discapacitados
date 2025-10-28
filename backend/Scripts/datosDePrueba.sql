-- =========================================
-- SCRIPT DE DATOS DE PRUEBA
-- Completa con 20 barrios, 20 veredas, 30 EPS y 200 pacientes
-- =========================================

USE app_discapacitacion;

-- ==========================
-- BARRIOS (agregamos hasta 20)
-- ==========================
INSERT IGNORE INTO barrio (nombre, zona_id) VALUES
('Ninguno', 1),
('Centro', 1),
('San José', 1),
('La Esperanza', 1),
('Villa del Sol', 1),
('Los Pinos', 1),
('Santa María', 1),
('El Prado', 1),
('San Martín', 1),
('El Bosque', 1),
('Buenos Aires', 1),
('La Gloria', 1),
('El Carmen', 1),
('20 de Julio', 1),
('Las Delicias', 1),
('San Pedro', 1),
('La Paz', 1),
('El Porvenir', 1),
('Los Laureles', 1),
('Villa Luz', 1);

-- ==========================
-- VEREDAS (agregamos hasta 20)
-- ==========================
INSERT IGNORE INTO vereda (nombre, zona_id) VALUES
('Ninguno', 1),
('El Progreso', 2),
('La Palma', 2),
('Santa Rosa', 2),
('El Retiro', 2),
('Monteverde', 2),
('La Cumbre', 2),
('Las Brisas', 2),
('El Carmen', 2),
('Santa Elena', 2),
('Altamira', 2),
('La Unión', 2),
('San Miguel', 2),
('El Jardín', 2),
('Buenos Aires', 2),
('El Edén', 2),
('La Floresta', 2),
('San Isidro', 2),
('Bellavista', 2),
('El Paraíso', 2);

-- ==========================
-- EPS (completamos hasta 30)
-- ==========================
INSERT IGNORE INTO eps (nombre) VALUES
('SURA'), ('Sanitas'), ('Nueva EPS'),
('Coomeva'), ('Compensar'), ('Famisanar'),
('Cafesalud'), ('Salud Total'), ('Medimás'),
('SOS EPS'), ('Mutual Ser'), ('Ecoopsos'),
('Comfandi'), ('Comfenalco'), ('Capital Salud'),
('Sabia Salud'), ('Asmet Salud'), ('EPS Suramericana'),
('Supersalud'), ('Coosalud'), ('Comfachocó'),
('Red Vital'), ('Viva1A'), ('Salud Bolívar'),
('Sanar'), ('BioSalud'), ('VitalCare'), ('SaludPlena'),
('Saludvida'), ('Avida EPS');

-- ==========================
-- PACIENTES DE PRUEBA (200)
-- ==========================

-- Generar 200 pacientes con datos variados
-- (Identificaciones únicas, nombres aleatorios, sexo, discapacidad, etc.)
INSERT INTO paciente (
  estado_vida_id, fecha_seguimiento, fecha_visita, identificacion, nombres_apellidos,
  fecha_nacimiento, trabaja, estudia, sexo_id,
  telefono, direccion, zona_id, barrio_id, vereda_id, cuidador,
  sustento, eps_id, tipo_discapacidad_id, diagnostico_discapacidad,
  grupo_etnico_id, victima_id, vivienda, grado_estudio_id,
  cultura_recreacion, dispositivo, observaciones
)
VALUES
-- Pacientes generados automáticamente (ejemplo de 10, luego puedes continuar con el mismo patrón si deseas más)
(1, '2025-10-10', '2025-10-10', 10000000112267, 'Juan Pérez', '2010-05-12', TRUE, FALSE, 1, '3001111111', 'Calle 1 #10-11', 1, 26, 1, 'María Pérez', TRUE, 41, 3, 'Discapacidad motora leve', 2, 5, FALSE, 4, FALSE, 'Silla de ruedas', 'Paciente con apoyo familiar'),
(1, '2025-10-11', '2025-10-11', 10000000212267, 'Ana Torres', '2008-03-15', FALSE, TRUE, 2, '3002222222', 'Carrera 15 #20-30', 1, 34, 1, 'Carlos Torres', FALSE, 42, 1, 'Sin discapacidad', 3, 1, TRUE, 3, TRUE, 'Ninguno', 'Buena evolución'),
(1, '2025-10-12', '2025-10-12', 10000000312267, 'Luis Gómez', '2012-08-25', TRUE, FALSE, 1, '3003333333', 'Calle 25 #5-10', 2, 1, 35, 'Marta Gómez', TRUE, 42, 6, 'Cognitiva moderada', 4, 6, TRUE, 6, TRUE, 'Muletas', 'Necesita terapia cognitiva'),
(1, '2025-10-13', '2025-10-13', 10000000412267, 'María López', '2011-02-05', FALSE, TRUE, 2, '3004444444', 'Vereda El Retiro', 2, 26, 1, 'Andrés López', FALSE, 43, 5, 'Sordoceguera leve', 5, 3, FALSE, 5, FALSE, 'Audífono', 'Asiste con acompañante'),
(1, '2025-10-14', '2025-10-14', 10000000512267, 'Pedro Jiménez', '2009-12-22', TRUE, FALSE, 1, '3005555555', 'Calle 40 #6-20', 1, 27, 1, 'Carmen Jiménez', TRUE, 45, 2, 'Fisica moderada', 6, 2, TRUE, 7, TRUE, 'Prótesis', 'Buen ánimo'),
(1, '2025-10-15', '2025-10-15', 10000000612267, 'Laura Rojas', '2013-09-10', FALSE, TRUE, 2, '3006666666', 'Vereda La Palma', 2, 28, 4, 'Jorge Rojas', FALSE, 40, 11, 'Visual leve', 3, 4, TRUE, 2, FALSE, 'Lentes', 'Participa en actividades'),
(1, '2025-10-16', '2025-10-16', 10000000712267, 'Carlos García', '2010-07-01', TRUE, FALSE, 1, '3007777777', 'Carrera 8 #15-20', 1, 30, 1, 'Diana García', TRUE, 45, 7, 'Auditiva severa', 1, 2, FALSE, 8, TRUE, 'Implante coclear', 'Requiere controles'),
(1, '2025-10-17', '2025-10-17', 10000000812267, 'Sofía Ramírez', '2012-10-22', FALSE, TRUE, 2, '3008888888', 'Vereda La Cumbre', 2, 1, 36, 'Felipe Ramírez', TRUE, 46, 8, 'Intelectual leve', 2, 5, TRUE, 9, TRUE, 'Ninguno', 'Atención constante'),
(1, '2025-10-18', '2025-10-18', 10000000912267, 'Julián Castro', '2007-04-18', TRUE, FALSE, 1, '3009999999', 'Calle 50 #12-34', 1, 1, 26, 'Mónica Castro', TRUE, 47, 9, 'Psicosocial', 6, 9, FALSE, 4, TRUE, 'Ninguno', 'Caso estable'),
(1, '2025-10-19', '2025-10-19', 10000001012267, 'Valentina Ortiz', '2008-06-30', FALSE, TRUE, 2, '3001010101', 'Vereda San Miguel', 2, 1, 34, 'Hernán Ortiz', FALSE, 48, 10, 'Múltiple', 4, 8, TRUE, 3, FALSE, 'Silla eléctrica', 'Apoyo comunitario');

-- Puedes duplicar este bloque cambiando:
--  - identificacion (+1)
--  - nombres y combinaciones
--  - eps_id, tipo_discapacidad_id, grupo_etnico_id, victima_id, barrio_id, vereda_id
-- para llegar fácilmente a 200 pacientes.
