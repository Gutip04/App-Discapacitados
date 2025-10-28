import { useEffect, useState } from 'react'
import { EstadisticasService } from '../../services/EstadisticasService'
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  LabelList
} from 'recharts'

interface Estado_vida {
  estado_vida: string
  total: number
}

export default function EstadoVida() {
  const [data, setData] = useState<Estado_vida[]>([])

  useEffect(() => {
    async function fetchData() {
      try {
        const resultado = await EstadisticasService.EstadoVida()
        setData(resultado.data)
      } catch (error) {
        console.error('Error al obtener Estadistica de sexo:', error)
      }
    }
    fetchData()
  }, [])

  const totalvivo = data.find(item => item.estado_vida === 'Vivo')?.total ?? 0
  const totalFallecido = data.find(item => item.estado_vida === 'Fallecido')?.total ?? 0
  const total = totalvivo + totalFallecido

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 w-full max-w-xs space-y-3">
      <h3 className="text-sm font-semibold text-gray-700 text-center">
        Estado de vida
      </h3>

      <div className="h-52">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="2 2" vertical={false} />
            <XAxis dataKey="estado_vida" fontSize={10} />
            <YAxis hide />
            <Tooltip />
            <Bar dataKey="total" fill="#6366f1" radius={[4, 4, 0, 0]}>
              <LabelList dataKey="total" position="top" fontSize={10} dy={6} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-1 text-[11px] text-center text-gray-600">
        <div className="bg-indigo-100 rounded p-1">
          <p className="font-medium">Vivos</p>
          <p className="font-bold text-indigo-700">{totalvivo}</p>
        </div>
        <div className="bg-pink-100 rounded p-1">
          <p className="font-medium">Fallecido</p>
          <p className="font-bold text-pink-700">{totalFallecido}</p>
        </div>
        <div className="bg-gray-100 rounded p-1">
          <p className="font-medium">Total</p>
          <p className="font-bold text-gray-700">{total}</p>
        </div>
      </div>
    </div>
  )
}
