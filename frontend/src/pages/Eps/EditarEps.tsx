
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BotonFormulario from "../../components/ui/BottonFormulario";
import { InputField } from "../../components/ui/InputField";
import { EpsService } from "../../services/EpsService";
import type { Eps } from "../../types/EpsTypes";


export default function EditarEps() {
  const { id } = useParams();
  const [nombre, setNombre] = useState("");
  const [mensaje, setMensaje] = useState("")
  const [tipoMensaje, setTipoMensaje] = useState<"success" | "error"| "">("")

  useEffect(() => {
    if(!id) return

    EpsService.obtenerUno(Number(id))
    .then((res: {data:Eps}) => {
        setNombre(res.data.nombre);
    })
    .catch((err) => console.error("Error al obtener las Eps", err))
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    EpsService.editar(Number(id), {nombre})
    .then(() => {
      setMensaje("Eps Actualizado Correctamente")
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
        setMensaje("Ya existe una Eps con este nombre")
      }else if(error.response && error.response.status === 400){
        setMensaje("Ingresa una Eps")
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
        <h1 className="text-2xl font-extrabold mb-6 text-gray-800">Editar Eps</h1>

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
          {/* Nombre de la Eps */}
          <div>
            <InputField 
            label="Nombre de la Eps" 
            value={nombre} 
            onchange={(e) => setNombre(e.target.value)}/>
          </div>

          {/* Botón guardar */}
          <BotonFormulario tipo="submit" texto="Guardar" color="blue" fullWidth={true} py={2}/>
        </form>
      </div>
</div>

)}
