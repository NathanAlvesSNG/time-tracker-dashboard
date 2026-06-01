import { api } from "./api";

export async function requestPasswordReset(email: string) {
  const { data } = await api.post("/auth/forgot-password", { email });
  return data as { success: boolean; message: string };
}

export async function validateRecoveryToken(token: string) {
  const { data } = await api.get("/auth/reset-password/validate", {
    params: { token },
  });
  return data as { valid: boolean };
}

export async function completePasswordReset(token: string, password: string) {
  const { data } = await api.post("/auth/reset-password", { token, password });
  return data as { success: boolean };
}
