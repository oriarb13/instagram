import "./App.css";
import { Route, Routes } from "react-router-dom";

//import Pages
import AuthPage from "./pages/AuthPage/AuthPage.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/auth" element={<AuthPage />} />
            </Routes>
        </>
    );
}

export default App;
