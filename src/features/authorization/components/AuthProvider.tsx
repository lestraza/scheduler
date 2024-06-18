import { createContext, useContext, useState } from "react";
import { AuthContextType, User} from "../../../shared/types";
import { BASE_URL } from "../../../shared/constants/env";
import { useLocation, Navigate } from "react-router-dom";

export const AuthContext = createContext<AuthContextType>(null!);

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json; charset=UTF-8",
};

const localStorageKey = "scheduler";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const signup = async (user: User, callback: VoidFunction) => {
    try {
      const res = await fetch(BASE_URL + "signup", {
        method: "POST",
        headers,
        body: JSON.stringify(user),
      });
      if (res.ok) {
        callback();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const login = async (user: User) => {
    try {
      const res = await fetch(BASE_URL + "login", {
        method: "POST",
        headers,
        body: JSON.stringify(user),
      });
      if (res.ok) {
        const data = await res.json();
        if (data) {
          const { token } = data;
          localStorage.setItem(localStorageKey, token);
          setUser(data.user);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const testToken = async (token: string) => {
    try {
      const headersWithToken = { ...headers, Authorization: `Token ${token}` };
      const res = await fetch(BASE_URL + "test_token", {
        headers: headersWithToken,
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        return true;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async (token: string) => {
    try {
      const headersWithToken = { ...headers, Authorization: `Token ${token}` };
      const res = await fetch(BASE_URL + "logout", {
        headers: headersWithToken,
      });
      if (res.ok) {
        setUser(null);
        localStorage.removeItem(localStorageKey);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const value = { user, signup, login, testToken, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export const RequireAuth = ({
  children,
  user,
}: {
  children: JSX.Element;
  user: User | null;
}) => {
  const location = useLocation();

  if (!user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};
