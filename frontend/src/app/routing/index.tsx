import { 
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import { Home } from "../../pages/Home";
import { Attendance } from "../../pages/Attendance";
import { Sidebar } from "../components/Sidebar";

export function AppRoutes() {
    return (
        <BrowserRouter>
            <Sidebar>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path ="/attendance/:id" element={<Attendance />} />
                </Routes>
            </Sidebar>
        </BrowserRouter>
    );
}