const TOKEN_KEY = "authToken";

export const saveToken = (token) => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = () => {
  if (typeof window === "undefined") {
    return "";
  }

  return window.localStorage.getItem(TOKEN_KEY) || "";
};

export const logout = () => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(TOKEN_KEY);
};
