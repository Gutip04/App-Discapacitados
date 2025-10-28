import { useEffect, useState } from "react";
import { EstadisticasService } from "../../services/EstadisticasService";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface Victima {
  [key: string]: string | number;
  tipo_victima: string;
  total: number;
}

export default function Victimas() {
  const [data, setData] = useState<Victima[]>([]);
  const [totalGeneral, setTotalGeneral] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const res = await EstadisticasService.Victima();
        const datos: Victima[] = res.data;

        // Calcular el total general
        setTotalGeneral(datos.reduce((a, b) => a + b.total, 0));

        // Guardar datos en el estado
        setData(datos);
      } catch (err) {
        console.error("Error al obtener estadísticas de Víctimas:", err);
      }
    })();
  }, []);

  const COLORS = [
    "#6366F1", // Indigo
    "#EC4899", // Pink
    "#10B981", // Emerald
    "#F59E0B", // Amber
    "#3B82F6", // Blue
    "#8B5CF6", // Violet
    "#F43F5E", // Rose
    "#14B8A6", // Teal
    "#84CC16", // Lime
    "#EAB308", // Yellow
    "#0EA5E9", // Sky
    "#D946EF", // Fuchsia
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 w-full max-w-sm sm:max-w-md md:max-w-lg space-y-3">
      {/* Título responsivo */}
      <h3 className="text-sm sm:text-base font-semibold text-gray-700 text-center">
        Personas por Caso de Víctima
      </h3>

      {/* Contenedor del gráfico */}
      <div className="h-64 sm:h-72 md:h-80 min-w-[150px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="total"
              nameKey="tipo_victima"
              cx="50%"
              cy="50%"
              outerRadius="70%"
              label
            >
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend
              wrapperStyle={{
                fontSize: "10px",
                paddingTop: "5px",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Total general */}
      <div className="text-center text-xs sm:text-sm text-gray-600 font-medium">
        Total:{" "}
        <span className="font-bold text-indigo-700">{totalGeneral}</span>
      </div>
    </div>
  );
}
