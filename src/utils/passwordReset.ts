import { PasswordResetToken } from "@/types/types";

const RESET_KEY = "lendsqr_password_reset";

export const saveResetToken = (data: PasswordResetToken) => {
  localStorage.setItem(RESET_KEY, JSON.stringify(data));
};

export const getResetToken = (): PasswordResetToken | null => {
  const data = localStorage.getItem(RESET_KEY);
  return data ? JSON.parse(data) : null;
};

export const clearResetToken = () => {
  localStorage.removeItem(RESET_KEY);
};
