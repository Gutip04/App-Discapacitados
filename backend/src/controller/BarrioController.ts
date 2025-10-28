import { BarrioModel } from "../model/BarrioModel.js";
import  type { Request, Response } from "express";
import { barrioSchema, filtroBarrioSchema } from "../schemas/BarrioSchema.js";
import { validar } from "../schemas/PacienteShema.js";

export class BarrioController {

// listar barrios
static async listar(_req:Request, res: Response){
    // console.log("ruta de lisatr barrios")
    try{
        const barrios = await BarrioModel.obtener()
        res.json(barrios)
    } catch (err){
        res.status(500).json({ error: 'Error al obtener los barrios'})
    } 
}

// Crear Barrio
static async crear(req: Request, res: Response){
    try{
        const parse = barrioSchema.safeParse(req.body)
        if (!parse.success) {
        return res.status(400).json({
            error: "Datos inválidos",
            detalles: parse.error.issues
      });
    } 
        const  barrio = parse.data;
        
        const existente = await BarrioModel.buscar(barrio.nombre)
        if(existente) return res.status(409).json({ message: 'El barrio ya existe', barrio: existente})
        
        await BarrioModel.insertar(barrio)
        const creado = await BarrioModel.buscar(barrio.nombre)

        res.status(201).json({ message: "Barrio creado correctamente", barrio: creado })

    }catch(error){
        res.status(500).json({ error: 'Error al crear el barrio'})

    }
}

// editar Barrio
static async editar(req: Request, res: Response){
    try{
        const { id } = req.params

        const parse = barrioSchema.safeParse(req.body)
        if(!parse.success){
            return res.status(400).json({
                error: 'Datos invalidos',
                detalles: parse.error.issues
            })
        }

        const barrio = parse.data

        if(!id ){
            return res.status(400).json({ error: 'Falta id del Barrio'})
        }

        const existente = await BarrioModel.buscar(barrio.nombre)
        if(existente && existente.id != Number(id)){
            return res.status(409).json({ message: "Ya existe otro barrio con ese nombre", barrio: existente }); 
        }
        
        await BarrioModel.actualizar({ id: Number(id), ...barrio });
        res.json({
        message: "Barrio actualizado exitosamente",
        barrio: { id: Number(id), ...barrio }
        });

    } catch(error){
        // console.error("Error en editarBarrio:", error);
        res.status(500).json({ error: "Error al actualizar el barrio" });    }
}

// eliminar Barrio
static async eliminar(req: Request, res: Response){
    try{
        const { id } = req.params

        if(!id) return res.status(400).json({ error: "Falta el ID del barrio a eliminar" });
        
        await BarrioModel.eliminar(Number(id))
        res.json({ message: "Barrio eliminado exitosamente" });
    }catch (error){
        res.status(500).json({ error: "Error al eliminar el barrio" });

    }

}

// obtener Barrio por id
static async obtenerId(req: Request, res: Response){
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Falta el ID del barrio" });
    }

    const barrio = await BarrioModel.obtenerPorId(Number(id));

    if (!barrio) {
      return res.status(404).json({ message: "Barrio no encontrado" });
    }

    res.json(barrio);
  } catch (error) {
    console.error("Error al obtener el barrio:", error);
    res.status(500).json({ error: "Error al obtener el barrio" });
  }
};

// mostrar Barrios filtrados
static async mostrarFiltrados(req:Request, res:Response){
    // console.log("ruta activada de barrio filtrados");
  try {
    const resultado = validar(filtroBarrioSchema, req.query)
    if (!resultado.ok) {
      return res.status(400).json({ error: "Filtros inválidos", detalles: resultado.errores.map(e => e.message) });
    }
    
    const filtros = resultado.data

    const barrios = await BarrioModel.obtenerFiltrados(filtros);
    const total = await BarrioModel.contarFiltrados(filtros);

    res.json({ page: filtros.page, limit: filtros.limit,  total, resultados: barrios });
  } catch (error) {
    console.error("Error al obtener barrios filtrados:", error);
    res.status(500).json({ mensaje: "error al obtener los barrios " });
  }
};

}