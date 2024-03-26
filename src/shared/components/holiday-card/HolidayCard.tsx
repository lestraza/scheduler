import { Stack, Typography, colors } from "@mui/material";
import { Day, EventType } from "../../types";
import { EventChip } from "../event-chip";
import { ReactComponent as NotesIcon } from "../../../shared/icons/notes.svg";
import { ReactComponent as EventIcon } from "../../../shared/icons/event.svg";
import { monthsList, weekdaysList } from "../../constants";

type HolidayCardProps = {
  day: Day;
  date: Date;
};
export const HolidayCard = ({ day, date }: HolidayCardProps) => {
  return (
    <Stack sx={{ gap: "16px" }}>
      <Stack paddingLeft="2px">
        <Stack direction="row" alignItems="center">
          <EventChip type={day?.isHoliday ? EventType.Event : EventType.Task} />
          <Typography variant="h6" paddingLeft="12px">
            {day?.holiday?.namePL}
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
          Public holiday
        </Typography>
      </Stack>
      <Stack direction="row" alignItems="center">
        <EventIcon fill={colors.grey[400]} />
        <Typography variant="body2" paddingLeft="8px">
          Holidays in Poland
        </Typography>
      </Stack>
    </Stack>
  );
};
