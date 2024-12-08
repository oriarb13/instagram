// Components/Logout.js
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "../../utils/userApi";  
import { clearUser } from "../../store/slices/userSlice";  
import Cookies from "js-cookie"; 

const DeleteUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const response = await deleteUser();

      if (response.message === "User and related posts and comments deleted successfully.") {
        Cookies.remove("jwt");

        dispatch(clearUser());

        navigate("/login");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <button onClick={handleDelete} >delete user </button>
  );
};

export default DeleteUser;
