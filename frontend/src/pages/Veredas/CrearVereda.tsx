import { useState } from "react";
import BotonFormulario from "../../components/ui/BottonFormulario";
import { InputField } from "../../components/ui/InputField";
import { VeredaService } from "../../services/VeredaService";


export default function CrearVereda() {
  const [nombre, setNombre] = useState("");
  const [mensaje, setMensaje] = useState(""); // estado del mensaje
  const [tipoMensaje, setTipoMensaje] = useState<"success" | "error" | "">(""); // tipo de mensaje

  const zonaNombre = "Rural"; // zona predeterminada, solo lectura
  const zonaid = 2; // id de zona predeterminado

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Limpiamos mensaje previo
    setMensaje("");
    setTipoMensaje("");

    VeredaService.crear({ nombre, zona_id: zonaid })
      .then(() => {
        setMensaje("Vereda creada correctamente.");
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
          setMensaje("La Vereda ya existe.");
        } else if(error.response && error.response.status === 400){
        setMensaje("Ingresa una Vereda")
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
  // console.log(`Hola esta es la zona  desde crear ${zonaNombre}`)


  return (
    <div className="p-6 max-w-lg mx-auto">
      <div className="bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-2xl font-extrabold mb-6 text-gray-800">Crear Vereda</h1>

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
            onchange={(e) => setNombre(e.target.value)}
            placeholder="Escribe el nombre de la Vereda"
            />
          </div>

          {/* Zona (solo lectura) */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Zona asignada
            </label>
            <p className="bg-gray-100 border border-gray-300 rounded-lg p-3 w-full">
              {zonaNombre}
            </p>
          </div>

          {/* Botón Crear */}
          <BotonFormulario tipo="submit" color="green" py={2} texto="Crear" fullWidth={true}/>
        </form>
      </div>
    </div>
  );
}
