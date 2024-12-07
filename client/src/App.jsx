import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

//import Pages
import HomePage from "./pages/HomePage/HomePage.jsx";
import DiscoverPage from "./pages/DiscoverPage/DiscoverPage.jsx";
import SearchPage from "./pages/SearchPage/SearchPage.jsx";
import CreatePostPage from "./pages/CreatePostPage/CreatePostPage.jsx";
import Login from "./components/AuthForm/LogIn.jsx";
import SignUp from "./components/AuthForm/SignUp.jsx";
<<<<<<< HEAD
import ProfilePage from "./components/Profilepage/Profilepage.jsx";
=======
import PageLayout from "./components/PageLayout/PageLayout.jsx";
>>>>>>> 4bb07bd8754834de7c119aa2ddfcca3e532b66da

//import Components
import NotFound from "./pages/notfound/NotFound.jsx";
function App() {
    return (
        <>
<<<<<<< HEAD
            {!noNav.includes(location.pathname) && <NavBar />}
            <Routes>
                <Route path="/signup" element={<SignUp />} />
                <Route path="/" element={<SignUp/>} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/discover" element={<DiscoverPage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/create-post" element={<CreatePostPage />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/profile" element={<ProfilePage />} />


            </Routes>
=======
            <PageLayout>
                <Routes>
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/" element={<SignUp />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/discover" element={<DiscoverPage />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/create-post" element={<CreatePostPage />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </PageLayout>
>>>>>>> 4bb07bd8754834de7c119aa2ddfcca3e532b66da
        </>
    );
}

function Root() {
    return (
        <BrowserRouter>
            <App />
        </BrowserRouter>
    );
}

export default Root;
