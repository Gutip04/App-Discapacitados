import { useState, useEffect, useCallback } from "react";
import { VeredaService } from "../services/VeredaService";
import type { Vereda } from "../types/VeredasTypes";
import type { Filtros } from "./UseBarrios";

interface ApiResponse{
    resultados: Vereda[]
    total: number
}

export function UseVeredas(initialFiltros:Filtros) {
    const [filtros, setFiltros] = useState<Filtros>(initialFiltros)
    const [veredas, setVeredas] = useState<Vereda[]>([])
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);


// Buscar vereda
    const buscarVeredas = useCallback(async () => {
        setLoading(true)
        setError(null)

        try{
            // Limpiar filtros antes de enviarlos
            const filtrosLimpios = {...filtros}
            if(!filtrosLimpios.nombre?.trim()){
                delete filtrosLimpios.nombre
            }

            const response = await VeredaService.filtrar(filtrosLimpios)
            const data = response.data as ApiResponse
            setVeredas(data.resultados)
            setTotal(data.total)
        } catch (err){
            if (err instanceof Error){
                setError("Error al cargar veredas"); // ---> poner (err.message) opcional
            } else {
                setError("Error al cargar veredas")
                console.error(err);
            } 
        } finally{
            setLoading(false)
        }
    }, [filtros])


// useEfect
useEffect(() =>{
    buscarVeredas()
},[buscarVeredas])

// EliminaVereda
const eliminarVereda = async(id:number) =>{
    setLoading(true)
    setError(null)

    try{
        await VeredaService.eliminar(id)
        setVeredas((prev) => prev.filter((v) => v.id !== id ))
        setTotal((prev) => prev - 1)
    } catch{
        setError("No se pudo eliminar la Vereda")
    } finally{
        setLoading(false)
    }
}

return{
    veredas,
    total,
    loading,
    error,
    filtros,
    setFiltros,
    buscarVeredas,
    eliminarVereda
}

}