CREATE OR REPLACE VIEW vista_paciente_ciclo_vida AS
SELECT 
  p.*,
  
  -- 👇 Calculamos la edad
  TIMESTAMPDIFF(YEAR, p.fecha_nacimiento, CURDATE()) AS edad,

  -- 👇 Determinamos el ciclo de vida
  CASE
    WHEN TIMESTAMPDIFF(YEAR, p.fecha_nacimiento, CURDATE()) <= 5 THEN 'Primera infancia'
    WHEN TIMESTAMPDIFF(YEAR, p.fecha_nacimiento, CURDATE()) <= 11 THEN 'Infancia'
    WHEN TIMESTAMPDIFF(YEAR, p.fecha_nacimiento, CURDATE()) <= 25 THEN 'Juventud'
    WHEN TIMESTAMPDIFF(YEAR, p.fecha_nacimiento, CURDATE()) <= 59 THEN 'Adultez'
    ELSE 'Adulto mayor'
  END AS ciclo_vida_nombre,

  -- 👇 Nombres de las relaciones
  z.nombre AS zona_nombre,
  b.nombre AS barrio_nombre,
  v.nombre AS vereda_nombre,
  e.nombre AS eps_nombre,
  vic.nombre AS victima_nombre,
  td.nombre AS tipo_discapacidad_nombre,
  ge.nombre AS grupo_etnico_nombre,
  ev.nombre AS estado_vida_nombre,
  g.nombre AS grado_estudio_nombre,
  s.nombre As sexo_nombre
FROM paciente p
LEFT JOIN zona z ON p.zona_id = z.id
LEFT JOIN barrio b ON p.barrio_id = b.id
LEFT JOIN vereda v ON p.vereda_id = v.id
LEFT JOIN eps e ON p.eps_id = e.id
LEFT JOIN victima vic ON p.victima_id = vic.id
LEFT JOIN tipo_discapacidad td ON p.tipo_discapacidad_id = td.id
LEFT JOIN grupo_etnico ge ON p.grupo_etnico_id = ge.id
LEFT JOIN estado_vida ev ON p.estado_vida_id = ev.id
LEFT JOIN grado_estudio g ON p.grado_estudio_id = g.id
LEFT JOIN sexo s ON p.sexo_id = s.id;

