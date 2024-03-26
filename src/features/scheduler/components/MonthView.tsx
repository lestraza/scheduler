import { Stack } from "@mui/material";
import { HolidayCard, Modal, Month } from "../../../shared/components";
import { useAppSelector } from "../store";
import { SchedulerMonthRows } from "./SchedulerMonthRows";
import { getDaysOfMonth, getFirstWeekDayOfMonth } from "../../../shared/utils";
import { SchedulerMonthColumns } from "./SchedulerMonthColumns";
import { Day, EventType, Weekdays } from "../../../shared/types";
import { useToggle } from "../../../shared/hooks";
import { useCallback, useState } from "react";

export const MonthView = () => {
  const { open, setOpen } = useToggle();
  const [day, setDay] = useState<Day | null>(null);
  const [date, setDate] = useState<Date>(new Date());
  const onHandleOpen = useCallback(
    (value: Day, eventType: EventType) => {
      if (day?.date === value.date) {
        setOpen(false);
      }
      if (day?.date !== value.date && !open) {
        setDay(value);
        setDate(new Date(value.date));
        setOpen(true);
      }
    },
    [day, open, setOpen]
  );
  const onHandleClose = useCallback(() => {
    setOpen(false);
    setDay(null);
  }, [setOpen]);
  const { currentYear, displayedMonth, calendarViewTab } = useAppSelector(
    ({ yearsReducer }) => yearsReducer
  );
  const firstWeekDayOfMonth = getFirstWeekDayOfMonth(
    currentYear,
    displayedMonth
  );
  const days = getDaysOfMonth(currentYear, displayedMonth);
  const className = calendarViewTab.toLowerCase();

  const rows = (
    <SchedulerMonthRows
      days={days}
      firstWeekDayOfMonth={firstWeekDayOfMonth}
      className={className}
      onOpen={onHandleOpen}
    />
  );

  const weekdays = Object.keys(Weekdays);
  const columns = <SchedulerMonthColumns weekdays={weekdays} />;

  return (
    <Stack>
      <Month rows={rows} columns={columns} className={className} />
      <Modal
        open={open}
        onClose={() => onHandleClose()}
        sx={{ minWidth: "450px" }}
      >
        <HolidayCard day={day as Day} date={date} />
      </Modal>
    </Stack>
  );
};
