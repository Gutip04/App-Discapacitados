
-- Script para poblar tablas 
-- Sexo
INSERT IGNORE INTO sexo (nombre) VALUES ('Masculino'), ('Femenino');

-- Zona
INSERT IGNORE INTO zona (nombre) VALUES ('Urbana'), ('Rural');

-- EPS
INSERT IGNORE INTO eps (nombre) VALUES ('SURA'), ('Sanitas'), ('Nueva EPS');

-- Tipo de discapacidad
INSERT IGNORE INTO tipo_discapacidad (nombre) VALUES
('Ninguna'), ('Fisica'), ('Sordocegera'), ('Cognitiva'), ('Sitematica'),  ('Visual'), ('Auditiva'), ('Motora'), ('Intelectual'), ('Psicosocial'), ('Múltiple');

-- Grupo étnico
INSERT IGNORE INTO grupo_etnico (nombre) VALUES
('Indígena'), ('Afrocolombiano'), ('Raizal'), ('Palenquero'), ('Rom'), ('Sin pertenencia étnica');

-- Grado de estudio
INSERT IGNORE INTO grado_estudio (nombre) VALUES
('Ninguna'), ('Preescolar'), ('Basica-Primaria-5'), ('Basica-Secundaria'), ('Media-Bachiller'),
 ('Técnico'), ('Tecnológico'), ('Profesional'), ('Educacion Superior');

-- Víctima
INSERT IGNORE INTO victima (nombre) VALUES
('Desplazamiento forzado'), ('Violencia sexual'), ('Reclutamiento forzado'),
('Mina antipersonal'), ('Ninguna'), ('Actos Terroristas'), 
('Desaparicion Forzada'), ('Secuestro'), ('Tortura'), ('Victima del conflicto Armado'),
('Vinculacion de Niños(as) a Grupos Armados') ;

-- Barrios
INSERT IGNORE INTO barrio (nombre, zona_id) VALUES
('Ninguno', 1),
('Centro', 1),
('San José', 1),
('La Esperanza', 1),
('Villa del Sol', 1),
('Los Pinos', 1),
('Santa María', 1),
('El Prado', 1);

-- Vereda 
INSERT IGNORE INTO vereda (nombre, zona_id) VALUES
('Ninguno', 1),
('El Progreso', 2),
('La Palma', 2),
('Santa Rosa', 2),
('El Retiro', 2),
('Monteverde', 2),
('La Cumbre', 2),
('Las Brisas', 2);

-- estado de vida
INSERT IGNORE INTO estado_vida (nombre) VALUES ('Vivo'), ('Fallecido');

INSERT IGNORE INTO paciente (
  estado_vida_id,fecha_seguimiento, fecha_visita, identificacion, nombres_apellidos,
  fecha_nacimiento, trabaja, estudia, sexo_id,
  telefono, direccion, zona_id, barrio_id, vereda_id, cuidador,
  sustento, eps_id, tipo_discapacidad_id, diagnostico_discapacidad,
  grupo_etnico_id, victima_id, vivienda, grado_estudio_id,
  cultura_recreacion, dispositivo, observaciones
) VALUES (
  1,'2025-10-08', '2025-10-08', 1234567890, 'Juan Pérez',
  '2010-05-12', true, false, 1,
  '3001234567', 'Calle 123 #45-67', 1, 2, 1, 'María Pérez',
  true, 1, 3, 'Discapacidad motora leve',
  2, 5, false, 4,
  false, 'Silla de ruedas', 'Paciente con buena actitud y apoyo familiar'
);


