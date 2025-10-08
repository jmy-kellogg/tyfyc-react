import { FC, ChangeEvent, useState } from "react";
import { useAuthContext } from "@/context/AuthContext.ts";
import PasswordInput from "@/components/PasswordInput";
import { validatePassword } from "@/utils";

interface RegisterForm {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface RegisterProps {
  setTab: (tab: string) => void;
}

const Register: FC<RegisterProps> = ({ setTab }) => {
  const [registerForm, setRegisterForm] = useState<RegisterForm>({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const { register } = useAuthContext();

  const handleRegisterChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setRegisterForm({
      ...registerForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegisterSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    const { isValid, details } = validatePassword({
      newPassword: registerForm.password,
      confirmPassword,
    });

    if (!isValid) {
      setErrorMsg(details);
      return;
    }

    try {
      if (register) {
        const { username, email, password, firstName, lastName } = registerForm;

        await register(username, email, password, firstName, lastName);
        setTab("login");
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setErrorMsg(err?.response?.data?.detail || "Failed to register");
    }
  };

  return (
    <>
      <form
        onSubmit={handleRegisterSubmit}
        className="flex flex-col p-5 bg-white"
      >
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="m-2 w-xl rounded-md bg-white p-2 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          value={registerForm.username}
          onChange={handleRegisterChange}
          required
        />
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          className="m-2 w-xl rounded-md bg-white p-2 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          value={registerForm.firstName}
          onChange={handleRegisterChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          className="m-2 w-xl rounded-md bg-white p-2 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          value={registerForm.lastName}
          onChange={handleRegisterChange}
          required
        />
        <input
          type="text"
          name="email"
          placeholder="Email"
          className="m-2 w-xl rounded-md bg-white p-2 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          value={registerForm.email}
          onChange={handleRegisterChange}
          required
        />
        <PasswordInput
          name="password"
          placeholder="Password"
          password={registerForm.password}
          onChange={handleRegisterChange}
        />
        <PasswordInput
          name="confirmPassword"
          placeholder="Confirm Password"
          password={confirmPassword}
          onChange={(e: ChangeEvent<HTMLInputElement>): void =>
            setConfirmPassword(e.target.value)
          }
        />
        {!!errorMsg && <div className="m-2">{errorMsg}</div>}
        <button
          className="w-25 align-right rounded-md border-2 border-indigo-600 p-2 m-4 text-indigo-600 shadow-md hover:bg-indigo-500 hover:text-white hover:cursor-pointer"
          type="submit"
        >
          Register
        </button>
      </form>
    </>
  );
};

export default Register;
