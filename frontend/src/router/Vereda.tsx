import {  Routes, Route } from "react-router-dom";
import ListarVereda from "../pages/Veredas/ListarVereda";
import CrearVereda from "../pages/Veredas/CrearVereda";
import EditarVereda from "../pages/Veredas/EditarVereda";

export default function VeredasRouter() {
    return(
            <Routes>
                <Route path="/" element={<ListarVereda/>}></Route>
                <Route path="/crear" element={<CrearVereda/>}></Route>
                <Route path="editar/:id" element={<EditarVereda/>}></Route>
            </Routes>
    )
}