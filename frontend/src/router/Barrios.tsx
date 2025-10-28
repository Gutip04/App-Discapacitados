    import {  Routes, Route } from "react-router-dom";
    import ListarBarrios from "../pages/Barrios/ListarBarrios";
    import CrearBarrio from "../pages/Barrios/CrearBarrio";
    import EditarBarrio from "../pages/Barrios/EditarBarrios";

    export default function BarriosRouter() {
        return(
                <Routes>
                    <Route path="/" element={<ListarBarrios/>}></Route>
                    <Route path="/crear" element={<CrearBarrio/>}></Route>
                    <Route path="/editar/:id" element={<EditarBarrio/>}></Route>
                </Routes>
        )
    }