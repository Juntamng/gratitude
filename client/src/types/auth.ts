export interface User {
  id: string;
  email: string;
  name?: string;
}

export interface Session {
  access_token: string;
  refresh_token: string;
}

export interface AuthResponse {
  data: {
    user: User;
    session: Session;
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials extends LoginCredentials {
  name: string;
} 