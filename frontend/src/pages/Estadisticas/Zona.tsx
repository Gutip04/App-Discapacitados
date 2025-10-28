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

interface Zona {
  zona: string
  total: number
}

export default function Zona() {
  const [data, setData] = useState<Zona[]>([])

  useEffect(() => {
    async function fetchData() {
      try {
        const resultado = await EstadisticasService.Zona()
        setData(resultado.data)
      } catch (error) {
        console.error('Error al obtener Estadistica de sexo:', error)
      }
    }
    fetchData()
  }, [])

  const totalUrbano = data.find(item => item.zona === 'Urbana')?.total ?? 0
  const totalRural = data.find(item => item.zona === 'Rural')?.total ?? 0
  const totalZona = totalUrbano + totalRural

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 w-full max-w-xs space-y-3">
      <h3 className="text-sm font-semibold text-gray-700 text-center">
        Zona
      </h3>

      <div className="h-52">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="2 2" vertical={false} />
            <XAxis dataKey="zona" fontSize={10} />
            <YAxis hide />
            <Tooltip />
            <Bar dataKey="total" fill="#6366f1" radius={[4, 4, 0, 0]}>
              <LabelList dataKey="total" position="top" fontSize={10} dy={4}/>
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-1 text-[11px] text-center text-gray-600">
        <div className="bg-indigo-100 rounded p-1">
          <p className="font-medium">Urbano</p>
          <p className="font-bold text-indigo-700">{totalUrbano}</p>
        </div>
        <div className="bg-pink-100 rounded p-1">
          <p className="font-medium">Rural</p>
          <p className="font-bold text-pink-700">{totalRural}</p>
        </div>
        <div className="bg-gray-100 rounded p-1">
          <p className="font-medium">Total</p>
          <p className="font-bold text-gray-700">{totalZona}</p>
        </div>
      </div>
    </div>
  )
}
