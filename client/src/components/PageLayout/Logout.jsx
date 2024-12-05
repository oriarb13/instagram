// Components/Logout.js
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../utils/userApi";  
import { clearUser } from "../../store/slices/userSlice";  
import Cookies from "js-cookie"; 

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await logOut();

      if (response.message === "Successfully logged out.") {
        Cookies.remove("jwt");

        dispatch(clearUser());

        navigate("/login");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;
