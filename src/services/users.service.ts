import { api } from "./api";

export async function getUsers() {
  const { data } = await api.get("/users");
  return data;
}

export const getUserByEmail = async (email: string) => {
  const response = await api.get(`/users/${email}`);
  return response.data;
};

export const login = async (email: string, password: string) => {
  const response = await api.post("/auth/login", {
    userEmail: email,
    password,
  });
  return response.data;
};

export const createPassword = async (email: string, password: string) => {
  const response = await api.post("/auth/register", { email, password });
  return response.data;
};
