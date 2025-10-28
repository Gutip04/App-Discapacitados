import { Route, Routes } from "react-router-dom";
import ListarPacientes from "../pages/Pacientes/ListarPaciente";
import UnicoPaciente from "../pages/Pacientes/UnicoPaciente";
import CrearPaciente from "../pages/Pacientes/CrearPaciente";
import EditarPaciente from "../pages/Pacientes/EditarPaciente";

export default function PacientesRouter() {
    return(
            <Routes>
                <Route path="/" element={<ListarPacientes/>}></Route>
                <Route path="/:identificacion" element={<UnicoPaciente/>}></Route>
                <Route path="/crear" element={<CrearPaciente/>}></Route> 
                <Route path="/editar/:identificacion" element={<EditarPaciente/>}></Route>
            </Routes>
    )
}