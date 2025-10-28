import { useAuth } from "../../hooks/UseAuth";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { usuario } = useAuth();

  const horaActual = new Date().getHours();
  const saludo =
    horaActual < 12
      ? "¡Buenos días!"
      : horaActual < 18
      ? "¡Buenas tardes!"
      : "¡Buenas noches!";

  const cards = [
    {
      to: "/pacientes",
      title: "Pacientes",
      desc: "Consulta, edita o agrega nuevos pacientes.",
      color: "from-blue-500 to-blue-600",
      icon: "👥",
      badge: "Gestión"
    },
    {
      to: "/barrios",
      title: "Barrios",
      desc: "Administra la información de los barrios registrados.",
      color: "from-purple-500 to-purple-600",
      icon: "🏘️",
      badge: "Ubicación"
    },
    {
      to: "/eps",
      title: "EPS",
      desc: "Visualiza o actualiza las entidades prestadoras de salud.",
      color: "from-green-500 to-green-600",
      icon: "🏥",
      badge: "Salud"
    },
    {
      to: "/veredas",
      title: "Veredas",
      desc: "Gestiona la información de las veredas registradas.",
      color: "from-amber-500 to-amber-600",
      icon: "🌾",
      badge: "Rural"
    },
    {
      to: "/",
      title: "Inicio",
      desc: "Información general y presentación de la aplicación.",
      color: "from-pink-500 to-pink-600",
      icon: "🏠",
      badge: "Principal"
    },
    {
      to: "/estadisticas",
      title: "Estadísticas",
      desc: "Visualiza datos y métricas importantes del sistema.",
      color: "from-cyan-500 to-cyan-600",
      icon: "📊",
      badge: "Análisis"
    },
    ...(usuario?.rol !== "usuario"
      ? [
          {
            to: "/auth/listarusuarios",
            title: "Usuarios",
            desc: "Consulta, edita o agrega nuevos usuarios.",
            color: "from-red-500 to-red-600",
            icon: "👤",
            badge: "Admin"
          },
        ]
      : []),
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Encabezado  */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/60 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                {saludo}
              </h1>
              <p className="mt-3 text-lg text-gray-600 max-w-2xl">
                Bienvenido de vuelta, <span className="font-semibold text-gray-800">
                  {usuario?.rol === "admin" ? "Administrador" : usuario?.rol === "superAdmin" ? "Super Administrador" : "Usuario"}
                </span>. ¿En qué te podemos ayudar hoy?
              </p>
            </div>
            <div className="hidden md:flex items-center space-x-3 bg-white/60 rounded-2xl px-4 py-3 shadow-sm border border-gray-200/40">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-700">Sistema activo</span>
            </div>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Sección de tarjetas */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Accesos rápidos</h2>
            <span className="text-sm text-gray-500 bg-white/50 px-3 py-1 rounded-full">
              {cards.length} módulos disponibles
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {cards.map((item ) => (
              <Link
                key={item.to}
                to={item.to}
                className="group relative bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 transform hover:-translate-y-2"
              >
                {/* Efecto de gradiente sutil */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                
                {/* Badge */}
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {item.badge}
                  </span>
                </div>

                <div className="p-6">
                  {/* Icono con fondo */}
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} mb-4 transform group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-2xl text-white">{item.icon}</span>
                  </div>

                  {/* Contenido */}
                  <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-gray-900 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {item.desc}
                  </p>

                  {/* Indicador de acción */}
                  <div className="flex items-center text-sm font-medium text-gray-500 group-hover:text-gray-700 transition-colors">
                    <span>Acceder</span>
                    <svg 
                      className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>

                {/* Efecto de borde inferior */}
                <div className={`h-1 bg-gradient-to-r ${item.color} transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>
              </Link>
            ))}
          </div>
        </div>

        {/* Información adicional */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/60">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">¿Necesitas ayuda?</h3>
              <p className="text-gray-600 mt-1">
                Revisa nuestra documentación o contacta al soporte técnico
              </p>
            </div>
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors font-medium">
              Soporte
            </button>
          </div>
        </div>
      </main>


    </div>
  );
}