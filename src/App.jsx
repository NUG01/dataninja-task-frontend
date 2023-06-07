import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import BasicAxios from "./axios";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "./store/auth";
import { useLocation } from "react-router";
import Cookies from "js-cookie";

import HomePage from "./pages/HomePage";
import NinjaPage from "./pages/NinjaPage";

function App() {
  let user = useSelector((state) => state.auth.user);
  console.log(user);
  const [rendered, setRendered] = useState(false);
  const [userData, setUserData] = useState(null);
  const location = useLocation();
  const dispatch = useDispatch();
  console.log(user);
  console.log(userData);

  useEffect(() => {
    if (user) {
      setRendered(true);
    }
    if (!user) {
      BasicAxios.get("user?access_token=" + Cookies.get("access_token"))
        .then((res) => {
          dispatch(authActions.setUser(res.data));
          dispatch(authActions.setIsLoggedIn(true));
          console.log(res.data);

          setUserData(res.data);
        })
        .catch(() => {
          dispatch(authActions.setUser(null));
          dispatch(authActions.setIsLoggedIn(false));
          setUserData(null);
        })
        .finally(() => {
          setRendered(true);
        });
    }
  }, [location]);

  if (!rendered) return;

  return (
    <Routes>
      <Route
        path="/"
        element={
          <HomePage
            isLoggedIn={user}
            setUser={(value) => {
              user = value;
              dispatch(authActions.setUser(value));
            }}
          />
        }
      ></Route>
      <Route
        path="/ninja"
        element={
          <NinjaPage
            isLoggedIn={user}
            setUser={() => {
              user = null;
              dispatch(authActions.setUser(null));
            }}
          />
        }
      ></Route>
    </Routes>
  );
}
export default App;
