import { Button, Stack, TextField, Typography } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { User } from "../../../shared/types";

export type AuthFormState = {
  username: string;
  email?: string;
  password: string;
};

const initialAuthFormState: AuthFormState = {
  username: "",
  email: "",
  password: "",
};
export const SignUp = ({
  signup,
  callback,
}: {
  signup: (user: User, callback: VoidFunction) => void;
  callback: VoidFunction;
}) => {
  const [user, setUser] = useState(initialAuthFormState);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const id = event.target.id;
    const value = event.currentTarget.value;

    setUser((prev) => ({ ...prev, ...{ [id]: value } }));
  };

  const onSignup = () => {
    signup(user, callback);
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
      <Typography>Sign Up</Typography>
      <TextField
        id="username"
        variant="outlined"
        label="Username"
        required
        onChange={onChange}
        value={user["username"]}
      />

      <TextField
        id="email"
        variant="outlined"
        label="Email"
        required
        type="email"
        onChange={onChange}
        value={user["email"]}
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

      <Button variant="outlined" onClick={onSignup}>
        Submit
      </Button>
    </Stack>
  );
};
