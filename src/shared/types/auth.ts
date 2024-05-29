export interface User {
  username: string;
  email?: string;
  password?: string;
}
export interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  signup: (user: User, callback: VoidFunction) => void;
  test_token: (token: string) => void;
  logout: () => void;
}
