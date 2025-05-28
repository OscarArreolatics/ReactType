export interface ValidarUsuarioParams {
  email: string;
  password: string;
}

export interface userInfo {
  _id: string;
  name: string;
  email: string;
  role: string;
}

export interface checkAuthRes {
  authenticated: boolean;
}

export interface UsuarioResponse {
  token: string;
  user: userInfo;
}