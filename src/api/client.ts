import axios from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "https://fakestoreapi.com",
  timeout: 12_000,
  headers: {
    "Content-Type": "application/json",
  },
});
