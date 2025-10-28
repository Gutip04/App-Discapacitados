import { useState, useEffect } from "react";

export interface Discapacidad {
  id: number;
  nombre: string;
}


export function useTabla<T>(fetchFunction: () => Promise<{ data: T[] }>) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let mounted = true; // evitar actualización si el componente se desmonta
    setLoading(true);

    fetchFunction()
      .then((res) => {
        if (mounted) {
          setData(res.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error(err);
        if (mounted) {
          setError("Error al cargar los datos");
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, [fetchFunction]);

  return { data, loading, error };
}
