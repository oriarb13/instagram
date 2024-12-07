import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { useLocation } from "react-router-dom";
import NavBar from "./Navbar";

import { styled } from "@mui/material/styles";

const Offset = styled("div")(({ theme }) => ({
    ...theme.mixins.toolbar, // Get height from theme
    width: "100%", // Ensure full width
}));
const PageLayout = ({ children }) => {
    const location = useLocation();
    const noNav = ["/login", "/signup", "/"];

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                height: "100vh",
                border: "1px solid red",
            }}
        >
            {!noNav.includes(location.pathname) && (
                <>
                    <NavBar />
                    <Offset
                        sx={{ border: "1px solid green", width: "100%" }}
                    />{" "}
                </>
            )}

            <Box
                sx={{
                    flexGrow: 1, // Ensure it fills available space
                    display: "flex", // Enable Flexbox for alignment
                    justifyContent: "center", // Center content horizontally
                    alignItems: "center", // Center content vertically
                    width: "100%", // Full width
                    padding: "16px", // Optional: Add spacing around content
                    boxSizing: "border-box", // Prevent padding overflow
                    textAlign: "center", // Optional: Center text inside content
                }}
            >
                {children}
            </Box>
        </Box>
    );
};

export default PageLayout;
