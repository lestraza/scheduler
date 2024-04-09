import {
  Button,
  MenuItem,
  Stack,
  TextField,
  Typography,
  colors,
} from "@mui/material";
import { v4 } from "uuid";
import { ReactComponent as ClockIcon } from "../../../shared/icons/schedule.svg";
import { ReactComponent as ListIcon } from "../../../shared/icons/list.svg";
import styled from "@emotion/styled";

import { useToggle } from "../../hooks";
import { Select } from "../select";
import { createTimePeriodOptions, dateToISOSting } from "../../utils";
import { useEffect, useState } from "react";
import { Task } from "../../types";

export type TaskCardType = "new" | "edit" | "default";

type TaskCardProps = {
  date: Date;
  task?: Task;
  type?: TaskCardType;
  onSaveData: (task: Task) => void;
};

const DateContainer = styled(Stack)`
  padding: 4px 8px;
  border-radius: 4px;
  &:hover {
    background-color: ${colors.grey[200]};
  }
`;

const CustomStack = styled(Stack)`
  flex-direction: row;
  align-items: center;
  gap: 16px;
  color: ${colors.grey[800]};
`;

const options = createTimePeriodOptions().map((key) => {
  return (
    <MenuItem value={key} key={key}>
      {key}
    </MenuItem>
  );
});

export const TaskCard = ({
  date,
  task,
  type = "default",
  onSaveData,
}: TaskCardProps) => {
  const { open, setOpen } = useToggle();
  const [period, setPeriod] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (task) {
      setDescription(task.description || "");
      setPeriod(task.period);
      setTitle(task.name);
    }
  }, [task]);

  const onHandleDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };
  const onHandleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const onHandleSave = () => {
    const task = {
      id: v4(),
      date: dateToISOSting(date),
      name: title,
      period,
      description,
    };
    onSaveData(task);
  };

  return (
    <Stack sx={{ gap: "16px" }}>
      <Stack>
        {type === "default" ? (
          title
        ) : (
          <TextField
            variant="standard"
            placeholder="Add title and time"
            value={title}
            onChange={onHandleTitle}
          />
        )}
      </Stack>
      <CustomStack>
        <ClockIcon fill={colors.grey[400]} />
        <DateContainer>
          <Typography>
            {date.toUTCString().toString().substring(0, 16)}
          </Typography>
          <Typography fontSize="10px">Does not repeat</Typography>
        </DateContainer>
        {!open ? (
          <Button sx={{ minWidth: "100px" }} onClick={() => setOpen(true)}>
            Add time
          </Button>
        ) : (
          <Select
            minWidth={100}
            onSelectOption={(value: string) => setPeriod(value)}
            value={period}
          >
            {options}
          </Select>
        )}
      </CustomStack>
      <CustomStack>
        <ListIcon fill={colors.grey[400]} />
        <Stack flexGrow="1">
          <TextField
            label="Add description"
            multiline
            maxRows={10}
            variant="filled"
            onChange={onHandleDescription}
            value={description}
          />
        </Stack>
      </CustomStack>
      <Button
        sx={{ minWidth: "75px", alignSelf: "end" }}
        onClick={onHandleSave}
      >
        Save
      </Button>
    </Stack>
  );
};
