export function setUser(user: unknown) {
  // TODO
  if (typeof window !== "undefined") {
    localStorage.setItem("user", JSON.stringify(user));
  }
}

export function getUser() {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem("user");
    return data ? JSON.parse(data) : null;
  }
  return null;
}

export function clearUser() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("user");
  }
}
