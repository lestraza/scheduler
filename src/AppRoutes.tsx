import { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import {
  Auth,
  AuthContext,
  RequireAuth,
} from "./features/authorization/components";

export const AppRoutes = () => {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth user={user}>
              <App />
            </RequireAuth>
          }
        />
        <Route path="/login" Component={Auth} />
      </Routes>
    </BrowserRouter>
  );
};
