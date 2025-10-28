import CicloDeVida from "./CicloDeVida";
import Discapacidad from "./discapacidad";
import Eps from "./Eps";
import EstadoVida from "./EstadoVida";
import GradoEstudio from "./GradoEstudio";
import GrupoEtnico from "./GrupoEtnico";
import Sexo from "./Sexo";
import Victimas from "./victima";
import Zona from "./Zona";

export default function Estadisticas() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-center text-3xl font-bold uppercase text-gray-800 mb-10">
        Estadísticas
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/*  Panel principal con varias estadísticas */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-4">
            <Sexo />
          </div>
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-4">
            <Zona />
          </div>
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-4">
            <EstadoVida />
          </div>
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-4 ">
            <Discapacidad />
          </div>
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-4 flex items-center justify-center">
            <Victimas />
          </div>
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-4">
            <GradoEstudio />
          </div>
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-4">
            <GrupoEtnico />
          </div>
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-4">
            <CicloDeVida />
          </div>
        </div>

        {/*  Panel lateral con una estadística destacada */}
        <div className="lg:w-[420px] flex-shrink-0">
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-4 h-full">
            <Eps />
          </div>
        </div>
      </div>
    </div>
  );
}
