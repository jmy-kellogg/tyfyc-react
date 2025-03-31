import { useState, useContext, useEffect } from "react";
import Tabs from "@/components/Tabs";
import { AuthContext } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const [tab, setTab] = useState("login");
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [registerForm, setRegisterForm] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const { login, register, token } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.username && loginForm.password && login) {
      login(loginForm.username, loginForm.password);
    }
  };

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterForm({
      ...registerForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { username, email, password, firstName, lastName } = registerForm;
    if (username && password && email && firstName && lastName && register) {
      try {
        await register(username, email, password, firstName, lastName);
        setTab("login");
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <>
      <div className="absolute top-50 left-50 w-2xl">
        <Tabs
          tabs={[
            {
              label: "Login",
              value: "login",
            },
            {
              label: "Register",
              value: "register",
            },
          ]}
          active={tab}
          clearable={false}
          setActive={setTab}
        />
        {tab === "login" && (
          <form onSubmit={handleLoginSubmit} className="p-5 bg-white">
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="m-3 w-xl rounded-md bg-white p-2 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              value={loginForm.username}
              onChange={handleLoginChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="m-3 w-xl rounded-md bg-white p-2 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              value={loginForm.password}
              onChange={handleLoginChange}
              required
            />
            <button
              className="align-right rounded-md border-2 border-indigo-600 p-2 m-4 text-indigo-600 shadow-md hover:bg-indigo-500 hover:text-white hover:cursor-pointer"
              type="submit"
            >
              Login
            </button>
          </form>
        )}

        {tab === "register" && (
          <form onSubmit={handleRegisterSubmit} className="p-5 bg-white">
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="m-3 w-xl rounded-md bg-white p-2 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              value={registerForm.username}
              onChange={handleRegisterChange}
              required
            />
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              className="m-3 w-xl rounded-md bg-white p-2 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              value={registerForm.firstName}
              onChange={handleRegisterChange}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              className="m-3 w-xl rounded-md bg-white p-2 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              value={registerForm.lastName}
              onChange={handleRegisterChange}
              required
            />
            <input
              type="text"
              name="email"
              placeholder="Email"
              className="m-3 w-xl rounded-md bg-white p-2 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              value={registerForm.email}
              onChange={handleRegisterChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="m-3 w-xl rounded-md bg-white p-2 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              value={registerForm.password}
              onChange={handleRegisterChange}
              required
            />
            <button
              className="align-right rounded-md border-2 border-indigo-600 p-2 m-4 text-indigo-600 shadow-md hover:bg-indigo-500 hover:text-white hover:cursor-pointer"
              type="submit"
            >
              Register
            </button>
          </form>
        )}
      </div>
    </>
  );
}

export default Login;
