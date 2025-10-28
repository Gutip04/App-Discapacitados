import { Route, Routes } from "react-router-dom";
import   Estadisticas from "../pages/Estadisticas/ListarEstadisticas";

export default function EstadisticasRoutes(){
    return(
        <Routes>
            <Route path="/" element={<Estadisticas/>}></Route>
        </Routes>
    )
}