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

interface VictimaSiNO {
  victima: string
  total: number
}

export default function VictimaSiNO() {
  const [data, setData] = useState<VictimaSiNO[]>([])
  

  useEffect(() => {
    async function fetchData() {
      try {
        const resultado = await EstadisticasService.VictimaSiNo()
        setData(resultado.data)
      } catch (error) {
        console.error('Error al obtener Estadistica de Victima SI o No:', error)
      }
    }
    fetchData()
  }, [])

  const totalVictimasSi = data.find(item => item.victima === 'Sí es víctima')?.total ?? 0
  const totalVictimasNo = data.find(item => item.victima === 'No es víctima')?.total ?? 0
  const totalVictima = totalVictimasSi + totalVictimasNo

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 w-full max-w-xs space-y-3">
      <h3 className="text-sm font-semibold text-gray-700 text-center">
        Victimas
      </h3>

      <div className="h-52">
        <ResponsiveContainer width="100%" height="100%" >
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="2 2" vertical={false} />
            <XAxis dataKey="victima" fontSize={10} />
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
          <p className="font-medium">Si</p>
          <p className="font-bold text-indigo-700">{totalVictimasSi}</p>
        </div>
        <div className="bg-pink-100 rounded p-1">
          <p className="font-medium">No</p>
          <p className="font-bold text-pink-700">{totalVictimasNo}</p>
        </div>
        <div className="bg-gray-100 rounded p-1">
          <p className="font-medium">Total</p>
          <p className="font-bold text-gray-700">{totalVictima}</p>
        </div>
      </div>
    </div>
  )
}
