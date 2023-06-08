import { useNavigate } from "react-router";
import BasicAxios from "../../axios/index";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
export default function Example({ isLoggedIn, setUser, showLogin }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn) navigate("/ninja");
  }, []);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submitHandler(ev) {
    ev.preventDefault();
    try {
      if (!name || !email || !password) return;
      await BasicAxios.post("register", {
        name,
        email,
        password,
      });
      showLogin();
    } catch (error) {
      alert("Error");
    }
  }

  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form onSubmit={submitHandler} className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium leading-6 text-white"
          >
            Name
          </label>
          <div className="mt-2">
            <input
              value={name}
              onChange={(ev) => setName(ev.target.value)}
              id="name"
              name="name"
              type="name"
              className="block w-full pl-[5px] rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
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
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
