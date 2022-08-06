import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage";
import Login from "./pages/login";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />}></Route>
                <Route path="/homepage" element={<Homepage />}></Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
