import axios, { type AxiosRequestConfig } from "axios";
import type { ApiResponse } from "@/src/lib/api/types";

export const api = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_API_URL,
  baseURL: "/api",
  timeout: 10_000,
});

export const apiRequest = async <T>(config: AxiosRequestConfig): Promise<T> => {
  const res = await api.request<ApiResponse<T>>(config);
  return res.data.data;
};
