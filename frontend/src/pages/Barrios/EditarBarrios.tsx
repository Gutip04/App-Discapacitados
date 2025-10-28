import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BarrioService } from "../../services/BarrioService";
import type { Barrio } from "../../types/BarriosTypes";
import BotonFormulario from "../../components/ui/BottonFormulario";
import { InputField } from "../../components/ui/InputField";


export default function EditarBarrio() {
  const { id } = useParams();
  const [nombre, setNombre] = useState("");
  const [zonaNombre, setZonaNombre] = useState("")
  const [mensaje, setMensaje] = useState("")
  const [tipoMensaje, setTipoMensaje] = useState<"success" | "error"| "">("")

  useEffect(() => {
    if(!id) return

    BarrioService.obtenerUno(Number(id))
    .then((res: {data:Barrio}) => {
        setNombre(res.data.nombre);
        setZonaNombre(res.data.zona_nombre)   
    })
    .catch((err) => console.error("Error al obtener los barrios", err))
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    BarrioService.editar(Number(id), { nombre, zona_id: 1})
    .then(() => {
      setMensaje("Barrio Actualizado Correctamente")
      setTipoMensaje("success")

      // Mensaje se borra automáticamente después de 5 segundos
      setTimeout(() => {
        setMensaje("")
        setTipoMensaje("")
      }, 5000);
    })
    .catch((error) => {
      console.error("error al editar", error)
      if(error.response && error.response.status === 409){
        setMensaje("Ya existe un barrio con este nombre")
      }else if(error.response && error.response.status === 400){
        setMensaje("Ingresa un Barrio")
      }else{
        setMensaje("Ocurrio un error, Intenta nuevamente")
      }
      setTipoMensaje("error")
    
      // Mensaje se borra automáticamente después de 5 segundos
        setTimeout(() => {
          setMensaje("");
          setTipoMensaje("");
        }, 5000);
    
    })
    
  };


  return (
    <div className="p-6 max-w-lg mx-auto">
      <div className="bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-2xl font-extrabold mb-6 text-gray-800">Editar Barrio</h1>

        {/* Mensaje */}
        {mensaje && (
          <div
            className={`mb-4 p-3 rounded-lg text-white ${
              tipoMensaje === "success" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {mensaje}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Nombre del barrio */}
          <div>
            <InputField 
            label="Nombre del barrio" 
            value={nombre} 
            onchange={(e) => setNombre(e.target.value)}/>
          </div>

          {/* Zona asignada (solo lectura) */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Zona asignada
            </label>
            <p className="bg-gray-100 border border-gray-300 rounded-lg p-3 w-full">{zonaNombre}</p>
          </div>

          {/* Botón guardar */}
          <BotonFormulario tipo="submit" texto="Guardar" color="blue" fullWidth={true} py={2}/>
        </form>
      </div>
</div>

)}
