import api from ".";

import type { User } from "../types";

export const fetchUser = async (): Promise<User> => {
  const response = await api.get(`/users/me`);
  return response.data;
};

export const updateUser = async (user: Partial<User>): Promise<User> => {
  const response = await api.put(`/users/me`, user);
  return response.data;
};
