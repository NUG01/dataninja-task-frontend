import { useNavigate } from "react-router";
import BasicAxios from "../axios";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";

function NinjaPage({ isLoggedIn, setUser }) {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    if (!isLoggedIn) navigate("/");
  }, []);
  async function logoutHandler() {
    try {
      await BasicAxios.post("logout", { token: Cookies.get("access_token") });
      dispatch(authActions.setUser(null));
      dispatch(authActions.setIsLoggedIn(false));
      setUser(null);
      navigate("/");
      Cookies.remove("access_token");
    } catch (err) {
      alert(err.message);
    }

    navigate("/");
  }
  return (
    <div className="flex flex-col items-center justify-center">
      <img
        onClick={logoutHandler}
        className="mx-auto h-[100px] w-auto rounded-[100px] mt-[200px] cursor-pointer"
        src="./public/logo.jpg"
        alt="Your Company"
      />
      <h1>Click to logout</h1>
    </div>
  );
}

export default NinjaPage;
