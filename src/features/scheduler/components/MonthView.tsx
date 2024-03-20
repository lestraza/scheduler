import { Stack } from "@mui/material";
import { Month } from "../../../shared/components";
import { useAppSelector } from "../store";
import { SchedulerMonthRows } from "./SchedulerMonthRows";
import { getDaysOfMonth, getFirstWeekDayOfMonth } from "../../../shared/utils";
import { SchedulerMonthColumns } from "./SchedulerMonthColumns";
import { Weekdays } from "../../../shared/types";

export const MonthView = () => {
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
    />
  );

  const weekdays = Object.keys(Weekdays);
  const columns = <SchedulerMonthColumns weekdays={weekdays} />;

  return (
    <Stack>
      <Month rows={rows} columns={columns} className={className} />
    </Stack>
  );
};
