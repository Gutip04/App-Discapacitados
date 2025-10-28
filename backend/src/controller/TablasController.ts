import { TablasModel } from "../model/TablasAdiModel.js"
import  type { Request, Response } from "express";

export class TablasController{

    // obtener tipos de discapacidad
static async tipoDiscapacidad(_req:Request, res: Response){

    // tipo de discapacidad
    try{
        const discapacidad = await TablasModel.tipoDiscapacidad()
        res.json(discapacidad)
    } catch (err){
        res.status(500).json({ error: 'Error al obtener los tipos de discapacidad'})
    }
} 

    // obtener grupos etnico
static async grupoEtnico(_req:Request, res: Response){
    // Grupo etnico
    try{
        const grupoEtnico = await TablasModel.grupoEtnico()
        res.json(grupoEtnico)
    } catch (err){
        res.status(500).json({ error: 'Error al obtener los Grupos etnicos'})
    } 
}

    // obtener victimas
static async victima(_req:Request, res: Response){
    // victima
    try{
        const victima = await TablasModel.victima()
        res.json(victima)
    } catch (err){
        res.status(500).json({ error: 'Error al obtener las victimas'})
    } 
}

    // obtener grado de estudio
static async gradoEstudio(_req:Request, res: Response){
    // grado estudio
    try{
        const gradoEstudio = await TablasModel.gradoEstudio()
        res.json(gradoEstudio)
    } catch (err){
        res.status(500).json({ error: 'Error al obtener los Grados de estudio'})
    } 


}


}