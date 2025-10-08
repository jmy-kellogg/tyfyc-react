import React, { useState } from "react";
import Tabs from "@/components/Tabs";
import { useAuthContext } from "@/context/AuthContext.ts";
import PasswordInput from "@/components/PasswordInput";
import Register from "./Register";

interface LoginForm {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const [tab, setTab] = useState<string>("login");
  const [loginForm, setLoginForm] = useState<LoginForm>({
    username: "",
    password: "",
  });
  const { login } = useAuthContext();

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (loginForm.username && loginForm.password && login) {
      login(loginForm.username, loginForm.password);
    }
  };

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
              className="m-2 w-xl rounded-md bg-white p-2 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              value={loginForm.username}
              onChange={handleLoginChange}
              required
            />
            <PasswordInput
              name="password"
              placeholder="Password"
              password={loginForm.password}
              onChange={handleLoginChange}
            />
            <button
              className="align-right rounded-md border-2 border-indigo-600 p-2 m-4 text-indigo-600 shadow-md hover:bg-indigo-500 hover:text-white hover:cursor-pointer"
              type="submit"
            >
              Login
            </button>
          </form>
        )}

        {tab === "register" && <Register setTab={setTab} />}
      </div>
    </>
  );
};

export default Login;
