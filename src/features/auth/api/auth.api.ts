import { httpClient } from "@/shared/api/httpClient";
import { LoginRequest } from "../login/types/login-request.type";
import { LoginResponse } from "../login/types/login-response.type";

export const authApi = {
  login: (data: LoginRequest) => httpClient.post<LoginResponse>("/auth/login", data),
  logout: () => httpClient.post("auth/logout"),
  refresh: () => httpClient.post("/auth/refresh"),
};
