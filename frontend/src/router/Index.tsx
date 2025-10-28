import { Route, Routes } from "react-router-dom";
import LandingPage from "../pages/Index/Landinpage";
import Login from "../pages/Auth/Login";

    export default function Index() {
        return(
                <Routes>
                    <Route path="/" element={<LandingPage/>}></Route>
                    <Route path="/login" element={<Login/>}></Route>

                </Routes>
        )
    }