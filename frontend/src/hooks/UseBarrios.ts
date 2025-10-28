import { useState, useEffect, useCallback } from "react";
import { BarrioService } from "../services/BarrioService";
import type { Barrio } from "../types/BarriosTypes";

export interface Filtros {
  nombre?: string;
  page: number;
  limit: number;
}

interface ApiResponse{
    resultados: Barrio[]
    total: number
}

export function useBarrios(initialFiltros: Filtros) {
    const [filtros, setFiltros] = useState<Filtros>(initialFiltros);
    const [barrios, setBarrios] = useState<Barrio[]>([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

// BUscar Barrio
const buscarBarrios = useCallback(async () => {
  setLoading(true);
  setError(null);

    try {
      // ✅ Limpia el filtro antes de enviarlo
      const filtrosLimpios = { ...filtros };
      if (!filtrosLimpios.nombre?.trim()) {
        delete filtrosLimpios.nombre;
      }

      const response = await BarrioService.filtrar(filtrosLimpios);
      const data = response.data as ApiResponse;
      setBarrios(data.resultados);
      setTotal(data.total);
    } catch (err) {
      if (err instanceof Error) {
        setError("Error al cargar barrios"); // ---> poner (err.message) opcional
      } else {
        setError("Error al cargar barrios");
        console.error(err);
      }
    } finally {
      setLoading(false);
    }
  }, [filtros]);

// useEfect
  useEffect(() => {
    buscarBarrios();
  }, [buscarBarrios]); 

// EliminarBarrios
  const eliminarBarrio = async (id: number) => {
    setLoading(true);
    setError(null);

    try {
      await BarrioService.eliminar(id);
      setBarrios((prev) => prev.filter((b) => b.id !== id));
      setTotal((prev) => prev - 1);
    } catch (err) {
      setError("No se pudo eliminar el barrio");
      console.error(err);
    } finally {
      setLoading(false);
    }
};


  return {
    barrios,
    total,
    loading,
    error,
    filtros,
    setFiltros,
    buscarBarrios,
    eliminarBarrio
  };
}
