import { User } from "./interfaces/user.interface";

export function setUser(user: User) {
  if (typeof window !== "undefined") {
    localStorage.setItem("user", JSON.stringify(user));
  }
}

export function getUser(): User | null {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem("user");
    return data ? JSON.parse(data) : null;
  }
  return null;
}

export function clearUser(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("user");
  }
}
