import { useContext, useEffect, useState } from "react";
import { Box, Button, Stack } from "@mui/material";
import { Login } from "./Login";
import { SignUp } from "./SignUp";
import { AuthContext } from "./AuthProvider";
import { Navigate } from "react-router-dom";

export const Auth = () => {
  const [isLoginForm, setLoginForm] = useState(false);
  const { user, test_token, login, signup } = useContext(AuthContext);

  useEffect(() => {
    const token = localStorage.getItem("scheduler");
    if (!user && token) {
      test_token(token);
    }
  }, [test_token, user, user?.username]);

  return user?.username ? (
    <Navigate to="/" replace />
  ) : (
    <Box>
      <Stack
        sx={{ margin: "24px", flexDirection: "row", justifyContent: "end" }}
      >
        <Button onClick={() => setLoginForm(true)} sx={{ marginRight: "24px" }}>
          Log In
        </Button>
        <Button onClick={() => setLoginForm(false)}>Sign Up</Button>
      </Stack>
      {isLoginForm ? (
        <Login login={login} />
      ) : (
        <SignUp signup={signup} callback={() => setLoginForm(true)} />
      )}
    </Box>
  );
};
