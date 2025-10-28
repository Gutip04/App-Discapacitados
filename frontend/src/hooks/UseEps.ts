import { useState, useEffect, useCallback } from "react";
import type { Eps } from "../types/EpsTypes";
import type { Filtros } from "./UseBarrios";
import { EpsService } from "../services/EpsService";

interface ApiResponse{
    resultados: Eps[]
    total: number
}

export function UseEps(initialFiltros:Filtros){
    const [filtros, setFiltros] = useState<Filtros>(initialFiltros)
    const [eps, setEps] = useState<Eps[]>([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);


// buscar EPS   
const buscarEps = useCallback(async() =>{
    setLoading(true)
    setError(null)

    try {
      // ✅ Limpia el filtro antes de enviarlo
      const filtrosLimpios = { ...filtros };
      if (!filtrosLimpios.nombre?.trim()) {
        delete filtrosLimpios.nombre;
      }

      const response = await EpsService.filtrar(filtrosLimpios);
      const data = response.data as ApiResponse;
      setEps(data.resultados);
      setTotal(data.total);
    } catch (err) {
      if (err instanceof Error) {
        setError("Error al cargar Eps"); // ---> poner (err.message) opcional
      } else {
        setError("Error al cargar Eps");
        console.error(err);
      }
    } finally {
      setLoading(false);
    }
  }, [filtros]);

// UseEfect
  useEffect(() =>{
    buscarEps()
  }, [buscarEps])

// EliminarEps
  const eliminarEps = async (id: number) => {
    setLoading(true);
    setError(null);

    try {
      await EpsService.eliminar(id);
      setEps((prev) => prev.filter((e) => e.id !== id));
      setTotal((prev) => prev - 1);
    } catch (err) {
      setError("No se pudo eliminar la Eps");
      console.error(err);
    } finally {
      setLoading(false);
    }
};

  return {
    eps,
    total,
    loading,
    error,
    filtros,
    setFiltros,
    buscarEps,
    eliminarEps
  };


}