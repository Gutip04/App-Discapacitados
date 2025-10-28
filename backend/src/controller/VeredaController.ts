import  type { Request, Response } from "express";
import { VeredaModel } from "../model/veredaModel.js";
import { filtroVeredaSchema,  veredaSchema } from "../schemas/VeredaSchema.js";
import { validar } from "../schemas/PacienteShema.js";

export class VeredaController {

  // Listar Veredas
static async listar(_req:Request, res: Response){
    try{
        const veredas = await VeredaModel.obtener()
        res.json(veredas)
    } catch (err){
        res.status(500).json({ error: 'Error al obtener las veredas'})
    } 
}

  // crear Vereda
static async crear(req: Request, res: Response){
    try{
        const parse = veredaSchema.safeParse(req.body)
        if (!parse.success) {
        return res.status(400).json({
            error: "Datos inválidos",
            detalles: parse.error.issues
      });
    } 

        const  vereda = parse.data;
        
        const existente = await VeredaModel.buscar(vereda.nombre)
        if(existente) return res.status(409).json({ message: 'La vereda ya existe', vereda: existente})
        
        await VeredaModel.insertar(vereda)
        const creado = await VeredaModel.buscar(vereda.nombre)

        res.status(201).json({ message: "Vereda creada correctamente", vereda: creado })

    }catch(error){
        res.status(500).json({ error: 'Error al crear la vereda'})

    }
}

  // editar Vereda
static async editar(req: Request, res: Response){
    try{
        const { id } = req.params

        const parse = veredaSchema.safeParse(req.body)
        if(!parse.success){
            return res.status(400).json({
                error: 'Datos invalidos',
                detalles: parse.error.issues
            })
        }

        const vereda = parse.data

        if(!id ){
            return res.status(400).json({ error: 'Falta id de la Vereda'})
        }

        const existente = await VeredaModel.buscar(vereda.nombre)
        if(existente && existente.id != Number(id)){
            return res.status(409).json({ message: "Ya existe otro Vereda con ese nombre", vereda: existente }); 
        }
        
        await VeredaModel.actualizar({ id: Number(id), ...vereda });
        res.json({
        message: "Vereda actualizado exitosamente",
        barrio: { id: Number(id), ...vereda }
        });

    } catch(error){
        console.error("Error en editarVereda:", error);
        res.status(500).json({ error: "Error al actualizar la Vereda" });    }
}

  // eliminar Vereda
static async eliminar(req: Request, res: Response){
    try{
        const { id } = req.params

        if(!id) return res.status(400).json({ error: "Falta el ID de la vereda a eliminar" });
        
        await VeredaModel.eliminar(Number(id))
        res.json({ message: "Vereda eliminada exitosamente" });
    }catch (error){
        res.status(500).json({ error: "Error al eliminar la vereda" });

    }
}

  // obtener una vereda
static async obtenerId(req: Request, res: Response){
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Falta el ID de la vereda" });
    }

    const vereda = await VeredaModel.obtenerPorId(Number(id));

    if (!vereda) {
      return res.status(404).json({ message: "vereda no encontrada" });
    }

    res.json(vereda);
  } catch (error) {
    console.error("Error al obtener la vereda:", error);
    res.status(500).json({ error: "Error al obtener la vereda" });
  }
};

// mostrar vereda filtrados
static async mostrarFiltrados(req:Request, res:Response){
    // console.log("ruta activada de vereda filtrados");
  try {
    const resultado = validar(filtroVeredaSchema, req.query)
    if (!resultado.ok) {
      return res.status(400).json({ error: "Filtros inválidos", detalles: resultado.errores.map(e => e.message) });
    }
    
    const filtros = resultado.data

    const veredas = await VeredaModel.obtenerFiltrados(filtros);
    const total = await VeredaModel.contarFiltrados(filtros);

    res.json({ page: filtros.page, limit: filtros.limit,  total, resultados: veredas });
  } catch (error) {
    console.error("Error al obtener veredas filtradas:", error);
    res.status(500).json({ mensaje: "error al obtener las veredas " });
  }
};

}