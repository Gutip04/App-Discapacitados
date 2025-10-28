import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/DashBoard/ListarDashboard";

    export default function DashBoardRouter() {
        return(
                <Routes>
                    <Route path="/" element={<Dashboard/>}></Route>
                    
                </Routes>
        )
    }