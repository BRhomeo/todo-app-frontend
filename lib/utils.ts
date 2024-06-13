import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function setLocalUser(
  user: User | null,
  token: string | null,
  refreshToken: string | null
) {
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("tokenObj", JSON.stringify({ token, refreshToken }));
}

export function getLocalUser(): {
  user: User | null;
  tokenObj: {
    token: string | null;
    refreshToken: string | null;
  };
} {
  const token = JSON.parse(localStorage.getItem("tokenObj") ?? "");
  const user = JSON.parse(localStorage.getItem("user") ?? "");
  return {
    user: user,
    tokenObj: token,
  };
}

export function removeLocalUser() {
  localStorage.removeItem("user");
  localStorage.removeItem("tokenObj");
}
