import  type { Request, Response } from "express";
import { EpsModel  } from "../model/EpsModel.js";
import { epsSchema } from "../schemas/EpsShema.js";
import { filtroVeredaSchema } from "../schemas/VeredaSchema.js";
import { validar } from "../schemas/PacienteShema.js";

export class EpsController {

    //Listar Eps 
static async listar(_req:Request, res: Response){
      try{
          const eps = await EpsModel.obtener()
          res.json(eps)
      } catch (err){
          res.status(500).json({ error: 'Error al obtener las eps'})
      } 
};

  // Crear Eps
static async crear(req: Request, res: Response){
      try{
          const parse = epsSchema.safeParse(req.body)
          if (!parse.success) {
          return res.status(400).json({
              error: "Datos inválidos",
              detalles: parse.error.issues
        });
      } 
  
          const  eps = parse.data;
          
          const existente = await EpsModel.buscar(eps.nombre)
          if(existente) return res.status(409).json({ message: 'La Eps ya existe', eps: existente})
          
          await EpsModel.insertar(eps)
          const creado = await EpsModel.buscar(eps.nombre)
  
          res.status(201).json({ message: "eps creado correctamente", eps: creado })
  
      }catch(error){
          res.status(500).json({ error: 'Error al crear la eps'})
  
      }
};

  // Editar Eps
static async editar(req: Request, res: Response){
      try{
          const { id } = req.params

          const parse = epsSchema.safeParse(req.body)
          if(!parse.success){
              return res.status(400).json({
                  error: 'Datos invalidos',
                  detalles: parse.error.issues
              })
          }

          const eps = parse.data

          if(!id ){
              return res.status(400).json({ error: 'Falta id de la Eps'})
          }

          const existente = await EpsModel.buscar(eps.nombre)
          if(existente && existente.id != Number(id)){
              return res.status(409).json({ message: "Ya existe otra Eps con ese nombre", eps: existente }); 
          }
          
          await EpsModel.actualizar({ id: Number(id), ...eps });
          res.json({
          message: "Eps actualizada exitosamente",
          eps: { id: Number(id), ...eps }
          });

      } catch(error){
          console.error("Error en editarEps:", error);
          res.status(500).json({ error: "Error al actualizar la Eps" }); }
};

  // Eliminar Eps
static async eliminar(req: Request, res: Response){
      try{
          const { id } = req.params

          if(!id) return res.status(400).json({ error: "Falta el ID de la eps a eliminar" });
          
          await EpsModel.eliminar(Number(id))
          res.json({ message: "Eps eliminada exitosamente" });
      }catch (error){
          res.status(500).json({ error: "Error al eliminar la Eps" });

      }

};
  
  // obtener una eps
static async obtenerId(req: Request, res: Response){
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ error: "Falta el ID de la eps" });
      }

      const eps = await EpsModel.obtenerPorId(Number(id));

      if (!eps) {
        return res.status(404).json({ message: "eps no encontrada" });
      }

      res.json(eps);
    } catch (error) {
      console.error("Error al obtener la eps:", error);
      res.status(500).json({ error: "Error al obtener la eps" });
    }
};

// mostrar eps filtrados
static async EpsFiltrados(req:Request, res:Response){
    // console.log("ruta activada de eps filtrados");
  try {
    const resultado = validar(filtroVeredaSchema, req.query)
    if (!resultado.ok) {
      return res.status(400).json({ error: "Filtros inválidos", detalles: resultado.errores.map(e => e.message) });
    }
    
    const filtros = resultado.data

    const eps = await EpsModel.obtenerFiltrados(filtros);
    const total = await EpsModel.contarFiltrados(filtros);

    res.json({ page: filtros.page, limit: filtros.limit,  total, resultados: eps });
  } catch (error) {
    console.error("Error al obtener eps filtradas:", error);
    res.status(500).json({ mensaje: "error al obtener las eps " });
  }
};

}