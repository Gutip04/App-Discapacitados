import { useCallback, useEffect, useState } from "react";
import type { FiltrosPaciente, Paciente } from "../types/PacientesTypes";
import { PacientesService } from "../services/PacientesService";

interface ApiResponse{
    resultados: Paciente[]
    total:number
}

export function usePacientes(initialFiltros:FiltrosPaciente){
    const [filtros, setFiltros] = useState<FiltrosPaciente>(initialFiltros);
    const [pacientes, setPacientes] = useState<Paciente[]>([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

// Buscar Paciente
const buscarPacientes = useCallback(async () =>{
        setLoading(true);
        setError(null);

    try{
        const filtrosLimpios = {...filtros}
        // Veririfacion de filtros
        if (!filtrosLimpios.nombres_apellidos?.trim()) delete filtrosLimpios.nombres_apellidos;
        if (!filtrosLimpios.eps_id) delete filtrosLimpios.eps_id;
        if (!filtrosLimpios.zona_id) delete filtrosLimpios.zona_id;

        const response= await PacientesService.filtrar(filtrosLimpios)
        const data = response.data as ApiResponse
        setPacientes(data.resultados)
        setTotal(data.total)

    } catch(err){
        setError("Error al cargar pacientes")
        console.error(err);        
    } finally{
        setLoading(false)
    }
}, [filtros])


// UseEffect
useEffect(() => {
    buscarPacientes();
  }, [buscarPacientes]);

const eliminarPaciente = async (id: number) => {
    setLoading(true);
    setError(null);

try {
    await PacientesService.eliminar(id);
    setPacientes((prev) => prev.filter((p) => p.id !== id));
    setTotal((prev) => prev - 1);
} catch (err) {
    setError("No se pudo eliminar el paciente");
    console.error(err);
} finally {
    setLoading(false);
}
};


return {
    pacientes,
    total,
    loading,
    error,
    filtros,
    setFiltros,
    buscarPacientes,
    eliminarPaciente
  };

}