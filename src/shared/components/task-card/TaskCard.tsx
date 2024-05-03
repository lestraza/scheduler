import {
  Box,
  Button,
  MenuItem,
  Stack,
  Tab,
  Tabs,
  TextField,
  colors,
} from "@mui/material";
import { v4 } from "uuid";
import { ReactComponent as ListIcon } from "../../../shared/icons/list.svg";
import styled from "@emotion/styled";

import { useToggle } from "../../hooks";
import { Select } from "../select";
import { createTimePeriodOptions } from "../../utils";
import { useEffect, useState } from "react";
import { EventType, UserEvent } from "../../types";
import { Icon } from "../icon";
import { eventSchema, eventTypeList } from "../../constants";

export type TaskCardProps = {
  isNew?: boolean;
  isEdit?: boolean;
  onSaveData: (task: UserEvent) => void;
  userEvent?: UserEvent;
};

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
  isEdit = false,
  isNew = false,
  userEvent,
  onSaveData,
}: TaskCardProps) => {
  const { open, setOpen } = useToggle();
  const [type, setType] = useState(0);
  const [period, setPeriod] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (userEvent) {
      setDescription(userEvent.description || "");
      setPeriod(userEvent.period);
      setTitle(userEvent.name);
      const index = eventSchema.findIndex(
        ({ type }) => type === userEvent.type
      );
      setType(index);
      setOpen(true);
    }
  }, [setOpen, userEvent]);

  const onHandleDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };
  const onHandleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const onHandleSave = () => {
    const task = {
      id: v4(),
      name: title,
      period,
      description,
      date: [],
      type: eventTypeList[type] as EventType,
      color:
        eventSchema.find(
          (event) => event.type === (eventTypeList[type] as EventType)
        )?.color || "",
    };
    onSaveData(task);
  };

  return (
    <Stack sx={{ gap: "16px" }}>
      <Stack>
        <TextField
          variant="standard"
          placeholder="Add title and time"
          value={title}
          onChange={onHandleTitle}
        />
      </Stack>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={type}>
          {eventTypeList.map((item, index) => (
            <Tab
              label={item}
              onClick={() => setType(index)}
              id={item}
              key={item}
            />
          ))}
        </Tabs>
      </Box>
      <CustomStack>
        <Icon icon="Clock" fill={colors.grey[400]} />
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
