import { IconButton, Stack, Typography, colors } from "@mui/material";
import { Day, UserEvent } from "../../types";
import { EventChip } from "../event-chip";
import { ReactComponent as NotesIcon } from "../../../shared/icons/notes.svg";
import { ReactComponent as EventIcon } from "../../../shared/icons/event.svg";
import { eventSchema, monthsList, weekdaysList } from "../../constants";
import { Icon } from "../icon";

export type EventCardProps = {
  day: Day;
  date: Date;
  userEvent?: UserEvent;
  onHandleEdit: () => void;
  onHandleDelete: () => void;
};

export const EventCard = ({
  day,
  date,
  userEvent,
  onHandleEdit,
  onHandleDelete,
}: EventCardProps) => {
  return (
    <Stack sx={{ gap: "16px", minWidth: "240px" }}>
      <Stack justifyContent="flex-end" direction="row">
        {userEvent && (
          <>
            <IconButton onClick={() => onHandleEdit()}>
              <Icon icon="Edit" />
            </IconButton>
            <IconButton onClick={() => onHandleDelete()}>
              <Icon icon="Delete" />
            </IconButton>
          </>
        )}
      </Stack>
      <Stack paddingLeft="2px">
        <Stack direction="row" alignItems="center">
          <EventChip
            color={userEvent?.color ? userEvent?.color : eventSchema[2].color}
          />
          <Typography variant="h6" paddingLeft="12px">
            {day?.holiday?.namePL || userEvent?.name}
          </Typography>
        </Stack>
        <Typography variant="body2" paddingLeft="28px">
          {weekdaysList[date?.getDay()]}, {date.getDate()}
          {monthsList[date.getMonth()]}
        </Typography>
      </Stack>
      <Stack direction="row" alignItems="center">
        <NotesIcon fill={colors.grey[400]} />
        <Typography variant="body2" paddingLeft="8px">
          {!userEvent ? "Public holiday" : userEvent.type}
        </Typography>
      </Stack>
      <Stack direction="row" alignItems="center">
        <EventIcon fill={colors.grey[400]} />
        <Typography variant="body2" paddingLeft="8px">
          {!userEvent ? "Holidays in Poland" : userEvent.description}
        </Typography>
      </Stack>
    </Stack>
  );
};
