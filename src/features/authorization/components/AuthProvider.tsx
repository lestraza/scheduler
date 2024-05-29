import { createContext, useContext, useState } from "react";
import { AuthContextType, User } from "../../../shared/types";
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
    await fetch(BASE_URL + "signup", {
      method: "POST",
      headers,
      body: JSON.stringify(user),
    })
      .then((res) => {
        if (res.ok) {
          callback()
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const login = async (user: User) => {
    await fetch(BASE_URL + "login", {
      method: "POST",
      headers,
      body: JSON.stringify(user),
    })
      .then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            const { token } = data;
            localStorage.setItem(localStorageKey, token);
            setUser(data.user);
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const test_token = async () => {
    const token = localStorage.getItem(localStorageKey);
    if (token) {
      const headersWithToken = { ...headers, Authorization: `Token ${token}` };
      await fetch(BASE_URL + "test_token", {
        headers: headersWithToken,
      })
        .then((res) => {
          if (res.ok) {
            res.json().then((data) => {
              setUser(data.user);
              return true;
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const logout = async () => {
    const token = localStorage.getItem(localStorageKey);
    if (token) {
      const headersWithToken = { ...headers, Authorization: `Token ${token}` };
      await fetch(BASE_URL + "logout", {
        headers: headersWithToken,
      })
        .then((res) => {
          if (res.ok) {
            setUser(null);
            localStorage.removeItem(localStorageKey);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const value = { user, signup, login, test_token, logout };
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
