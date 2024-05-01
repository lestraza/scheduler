import { Stack, TextField } from "@mui/material";
import { useState } from "react";
type EventCardType = "default" | "vacation" | "sickLeave" | "dayOff";
type EventCardProps = {
  type?: EventCardType;
  name?: string;
};

export const EventCard = ({ type = "default" }: EventCardProps) => {
  const [title, setTitle] = useState("");
  const onHandleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  return (
    <Stack sx={{ gap: "16px", minWidth: "200px" }}>
      <Stack>
        <TextField
          variant="standard"
          placeholder="Add title and time"
          value={title}
          onChange={onHandleTitle}
        />
      </Stack>
    </Stack>
  );
};
