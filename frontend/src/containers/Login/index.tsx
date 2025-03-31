import { useState, useContext, useEffect } from "react";
import Tabs from "@/components/Tabs";
import { AuthContext } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const { login, token } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.username && formData.password && login) {
      login(formData.username, formData.password);
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
          ]}
          active="login"
          clearable={false}
        />
        <form onSubmit={handleSubmit} className="p-5 bg-white">
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="m-5 block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="m-5 block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button
            className="align-right rounded-md border-2 border-indigo-600 p-2 m-4 text-indigo-600 shadow-md hover:bg-indigo-500 hover:text-white hover:cursor-pointer"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
