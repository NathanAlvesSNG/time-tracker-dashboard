export type User = {
  id: number;
  userName: string;
  userEmail: string;
  role: string;
  cargaHoraria: number;
};

export type LoginResponse = {
  message: string;
  user: User;
  token: string;
};
