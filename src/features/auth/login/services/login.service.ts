import { api } from "@/shared/api/axios";
import { LoginPayload } from "../types/login-payload.type";
import { LoginResponse } from "../types/login-response.type";

type AnyObject = Record<string, unknown>;

function asObject(value: unknown): AnyObject | null {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value as AnyObject;
  }

  return null;
}

function getNestedCandidates(payload: unknown) {
  const root = asObject(payload);
  if (!root) return [] as AnyObject[];

  const level1 = asObject(root.data);
  const level2 = level1 ? asObject(level1.data) : null;

  return [root, level1, level2].filter(Boolean) as AnyObject[];
}

function pickString(source: AnyObject, ...keys: string[]) {
  for (const key of keys) {
    const value = source[key];
    if (typeof value === "string" && value.trim().length > 0) {
      return value;
    }
  }

  return null;
}

function unwrapLoginResponse(payload: unknown): LoginResponse {
  const candidates = getNestedCandidates(payload);

  for (const candidate of candidates) {
    const user = asObject(candidate.user);
    const tokensObject = asObject(candidate.tokens) || candidate;

    const accessToken = pickString(tokensObject, "accessToken", "access_token", "token");
    const refreshToken = pickString(tokensObject, "refreshToken", "refresh_token");

    if (user && accessToken) {
      return {
        user: {
          id: String(user.id ?? ""),
          email: String(user.email ?? ""),
          fullName: String(user.fullName ?? user.full_name ?? ""),
          role: String(user.role ?? "user") as "admin" | "user",
        },
        tokens: {
          accessToken,
          refreshToken: refreshToken ?? undefined,
        },
      };
    }
  }

  throw new Error("Invalid login response format from API.");
}

export const loginService = {
  async login(payload: LoginPayload) {
    const response = await api.post("/auth/login", payload);
    return unwrapLoginResponse(response.data);
  },
};
