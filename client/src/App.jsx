import "./App.css";
import {BrowserRouter, Route, Routes } from "react-router-dom";

//import Pages
import AuthPage from "./pages/AuthPage/AuthPage.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
import Login from "./components/AuthForm/LogIn.jsx";
import SignUp from "./components/AuthForm/SignUp.jsx";
import Dummy from "./pages/dummy.jsx";


function App() {
    return (
        <>
        <BrowserRouter>
            <Routes>
                <Route path="/signup" element={<SignUp />} />
                <Route path="/" element={<HomePage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dummy" element={<Dummy />} />
                {/* הוספה של כל הדפים  */}
            </Routes>
        </BrowserRouter>
        </>
    );
}

export default App;
