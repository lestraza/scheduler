import { ChangeEvent, useState } from "react";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { User } from "../../../shared/types";

export const Login = ({ login }: { login: (user: User) => void }) => {
  const [user, setUser] = useState<User>({
    username: "",
    password: "",
  });

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const id = event.target.id;
    const value = event.currentTarget.value;

    setUser((prev) => ({ ...prev, ...{ [id]: value } }));
  };

  const onLogin = () => {
    login(user);
  };
  return (
    <Stack
      sx={{
        maxWidth: "20rem",
        gap: "24px",
        alignItems: "center",
        margin: "40px auto",
      }}
    >
      <Typography>Log in</Typography>
      <TextField
        id="username"
        variant="outlined"
        label="Username"
        required
        type="username"
        onChange={onChange}
        value={user["username"]}
      />
      <TextField
        id="password"
        variant="outlined"
        label="Password"
        required
        type="password"
        onChange={onChange}
        value={user["password"]}
      />

      <Button variant="outlined" onClick={onLogin}>
        Log In
      </Button>
    </Stack>
  );
};
