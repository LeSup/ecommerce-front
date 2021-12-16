export interface User {
  email: string;
  name: string;
  role: number;
  _id: string;
}

export interface Jwt {
  token: string;
  user: User;
}
