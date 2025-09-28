import React, { useState } from "react";

interface PasswordForm {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const PasswordReset: React.FC = () => {
  const [passwordForm, setPasswordForm] = useState<PasswordForm>({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handlePwdChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPasswordForm({
      ...passwordForm,
      [e.target.name]: e.target.value,
    });
  };

  const handlePwdSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    // ToDo: update database
  };

  return (
    <div className="justify-self-center">
      <h2>Reset Password</h2>
      <form onSubmit={handlePwdSubmit} className="flex flex-col w-xl p-5">
        <input
          type="oldPassword"
          name="oldPassword"
          placeholder="Old Password"
          className="m-2 rounded-md bg-white p-2 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          value={passwordForm.oldPassword}
          onChange={handlePwdChange}
          required
        />
        <input
          type="newPassword"
          name="newPassword"
          placeholder="New Password"
          className="m-2 rounded-md bg-white p-2 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          value={passwordForm.newPassword}
          onChange={handlePwdChange}
          required
        />
        <input
          type="confirmPassword"
          name="confirmPassword"
          placeholder="Confirm Password"
          className="m-2 rounded-md bg-white p-2 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          value={passwordForm.confirmPassword}
          onChange={handlePwdChange}
          required
        />

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
