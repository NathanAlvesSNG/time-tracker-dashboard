import axios from "axios";

export const api = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001",
});
