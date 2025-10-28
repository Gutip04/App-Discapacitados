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

interface Sexo {
  sexo: string
  total: number
}

export default function Sexo() {
  const [data, setData] = useState<Sexo[]>([])
  

  useEffect(() => {
    async function fetchData() {
      try {
        const resultado = await EstadisticasService.Sexo()
        setData(resultado.data)
      } catch (error) {
        console.error('Error al obtener Estadistica de sexo:', error)
      }
    }
    fetchData()
  }, [])

  const totalHombres = data.find(item => item.sexo === 'Masculino')?.total ?? 0
  const totalMujeres = data.find(item => item.sexo === 'Femenino')?.total ?? 0
  const totalPersonas = totalHombres + totalMujeres

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 w-full max-w-xs space-y-3">
      <h3 className="text-sm font-semibold text-gray-700 text-center">
        Sexo
      </h3>

      <div className="h-52">
        <ResponsiveContainer width="100%" height="100%" >
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="2 2" vertical={false} />
            <XAxis dataKey="sexo" fontSize={10} />
            <YAxis hide />
            <Tooltip />
            <Bar dataKey="total" fill="#6366f1" radius={[4, 4, 0, 0]}>
              <LabelList dataKey="total" position="top" fontSize={10} dy={4} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-1 text-[11px] text-center text-gray-600">
        <div className="bg-indigo-100 rounded p-1">
          <p className="font-medium">Hombres</p>
          <p className="font-bold text-indigo-700">{totalHombres}</p>
        </div>
        <div className="bg-pink-100 rounded p-1">
          <p className="font-medium">Mujeres</p>
          <p className="font-bold text-pink-700">{totalMujeres}</p>
        </div>
        <div className="bg-gray-100 rounded p-1">
          <p className="font-medium">Total</p>
          <p className="font-bold text-gray-700">{totalPersonas}</p>
        </div>
      </div>
    </div>
  )
}
