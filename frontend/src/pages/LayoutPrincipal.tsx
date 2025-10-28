import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

// Esta vista sirve para envolver las rutas que necesitan el layout principal como el header y el footer
export default function LayoutPrincipal() {
  const location = useLocation();

  const rutasExcluidas = [
    "/login",
    "/"
  ]


  // Si la ruta actual incluye "auth", no mostramos header ni footer
  const ocultarLayout = rutasExcluidas.some((ruta) =>{location.pathname.startsWith(ruta )} );

  return (
    <div className="min-h-screen flex flex-col">
      {!ocultarLayout && <Header />}

      <main className="flex-1 p-6 bg-gray-50">
        <Outlet /> {/* Aquí se renderizan las rutas hijas */}
      </main>

      {!ocultarLayout && <Footer />}
    </div>
  );
}
