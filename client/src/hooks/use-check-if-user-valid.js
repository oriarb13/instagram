import { useNavigate } from "react-router-dom";
import { isUserValid } from "../utils/userApi";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slices/userSlice";

export async function useCheckIfUserValid() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const dataAuth = await isUserValid();

  if (dataAuth.userLogout) {
    navigate("/");
  } else {
    dispatch(setUser(dataAuth.username));
  }
}
