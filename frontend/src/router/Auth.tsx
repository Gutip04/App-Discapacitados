import { Route, Routes } from "react-router-dom";
import RegisterPage from "../pages/Auth/Register";
import ListarUsuarios from "../pages/Auth/ListarUsuarios";
import EditarUsuario from "../pages/Auth/EditarUsuarios";
// import EditarPassword from "../pages/Auth/EditarPassword";

export default function Auth(){
    return (
        <Routes>
            <Route path="/register" element={<RegisterPage/>}></Route>
            <Route path="/listarusuarios" element={<ListarUsuarios/>}></Route>
            <Route path="/editarusuario/:id" element={<EditarUsuario/>}></Route>
            {/* <Route path="/editarpassword/:id" element={<EditarPassword/>}></Route> */}

        </Routes>  
    )   
}