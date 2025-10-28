import { Link } from "react-router-dom";

interface BotonFormularioProps{
    tipo?: "submit" | "button"
    texto?: string
    color?: "green" | "blue" | "red" | "gray";
    fullWidth?: boolean
    onClick?: () => void;
    disabled?: boolean
    to?: string
    py?: number; 
    px?: number;
}

export default function BotonFormulario({
    tipo = "submit",
    texto = "Enviar",
    color = "green",
    fullWidth = false,
    onClick,
    disabled = false,
    to,
    px,
    py
}: BotonFormularioProps){
    const colores = {
        green: "bg-green-500 hover:bg-green-600",
        blue: "bg-blue-500 hover:bg-blue-600",
        red: "bg-red-500 hover:bg-red-600",
        gray: "bg-gray-500 hover:bg-gray-600",
    }
    
    const pyClase = py ? `py-${py}` : "";
    const pxClase = px ? `px-${px}` : "";


    const clases = `${fullWidth ? "w-full" : ""} ${colores[color]} text-white font-semibold 
    ${pyClase} ${pxClase} rounded-lg shadow-md transition-all duration-300 disabled:opacity-50`;
    
    if (to) {
    return (
      <Link to={to} className={`flex items-center justify-center gap-2 ${clases}`}>
            {texto === "Agregar"
            ? (
            <>
                <span className="text-xl font-bold">+</span> {texto}
            </>
            )
            : (
            <span>{texto}</span>
            )
            }

      </Link>
    );
  }

    return(
        <button
        type={tipo}
        onClick={onClick}
        disabled={disabled}
        className={clases}>
        {texto}
        </button>
    )
}