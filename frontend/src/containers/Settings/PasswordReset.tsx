import { FC, ChangeEvent, FormEvent, useState } from "react";
import { updatePassword } from "@/api/auth";
import PasswordInput from "@/components/PasswordInput";
import { validatePassword } from "@/utils";

const PasswordReset: FC = () => {
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const resetErrorMsg = () => {
    setErrorMsg("");
  };

  const handlePwdSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    const { isValid, details } = validatePassword({
      currentPassword,
      newPassword,
      confirmPassword,
    });

    if (!isValid) {
      setErrorMsg(details);
      return;
    }

    try {
      await updatePassword(currentPassword, newPassword);

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setErrorMsg("Password updated successfully!");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setErrorMsg(err?.response?.data?.detail || "Failed to update password");
    }
  };

  return (
    <div className="justify-self-center">
      <h2>Reset Password</h2>
      <form onSubmit={handlePwdSubmit} className="flex flex-col w-xl p-5">
        <PasswordInput
          name="currentPassword"
          password={currentPassword}
          onErrorMsg={resetErrorMsg}
          onChange={(e: ChangeEvent<HTMLInputElement>): void =>
            setCurrentPassword(e.target.value)
          }
        />
        <PasswordInput
          name="newPassword"
          password={newPassword}
          onErrorMsg={resetErrorMsg}
          onChange={(e: ChangeEvent<HTMLInputElement>): void =>
            setNewPassword(e.target.value)
          }
        />
        <PasswordInput
          name="confirmPassword"
          password={confirmPassword}
          onErrorMsg={resetErrorMsg}
          onChange={(e: ChangeEvent<HTMLInputElement>): void =>
            setConfirmPassword(e.target.value)
          }
        />
        {!!errorMsg && <div className="m-2">{errorMsg}</div>}

        <button
          className="w-25 m-2 self-end p-1 align-right rounded-md border-2 border-indigo-600 text-indigo-600 shadow-md hover:bg-indigo-500 hover:text-white hover:cursor-pointer"
          type="submit"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default PasswordReset;
