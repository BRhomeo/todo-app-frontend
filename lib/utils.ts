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
  if (typeof window === "undefined") return;
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
  if (typeof window === "undefined")
    return { user: null, tokenObj: { token: null, refreshToken: null } };
  const token = JSON.parse(localStorage.getItem("tokenObj") ?? "null");
  const user = JSON.parse(localStorage.getItem("user") ?? "null");
  return {
    user: user,
    tokenObj: token,
  };
}

export function removeLocalUser() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("user");
  localStorage.removeItem("tokenObj");
}
