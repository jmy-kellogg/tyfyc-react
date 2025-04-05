import api from ".";

import type { LoginReq, RegisterUserReq } from "../types";

export const loginUser = async ({ username, password }: LoginReq) => {
  try {
    const params = new URLSearchParams();

    params.append("username", username);
    params.append("password", password);

    const response = await api.post(`/auth/token`, params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const registerUser = async (userData: RegisterUserReq) => {
  try {
    await api.post(`/auth/register`, userData);
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};
