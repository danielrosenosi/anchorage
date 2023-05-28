import { 
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import { Home } from "../../pages/Home";
import { Attendance } from "../../pages/Attendance";

export function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path ="/attendance/:id" element={<Attendance />} />
            </Routes>
        </BrowserRouter>
    );
}