import api from ".";

import type { User } from "../types";

export const fetchUser = async (): Promise<User> => {
  try {
    const response = await api.get(`/users/me`);
    return response.data;
  } catch (err) {
    console.error("Fetch user profile error:", err);
    throw err;
  }
};

export const updateUser = async (user: Partial<User>): Promise<User> => {
  try {
    const response = await api.put(`/users/me`, user);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
