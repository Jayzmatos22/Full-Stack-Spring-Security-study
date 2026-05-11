import { ApiUser } from "../api/ApiUser";

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
}

export const authService = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await ApiUser.post("/auth/login", data);
    localStorage.setItem("token", response.token);
    return response;
  },

  register: async (data: RegisterRequest): Promise<void> => {
    await ApiUser.post("/auth/register", data);
  },

  logout: () => {
    localStorage.removeItem("token");
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem("token");
  }
};