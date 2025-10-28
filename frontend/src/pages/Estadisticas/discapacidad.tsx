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

interface Discapacidad {
  [key: string]: string | number;
  tipo_discapacidad: string;
  total: number;
}

export default function Discapacidad() {
  const [data, setData] = useState<Discapacidad[]>([]);
  const [totalGeneral, setTotalGeneral] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const resultado = await EstadisticasService.Discapacidad();
        const datos: Discapacidad[] = resultado.data;

        // Calcular total general
        const total = datos.reduce((acc, curr) => acc + curr.total, 0);
        setTotalGeneral(total);

        // Guardar datos para el gráfico
        setData(datos);
      } catch (error) {
        console.error("Error al obtener estadísticas de discapacidad:", error);
      }
    }
    fetchData();
  }, []);

  // Paleta de colores
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
        Personas por Tipo de Discapacidad
      </h3>

      {/* Contenedor del gráfico */}
      <div className="h-64 sm:h-72 md:h-80 min-w-[150px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="total"
              nameKey="tipo_discapacidad"
              cx="50%"
              cy="50%"
              outerRadius="70%"
              label
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
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
