import type { Request, Response } from "express";
import { filtroPacienteSchema, pacienteSchema, validar } from "../schemas/PacienteShema.js";
import { PacienteModel } from "../model/PacienteModel.js";

export class PacienteController{

  // Crear Paciente
static async crear(req: Request, res: Response){
  //  console.log("Controlador de crear paciente");
    try{
        const resultado = validar(pacienteSchema, req.body)
        if(!resultado.ok){
            return res.status(400).json({ 
                error: "Datos invalidos", 
                detalles: resultado.errores.map(e => e.message)
            })
        }

        const paciente = resultado.data

        const existente = await PacienteModel.buscarPorIdentificacion(paciente.identificacion)
        if(existente) return res.status(409).json({ 
            message: 'El paciente ya existe', 
            Paciente: {
                identificacion : existente.identificacion,
                nombres_apeliidos : existente.nombres_apellidos,
                edad: existente.edad
            }
        })
        await PacienteModel.Insertar(paciente);
        res.status(201).json({ message: "paciente creado correctamente", Paciente: paciente })
 
    } catch (error){
        console.error("Error al crear el paciente: ",error)
        res.status(500).json({ error: "Error al crear el paciente" });
    }

}


  // editar Paciente
static async editar(req: Request, res: Response){
  try {
    const { id } = req.params;

    const resultado = validar(pacienteSchema, req.body);
    if (!resultado.ok) {
      return res.status(400).json({
        error: "Datos inválidos",
        detalles: resultado.errores.map((e) => e.message),
      });
    }

    const paciente = resultado.data;

    // ✅ Buscar si hay otro paciente con esa identificación
    const existente = await PacienteModel.buscarPorIdentificacion(paciente.identificacion);

    if (existente && existente.id !== Number(id)) {
      // ⚠️ Si existe y NO es el mismo paciente => conflicto
      return res.status(409).json({
        message: "Hay un Paciente con esa Identificacion",
        Paciente: {
          identificacion: paciente.identificacion,
          nombres_apellidos: paciente.nombres_apellidos,
          edad: existente.edad,
        },
      });
    }

    // ✅ Si no hay conflicto, actualizamos
    await PacienteModel.actualizar({ id: Number(id), ...paciente });

    res.json({
      message: "Paciente actualizado correctamente",
      paciente: { id: Number(id), ...paciente },
    });
  } catch (error) {
    console.error("Error al actualizar paciente:", error);
    res.status(500).json({ error: "Error al actualizar el paciente" });
  }
};


  // eliminar paciente
static async eliminar(req: Request, res: Response){
    try{
        const { id } = req.params
        if(!id) return res.status(400).json({ error: "Falta el ID del paciente a eliminar" });
        
        await PacienteModel.eliminar(Number(id))
        res.json({ message: "Paciente eliminado exitosamente" });
    }catch (error){
        res.status(500).json({ error: "Error al eliminar al Paciente" });

    }

}

  // Mostrar todos los Pacientes
static async Listar(_req: Request, res: Response){
      // console.log("ruta activada de paciente");
  try {
    const pacientes = await PacienteModel.obtenerTodos();
    res.json(pacientes);
  } catch (error) {
    console.error("Error al obtener pacientes:", error);
    res.status(500).json({ error: "Error al obtener pacientes" });
  }
};

  // buscar por identificacion
static async obtenerId(req: Request, res: Response){
  const identificacion = Number(req.params.identificacion);
  if (isNaN(identificacion)) return res.status(400).json({ error: "Identificacion inválida" });

  try {
    const paciente = await PacienteModel.buscarPorIdentificacion(identificacion);
    if (!paciente) return res.status(404).json({ error: "Paciente no encontrado" });

    res.json(paciente);
  } catch (error) {
    console.error("Error al buscar paciente por identificacion:", error);
    res.status(500).json({ error: "Error al obtener paciente" });
  }
};

  // mostrar pacientes filtrados
static async mostrarFiltrados(req: Request, res: Response){
  // console.log("🟢 req.query recibido:", req.query);

  try {
    const resultado = validar(filtroPacienteSchema, req.query);
    if (!resultado.ok) {
      return res.status(400).json({ error: "Filtros inválidos", detalles: resultado.errores.map(e => e.message) });
    }

    const filtros = resultado.data;
    // console.log("✅ Filtros validados:", filtros);
    // console.log("Filtros recibidos:", filtros);
    

    const pacientes = await PacienteModel.obtenerFiltrados(filtros);
    const total = await PacienteModel.contarFiltrados(filtros)

    res.json({ page: filtros.page, limit: filtros.limit,  total, resultados: pacientes });
  } catch (error) {
    // console.log('error al buscar por filtro');
    
    // console.error("Error al obtener pacientes filtrados:", error);
    res.status(500).json({ error: "Error al obtener pacientes" });
  }
};


}