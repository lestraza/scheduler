import { Stack } from "@mui/material";
import { Month } from "../../../shared/components";
import { useAppSelector } from "../store";
import { SchedulerMonthRows } from "./SchedulerMonthRows";
import { getDaysOfMonth, getFirstWeekDayOfMonth } from "../../../shared/utils";
import { SchedulerMonthColumns } from "./SchedulerMonthColumns";
import { Day, EventType, Task } from "../../../shared/types";
import { useAddDBData, useToggle } from "../../../shared/hooks";
import { useCallback, useState } from "react";
import { weekdaysList } from "../../../shared/constants";
import { ModalCard } from "./ModalCard";

export const MonthView = ({ tasks }: { tasks: Task[] }) => {
  const { open, setOpen } = useToggle();
  const [day, setDay] = useState<Day | null>(null);
  const [modalType, setModalType] = useState<EventType | null>(null);

  const { currentYear, displayedMonth, calendarViewTab } = useAppSelector(
    ({ yearsReducer }) => yearsReducer
  );

  const { addDBData } = useAddDBData();

  const onHandleOpen = useCallback(
    (value: Day) => {
      if (day?.date === value.date) {
        setOpen(false);
      }
      if (day?.date !== value.date && !open) {
        setDay(value);
        setModalType(EventType.Holiday);
        setOpen(true);
      }
    },
    [day, open, setOpen]
  );

  const onHandleCreateNewTask = useCallback(
    (day: Day) => {
      setModalType(EventType.Task);
      setOpen(true);
      setDay(day);
    },
    [setOpen]
  );
  const onHandleClose = useCallback(() => {
    setOpen(false);
    setDay(null);
    setModalType(null);
  }, [setOpen]);

  const onSaveDBData = useCallback(
    async (data: Task | Event) => {
      if (modalType) {
        const res = await addDBData(modalType, data);
        if (res) onHandleClose();
      }
    },
    [addDBData, modalType, onHandleClose]
  );

  const firstWeekDayOfMonth = getFirstWeekDayOfMonth(
    currentYear,
    displayedMonth
  );
  const days = getDaysOfMonth({
    year: currentYear,
    month: displayedMonth,
    tasks,
  });
  const className = calendarViewTab.toLowerCase();

  const rows = (
    <SchedulerMonthRows
      days={days}
      firstWeekDayOfMonth={firstWeekDayOfMonth}
      className={className}
      onOpen={onHandleCreateNewTask}
      onOpenHolidayCard={onHandleOpen}
    />
  );

  const columns = <SchedulerMonthColumns weekdays={weekdaysList} />;

  return (
    <Stack>
      <Month rows={rows} columns={columns} className={className} />
      {modalType && (
        <ModalCard
          open={open}
          onClose={() => onHandleClose()}
          day={day as Day}
          type={modalType}
          onSave={onSaveDBData}
        />
      )}
    </Stack>
  );
};
