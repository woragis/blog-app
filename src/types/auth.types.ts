export type ReduxStatus = "idle" | "loading" | "succeeded" | "failed";

export interface AuthUserInterface {
  name: string;
  email: string;
  token: string;
}

export interface AuthState {
  user: AuthUserInterface | null;
  loggedIn: boolean;
  status: ReduxStatus;
  error: string | null;
}

export interface RegisterInterface {
  name: string;
  email: string;
  password: string;
}

export interface LoginInterface {
  email: string;
  password: string;
}
