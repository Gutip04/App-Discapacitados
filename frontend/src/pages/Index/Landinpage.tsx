import Footer from "../../components/Footer";
import HeaderLandingPage from "./HeaderLandinPage";

export default function LandingPage() {
  return (
    <div className="bg-gray-50 text-gray-800 font-[Poppins]">
      {/* Navbar */}
      <HeaderLandingPage/>
      {/* Inicio */}
      <section
        id="inicio"
        className="pt-32 pb-20 bg-gradient-to-r from-slate-700 to-slate-900 text-white text-center"
      >
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-5xl font-bold mb-4">
            Gestiona la <span className="text-yellow-300/90">salud de tus pacientes</span> fácilmente
          </h2>
          <p className="text-lg mb-8 text-slate-300">
            Una plataforma completa para registrar, monitorear y organizar la información de tus pacientes de forma segura y eficiente.
          </p>
          <a
            href="#beneficios"
            className="bg-yellow-300 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-200 transition"
          >
            Descubre más
          </a>
        </div>
      </section>

      {/* Beneficios / Funcionalidades */}
      <section id="beneficios" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-10 text-gray-800">
            Funcionalidades de la App
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-50 rounded-2xl shadow hover:shadow-lg transition">
              <div className="text-teal-600 text-4xl mb-4">📋</div>
              <h4 className="text-xl font-semibold mb-2">Registro de Pacientes</h4>
              <p>Agrega y administra los datos de tus pacientes de manera rápida y segura.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-2xl shadow hover:shadow-lg transition">
              <div className="text-teal-600 text-4xl mb-4">🩺</div>
              <h4 className="text-xl font-semibold mb-2">Seguimiento Médico</h4>
              <p>Lleva control de citas, tratamientos y evolución de cada paciente.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-2xl shadow hover:shadow-lg transition">
              <div className="text-teal-600 text-4xl mb-4">🔒</div>
              <h4 className="text-xl font-semibold mb-2">Seguridad de Datos</h4>
              <p>Protege la información sensible con almacenamiento seguro y encriptado.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sobre la App */}
      <section id="sobre" className="py-20 bg-gray-100">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h3 className="text-3xl font-bold mb-4 text-gray-800">Sobre la App</h3>
            <p className="text-gray-600 mb-6">
              Nuestra App de Pacientes está diseñada para profesionales de la salud que buscan simplificar la gestión de su práctica médica. Desde el registro de pacientes hasta el seguimiento de tratamientos, todo está en un solo lugar.
            </p>
            <a
              href="#contacto"
              className="bg-slate-900 text-white px-6 py-3 rounded-lg hover:bg-slate-700 transition"
            >
              Contáctanos
            </a>
          </div>
          <img
            src="https://img.freepik.com/fotos-premium/medicos-pacientes-laboratorio-4k-papel-tapiz-hd-papel-tapiz_1262886-4473.jpg"
            alt="Gestión de pacientes"
            className="rounded-2xl shadow-lg w-[300px] h-[400px} items-center mx-auto"
          />
        </div>
      </section>

      {/* Contacto */}
      <section
        id="contacto"
        className="py-20 bg-gradient-to-r from-slate-700 to-slate-900 text-white text-center"
      >
        <div className="max-w-3xl mx-auto px-6">
          <h3 className="text-3xl font-bold mb-4">
            ¿Tienes preguntas sobre la App?
          </h3>
          <p className="mb-8 text-slate-300">
            Contáctanos para conocer más sobre nuestras funcionalidades y cómo puede ayudarte en la gestión de tus pacientes.
          </p>
        </div>
      </section>

      <Footer/>
    </div>
  );
}
