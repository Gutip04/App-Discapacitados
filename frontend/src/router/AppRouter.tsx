import { BrowserRouter, Route, Routes  } from "react-router-dom";
import BarriosRouter from "./Barrios";
import VeredasRouter from "./Vereda";
import EpsRouter from "./Eps";
import PacientesRouter from "./Pacientes";
import Auth from "./Auth";
import { ProtectedRoute } from "../components/ProtectedRoute";
import LayoutPrincipal from "../pages/LayoutPrincipal";
import Index from "./Index";
import DashBoardRouter from "./Dashboard";
import { AdminRoute } from "../pages/Auth/AdminRouter";
import EstadisticasRoutes from "./Estadisticas";




export default function AppRouter(){
    return (
        <BrowserRouter>
            <Routes>
                {/* Rutas publicas */}
                <Route path="/*" element={<Index/>}/>
                <Route element={<LayoutPrincipal/>}>
                {/* Rutas Privadas */}
                    <Route 
                    path="/barrios/*" 
                    element={ 
                    <ProtectedRoute> 
                        <BarriosRouter/> 
                    </ProtectedRoute> } />
                    <Route 
                    path="/estadisticas/*" 
                    element={ 
                    <ProtectedRoute> 
                        <EstadisticasRoutes/> 
                    </ProtectedRoute> } />
                    <Route 
                    path="/dashboard/*" 
                    element={ 
                    <ProtectedRoute> 
                        <DashBoardRouter/> 
                    </ProtectedRoute> } />
                    <Route 
                    path="/veredas/*" 
                    element={
                    <ProtectedRoute> 
                        <VeredasRouter/> 
                    </ProtectedRoute> } />
                    <Route 
                    path="/eps/*" 
                    element={
                    <ProtectedRoute> 
                        <EpsRouter/> 
                    </ProtectedRoute> }/>
                    <Route 
                    path="/pacientes/*" 
                    element={
                    <ProtectedRoute> 
                        <PacientesRouter/> 
                    </ProtectedRoute> } />
                    {/* Rutas de admin  */}
                    <Route 
                    path="/auth/*" 
                    element={
                    <AdminRoute> 
                        <Auth/> 
                    </AdminRoute> } />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}