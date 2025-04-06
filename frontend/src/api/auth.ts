import api from ".";

import type { LoginReq, RegisterUserReq } from "../types";

export const loginUser = async ({ username, password }: LoginReq) => {
  const params = new URLSearchParams();

  params.append("username", username);
  params.append("password", password);

  const response = await api.post(`/auth/token`, params, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  return response?.data || {};
};

export const registerUser = async (userData: RegisterUserReq) => {
  await api.post(`/auth/register`, userData);
};
