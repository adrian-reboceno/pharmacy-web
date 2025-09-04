const USER_KEY = "auth_user";
const TOKEN_KEY = "auth_token";

export const storage = {
  setUser: (user: any) => {
    try {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } catch (e) {
      console.error("Error guardando user en localStorage:", e);
    }
  },
  getUser: () => {
    try {
      const data = localStorage.getItem(USER_KEY);
      if (!data) return null;
      if (data.startsWith("{") || data.startsWith("[")) {
        return JSON.parse(data);
      }
      console.warn("Valor inesperado en localStorage[auth_user]:", data);
      return null;
    } catch (e) {
      console.error("Error parseando user desde localStorage:", e);
      return null;
    }
  },
  removeUser: () => localStorage.removeItem(USER_KEY),

  setToken: (token: string) => localStorage.setItem(TOKEN_KEY, token),
  getToken: () => localStorage.getItem(TOKEN_KEY),
  removeToken: () => localStorage.removeItem(TOKEN_KEY),
};
