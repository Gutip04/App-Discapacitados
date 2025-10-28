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

interface CicloVida {
    [key: string]: string | number; 
    ciclo_vida: string;
    total: number;
}

export default function CicloDeVida() {
  const [data, setData] = useState<CicloVida[]>([]);
  const [totalGeneral, setTotalGeneral] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const resultado = await EstadisticasService.CicloVida();
        const datos: CicloVida[] = resultado.data;
        setTotalGeneral(datos.reduce((acc, curr) => acc + curr.total, 0));
        setData(datos);
      } catch (error) {
        console.error("Error al obtener estadísticas de Ciclo de Vida:", error);
      }
    }
    fetchData();
  }, []);

  const COLORS = [
    "#6366F1", "#EC4899", "#10B981", "#F59E0B",
    "#3B82F6", "#8B5CF6", "#F43F5E", "#14B8A6",
    "#84CC16", "#EAB308", "#0EA5E9", "#D946EF",
  ];

  return (
    <div className="bg-white rounded-lg shadow p-4 w-full sm:max-w-xs md:max-w-sm lg:max-w-md mx-auto space-y-3">
      <h3 className="text-sm sm:text-base font-semibold text-gray-700 text-center">
        Personas por Ciclo de Vida
      </h3>

      {/* Contenedor flexible del gráfico */}
      <div className="w-full h-56 sm:h-64 md:h-72 lg:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="total"
              nameKey="ciclo_vida"
              cx="50%"
              cy="50%"
              outerRadius="70%"
              label
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              wrapperStyle={{ fontSize: "10px" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="text-center text-xs sm:text-sm text-gray-600 font-medium">
        Total: <span className="font-bold text-indigo-700">{totalGeneral}</span>
      </div>
    </div>
  );
}
