export interface User {
  username: string;
  id?: string
  email?: string;
  password?: string;
}
export interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  signup: (user: User, callback: VoidFunction) => void;
  testToken: (token: string) => void;
  logout: (token: string) => void;
}
