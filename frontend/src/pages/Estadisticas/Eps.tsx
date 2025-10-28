import { useEffect, useState } from "react";
import { EstadisticasService } from "../../services/EstadisticasService";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";

interface EPS {
  eps: string;
  total: number;
}

export default function Eps() {
  const [data, setData] = useState<EPS[]>([]);
  const [totalGeneral, setTotalGeneral] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const resultado = await EstadisticasService.Eps();
        const datos: EPS[] = resultado.data;

        // Ordenar de mayor a menor
        const ordenados = datos.sort((a, b) => b.total - a.total);

        // Calcular total general
        const total = ordenados.reduce((acc, curr) => acc + curr.total, 0);
        setTotalGeneral(total);

        setData(ordenados);
      } catch (error) {
        console.error("Error al obtener estadísticas de EPS:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 w-full max-w-5xl mx-auto space-y-3">
      <h3 className="text-sm sm:text-base font-semibold text-gray-700 text-center">
        Personas por EPS
      </h3>

      <div className="h-[400px] sm:h-[500px] md:h-[600px] min-w-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{
              top: 10,
              right: 20,
              left: window.innerWidth < 640 ? 60 : 120, // ajusta margen izquierdo según pantalla
              bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              type="number"
              tick={{ fontSize: window.innerWidth < 640 ? 10 : 12 }}
            />
            <YAxis
              dataKey="eps"
              type="category"
              width={window.innerWidth < 640 ? 80 : 120}
              tick={{ fontSize: window.innerWidth < 640 ? 9 : 11 }}
            />
            <Tooltip
              contentStyle={{ fontSize: "11px" }}
              labelStyle={{ fontWeight: "bold" }}
            />
            <Bar dataKey="total" fill="#10B981" radius={[4, 4, 4, 4]}>
              <LabelList
                dataKey="total"
                position="right"
                fontSize={window.innerWidth < 640 ? 9 : 10}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="text-center text-xs sm:text-sm text-gray-600 font-medium">
        Total general:{" "}
        <span className="font-bold text-emerald-700">{totalGeneral}</span>
      </div>
    </div>
  );
}
