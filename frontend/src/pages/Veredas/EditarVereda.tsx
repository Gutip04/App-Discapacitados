import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BotonFormulario from "../../components/ui/BottonFormulario";
import { InputField } from "../../components/ui/InputField";
import { VeredaService } from "../../services/VeredaService";
import type { Vereda } from "../../types/VeredasTypes";


export default function EditarVereda() {
  const { id } = useParams();
  const [nombre, setNombre] = useState("");
  const [zonaNombre, setZonaNombre] = useState("")
  const [mensaje, setMensaje] = useState("")
  const [tipoMensaje, setTipoMensaje] = useState<"success" | "error"| "">("")

  useEffect(() => {
    if(!id) return

    VeredaService.obtenerUno(Number(id))
    .then((res: {data:Vereda}) => {
        setNombre(res.data.nombre);
        setZonaNombre(res.data.zona_nombre)   
    })
    .catch((err) => console.error("Error al obtener las Veredas", err))
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    VeredaService.editar(Number(id), { nombre, zona_id: 2})
    .then(() => {
      setMensaje("Vereda Actualizado Correctamente")
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
        setMensaje("Ya existe una Vereda con este nombre")
      }else if(error.response && error.response.status === 400){
        setMensaje("Ingresa una Vereda")
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
        <h1 className="text-2xl font-extrabold mb-6 text-gray-800">Editar Vereda</h1>

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
          {/* Nombre de la Vereda */}
          <div>
            <InputField 
            label="Nombre de la Vereda" 
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
