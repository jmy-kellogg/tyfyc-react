import { FC, ChangeEvent, FormEvent, useState } from "react";
import { updatePassword } from "@/api/auth";
import PasswordInput from "@/components/PasswordInput";

const PasswordReset: FC = () => {
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const validatePassword = (): boolean => {
    // Check if all fields are filled
    if (!currentPassword || !newPassword || !confirmPassword) {
      setErrorMsg("All fields are required");
      return false;
    }

    // Check if new password matches confirm password
    if (newPassword !== confirmPassword) {
      setErrorMsg("New and Confirm password do not match");
      return false;
    }

    // Check if new password is different from current password
    if (currentPassword === newPassword) {
      setErrorMsg("New password must be different from current password");
      return false;
    }

    // Check password length
    if (newPassword.length < 8) {
      setErrorMsg("Password must be at least 8 characters long");
      return false;
    }

    // Check password strength (at least one uppercase, one lowercase, one number)
    const hasUpperCase = /[A-Z]/.test(newPassword);
    const hasLowerCase = /[a-z]/.test(newPassword);
    const hasNumber = /[0-9]/.test(newPassword);

    if (!hasUpperCase || !hasLowerCase || !hasNumber) {
      setErrorMsg(
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      );
      return false;
    }

    setErrorMsg("");
    return true;
  };

  const resetErrorMsg = () => {
    setErrorMsg("");
  };

  const handlePwdSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    if (!validatePassword()) {
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
          onChange={(e: ChangeEvent<HTMLInputElement>): void =>
            setCurrentPassword(e.target.value)
          }
          onError={resetErrorMsg}
        />
        <PasswordInput
          name="newPassword"
          password={newPassword}
          onChange={(e: ChangeEvent<HTMLInputElement>): void =>
            setNewPassword(e.target.value)
          }
          onError={resetErrorMsg}
        />
        <PasswordInput
          name="confirmPassword"
          password={confirmPassword}
          onChange={(e: ChangeEvent<HTMLInputElement>): void =>
            setConfirmPassword(e.target.value)
          }
          onError={resetErrorMsg}
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
