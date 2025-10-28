import {  Routes, Route } from "react-router-dom";
import ListarEps from "../pages/Eps/ListarEps";
import CrearEps from "../pages/Eps/CrearEps";
import EditarEps from "../pages/Eps/EditarEps";
    
export default function EpsRouter() {
    return(
            <Routes>
                <Route path="/" element={<ListarEps/>}></Route>
                <Route path="/crear" element={<CrearEps/>}></Route>
                <Route path="/editar/:id" element={<EditarEps/>}></Route>
            </Routes>
    )
}