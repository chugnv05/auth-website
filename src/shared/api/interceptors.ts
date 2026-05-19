import { PATHS } from "@/app/router/paths";
import { useAuthStore } from "@/features/auth/store/auth.store";
import axios from "axios";
import { ENV } from "../config/env";
import { ENDPOINTS } from "./endpoints";
import { httpClient } from "./httpClient";

httpClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

let isRefreshing = false;
let queue: ((token: string | null) => void)[] = [];

const processQueue = (token: string | null) => {
  queue.forEach((cb) => cb(token));
  queue = [];
};

httpClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    const isRefreshRequest = originalRequest.url?.includes(ENDPOINTS.AUTH.refresh);

    if (error.response?.status === 401 && !originalRequest._retry && !isRefreshRequest) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          queue.push((token: string | null) => {
            if (!token) {
              reject(new Error("Session expired"));
              return;
            }
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(httpClient(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Dùng axios trực tiếp (không qua httpClient) để tránh vòng lặp interceptor
        const res = await axios.post(
          `${ENV.API_URL}${ENDPOINTS.AUTH.refresh}`,
          {},
          { withCredentials: true },
        );

        const newAccessToken = res.data.accessToken as string;
        useAuthStore.setState({
          accessToken: newAccessToken,
        });

        processQueue(newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return httpClient(originalRequest);
      } catch (error) {
        processQueue(null);
        useAuthStore.getState().logout();
        window.location.href = PATHS.LOGIN;

        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  },
);
