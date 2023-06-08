import { useNavigate } from "react-router";
import BasicAxios from "../axios";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import RegisterForm from "../components/Forms/RegisterForm";
export default function Example({ isLoggedIn, setUser }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    if (isLoggedIn) navigate("/ninja");
  }, []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submitHandler(ev) {
    ev.preventDefault();
    try {
      if (!email || !password) return;
      const res = await BasicAxios.post("login", {
        email,
        password,
      });

      await BasicAxios.get("user?access_token=" + res.data.token).then(
        (res) => {
          dispatch(authActions.setUser(res.data));
          dispatch(authActions.setIsLoggedIn(true));
          setUser(res.data);
        }
      );

      Cookies.set("access_token", res.data.token, { expires: 30 });

      navigate("/ninja");
    } catch (error) {
      alert("Error");
    }
  }

  return (
    <div className="flex items-center justify-center">
      <button
        onClick={() =>
          !showRegister ? setShowRegister(true) : setShowRegister(false)
        }
        type="button"
        className="p-[10px] bg-blue-300 absolute top-[10px] right-[10px] rounded-[5px]"
      >
        {!showRegister ? "Register" : "Login"}
      </button>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-[100px] w-auto rounded-[100px]"
            src="./public/logo.jpg"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            {!showRegister ? "Register new account" : "Sign in to your account"}
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {showRegister && (
            <RegisterForm
              isLoggedIn={isLoggedIn}
              showLogin={() => setShowRegister(false)}
            />
          )}
          {!showRegister && (
            <form onSubmit={submitHandler} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    value={email}
                    onChange={(ev) => setEmail(ev.target.value)}
                    id="email"
                    name="email"
                    type="email"
                    className="block w-full pl-[5px] rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    value={password}
                    onChange={(ev) => setPassword(ev.target.value)}
                    id="password"
                    name="password"
                    type="password"
                    className="block w-full pl-[5px] rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  Sign in
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
