import { Route, Routes, useLocation } from "react-router-dom";

//import Pages
import AuthPage from "./pages/AuthPage/AuthPage.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
import DiscoverPage from "./pages/DiscoverPage/DiscoverPage.jsx";
import SearchPage from "./pages/SearchPage/SearchPage.jsx";
import CreatePostPage from "./pages/CreatePostPage/CreatePostPage.jsx";

//import Components
import NavBar from "./components/PageLayout/Navbar";

function App() {
    const location = useLocation();
    console.log("Current location:", location);
    const noNav = ["/auth"];
    return (
        <>
            {!noNav.includes(location.pathname) && <NavBar />}
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/auth" element={<AuthPage />} />
                {/* discover */}
                <Route path="/discover" element={<DiscoverPage />} />
                {/* search*/}
                <Route path="/search" element={<SearchPage />} />
                {/* createpost */}
                <Route path="/create-post" element={<CreatePostPage />} />
            </Routes>
        </>
    );
}

export default App;
