import { useState } from "react";
import BotonFormulario from "../../components/ui/BottonFormulario";
import { InputField } from "../../components/ui/InputField";
import { EpsService } from "../../services/EpsService";


export default function CrearEps() {
  const [nombre, setNombre] = useState("");
  const [mensaje, setMensaje] = useState(""); // estado del mensaje
  const [tipoMensaje, setTipoMensaje] = useState<"success" | "error" | "">(""); // tipo de mensaje


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Limpiamos mensaje previo
    setMensaje("");
    setTipoMensaje("");

    EpsService.crear({ nombre })
      .then(() => {
        setMensaje("Eps creada correctamente.");
        setTipoMensaje("success");
        setNombre(""); // limpia el input

        // Mensaje se borra automáticamente después de 5 segundos
        setTimeout(() => {
          setMensaje("");
          setTipoMensaje("");
        }, 5000);
      })
      .catch((error) => {
        console.error("error al Crear", error)
        if (error.response && error.response.status === 409) {
          setMensaje("La Eps ya existe.");
        } else if(error.response && error.response.status === 400){
        setMensaje("Ingresa una Eps")
        } else {
          setMensaje("Ocurrió un error. Intenta nuevamente.");
        }
        setTipoMensaje("error");

        // Mensaje se borra automáticamente después de 5 segundos
        setTimeout(() => {
          setMensaje("");
          setTipoMensaje("");
        }, 5000);
      });
  };
  


  return (
    <div className="p-6 max-w-lg mx-auto">
      <div className="bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-2xl font-extrabold mb-6 text-gray-800">Crear Eps</h1>

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
            onchange={(e) => setNombre(e.target.value)}
            placeholder="Escribe el nombre de la Eps"
            />
          </div>


          {/* Botón Crear */}
          <BotonFormulario tipo="submit" color="green" py={2} texto="Crear" fullWidth={true}/>
        </form>
      </div>
    </div>
  );
}
