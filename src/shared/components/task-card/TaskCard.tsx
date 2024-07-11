import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Stack,
  Tab,
  Tabs,
  TextField,
  colors,
} from "@mui/material";
import { ReactComponent as ListIcon } from "../../../shared/icons/list.svg";
import styled from "@emotion/styled";

import { useToggle } from "../../hooks";
import { Select } from "../select";
import { createTimePeriodOptions } from "../../utils";
import { ChangeEvent, useEffect, useState } from "react";
import { EventType, UserEvent } from "../../types";
import { Icon } from "../icon";
import { eventSchema, eventTypeList } from "../../constants";

export type TaskCardProps = {
  onSaveData: (data: FormData) => void;
  onClose: () => void;
  date: string;
  userEvent?: UserEvent;
};

const CustomStack = styled(Stack)`
  flex-direction: row;
  align-items: center;
  gap: 16px;
  color: ${colors.grey[800]};
`;

const CustomInput = styled.input`
  display: none;
`;

const options = createTimePeriodOptions().map((key) => {
  return (
    <MenuItem value={key} key={key}>
      {key}
    </MenuItem>
  );
});

type DefaultEventType = Pick<UserEvent, "description" | "name" | "period"> & {
  file: File | null;
  type: number;
};

const defaultEvent: DefaultEventType = {
  type: 0,
  period: "",
  name: "",
  description: "",
  file: null,
};

export const TaskCard = ({
  userEvent,
  date,
  onSaveData,
  onClose,
}: TaskCardProps) => {
  const { open, setOpen } = useToggle();
  const [event, setEvent] = useState(defaultEvent);

  useEffect(() => {
    if (userEvent) {
      const index = eventSchema.findIndex(
        ({ type }) => type === userEvent.type
      );
      setEvent((prev) => ({
        ...prev,
        description: userEvent.description,
        period: userEvent.period,
        name: userEvent.name,
        type: index,
      }));
      setOpen(true);
    }
  }, [setOpen, userEvent]);

  const onHandleChange = (
    event: ChangeEvent<HTMLInputElement>,
    title: string
  ) => {
    setEvent((prev) => ({ ...prev, [title]: event.target.value }));
  };

  const onHandleSave = async () => {
    const formData = new FormData();
    formData.append("name", event.name);
    formData.append("description", event.description as string);
    formData.append("period", event.period);
    formData.append("type", eventTypeList[event.type].toString());
    formData.append(
      "color",
      eventSchema.find(
        (elem) => elem.type === (eventTypeList[event.type] as EventType)
      )?.color || ""
    );
    if (event.file) {
      formData.append("image_url", event.file, event.file.name);
    }
    if (userEvent?.id) {
      formData.append("id", userEvent.id);
    }
    onSaveData(formData);
  };

  const onHandleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files?.length === 1) {
      setEvent((prev) => ({ ...prev, file: files[0] }));
    }
  };

  return (
    <Stack sx={{ gap: "16px" }}>
      <Stack>
        <TextField
          variant="standard"
          placeholder="Add title and time"
          value={event["name"]}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            onHandleChange(event, "name")
          }
        />
      </Stack>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={event["type"]}>
          {eventTypeList.map((item, index) => (
            <Tab
              label={item}
              onClick={() => setEvent((prev) => ({ ...prev, type: index }))}
              id={item}
              key={item}
            />
          ))}
        </Tabs>
      </Box>
      <CustomStack>
        <CustomStack>
          <Icon icon="Clock" fill={colors.grey[400]} />
          {!open ? (
            <Button sx={{ minWidth: "100px" }} onClick={() => setOpen(true)}>
              Add time
            </Button>
          ) : (
            <Select
              minWidth={100}
              onSelectOption={(value: string) =>
                setEvent((prev) => ({ ...prev, period: value }))
              }
              value={event.period}
            >
              {options}
            </Select>
          )}
        </CustomStack>
        <CustomStack>
          <IconButton>
            <label htmlFor="upload">
              <Icon icon="Clip" />
            </label>
          </IconButton>
          <CustomInput
            type="file"
            id="upload"
            accept="image/*"
            onChange={onHandleUpload}
          />
        </CustomStack>
      </CustomStack>
      <CustomStack>
        <ListIcon fill={colors.grey[400]} />
        <Stack flexGrow="1">
          <TextField
            label="Add description"
            multiline
            maxRows={10}
            variant="filled"
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              onHandleChange(event, "description")
            }
            value={event.description}
          />
        </Stack>
      </CustomStack>
      <CustomStack justifyContent="flex-end">
        <Button
          sx={{
            minWidth: "75px",
            alignSelf: "end",
            color: colors.pink[200],
            borderColor: colors.pink[200],
            "&:hover": {
              color: colors.pink[200],
              borderColor: colors.pink[200],
            },
          }}
          onClick={onClose}
          color="secondary"
        >
          Cancel
        </Button>
        <Button
          sx={{ minWidth: "75px", alignSelf: "end" }}
          onClick={onHandleSave}
        >
          Save
        </Button>
      </CustomStack>
    </Stack>
  );
};
