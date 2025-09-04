export interface User {
  id: number;
  name: string;
  email: string;
}

export interface AuthResponse {
  status: string;
  http_status: string;
  message: string;
  data: {
    access_token: string;
    token_type: string;
    expires_in: number;
    user: User;
  };
}
