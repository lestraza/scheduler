import { Stack } from "@mui/material";
import { Month } from "../../../shared/components";
import { useAppSelector, yearsSlice } from "../store";
import { OnOpenCardProps, SchedulerMonthRows } from "./SchedulerMonthRows";
import { getDaysOfMonth, getFirstWeekDayOfMonth } from "../../../shared/utils";
import { SchedulerMonthColumns } from "./SchedulerMonthColumns";
import { Day, EventType, StoreName, UserEvent } from "../../../shared/types";
import {
  useAddDBData,
  useDeleteDBData,
  useToggle,
} from "../../../shared/hooks";
import { useCallback, useEffect, useRef, useState } from "react";
import { weekdaysList } from "../../../shared/constants";
import { ModalCard } from "./ModalCard";
import { OnSelectDayProps } from "../../../shared/components/day-container";
import { useDispatch } from "react-redux";

type StateType = {
  start: number;
  end: number;
  weeks: number[];
  dates: string[];
};
const initialState = {
  start: 0,
  end: 0,
  weeks: [],
  dates: [],
};

export const MonthView = ({ userEvents }: { userEvents: UserEvent[] }) => {
  const { open, setOpen } = useToggle();

  const [allDays, setAllDays] = useState<Day[]>([]);
  const [day, setDay] = useState<Day | null>(null);
  const [eventType, setEventType] = useState<EventType | null>(null);
  const [userEvent, setUserEvent] = useState<UserEvent | undefined>(undefined);
  const state = useRef<StateType>(initialState);
  const [isSelecting, setIsSelecting] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const { currentYear, displayedMonth, calendarViewTab } = useAppSelector(
    ({ yearsReducer }) => yearsReducer
  );
  const { setShouldUpdateData } = yearsSlice.actions;
  const dispatch = useDispatch();

  const { addDBData } = useAddDBData();
  const { deleteDBData } = useDeleteDBData();

  useEffect(() => {
    const days = getDaysOfMonth({
      year: currentYear,
      month: displayedMonth,
      userEvents,
    });
    setAllDays(days);
  }, [currentYear, displayedMonth, userEvents]);

  const onHandleOpen = useCallback(
    ({ day: value, eventType, userEvent }: OnOpenCardProps) => {
      if (day?.date === value.date) {
        setOpen(false);
      }
      if (day?.date !== value.date) {
        setDay(value);
        setEventType(eventType);
        setOpen(true);
      }
      if (userEvent) {
        setUserEvent(userEvent);
      }
    },
    [day, setOpen]
  );

  const onEditHandle = useCallback(() => {
    setIsEdit((prev) => !prev);
  }, []);

  const onHandleClose = useCallback(() => {
    const days = [...allDays].map((day) => {
      day.isSelected = false;
      return day;
    });
    setAllDays(days);
    setOpen(false);
    setDay(null);
    setEventType(null);
    setUserEvent(undefined);
    setIsEdit(false);
  }, [allDays, setOpen]);

  const onHandleSelectDays = ({ day, type }: OnSelectDayProps) => {
    const { weekNumber, dayweekNumber } = day;
    if (type === "mousedown") {
      if (!isSelecting && day) {
        allDays[day.dayNumber - 1].isSelected = true;
        setEventType(EventType.Task);
        setIsSelecting(true);
        state.current = {
          start: dayweekNumber,
          end: dayweekNumber,
          weeks: [weekNumber],
          dates: [],
        };
      }
    }

    if (type === "mouseenter" && isSelecting && state.current) {
      const { end, weeks } = state.current;

      state.current.end = dayweekNumber;
      allDays[day.dayNumber - 1].isSelected = true;
      const index = weeks.findIndex((item) => item === weekNumber);
      if (dayweekNumber < end) {
        state.current.end = dayweekNumber;
      }
      if (index === -1) {
        weeks.push(weekNumber);
      } else if (index !== weeks.length - 1) {
        const days = [...allDays];
        days.forEach((day) => {
          if (day.weekNumber === weeks[weeks.length - 1]) {
            day.isSelected = true;
          }
        });
        setAllDays(days);
        weeks.pop();
        return;
      }

      const days = [...allDays];
      days.forEach((day) => {
        if (
          weeks.includes(day.weekNumber) &&
          day.dayweekNumber >= state!.current!.start &&
          day.dayweekNumber <= state!.current!.end
        ) {
          day.isSelected = true;
        } else {
          day.isSelected = false;
        }
      });
      setAllDays(days);
    }
    if (type === "mouseup" && isSelecting) {
      setOpen(true);
      let dates: string[] = [];
      allDays[day.dayNumber - 1].isSelected = true;
      allDays.forEach(({ dayweekNumber, date, weekNumber }) => {
        if (
          state.current.weeks.includes(weekNumber) &&
          dayweekNumber <= state.current.end &&
          dayweekNumber >= state.current.start
        ) {
          dates.push(date);
        }
      });
      state.current.dates = dates;
      setIsSelecting(false);
    }
  };

  const onDeleteDBData = useCallback(async () => {
    if (userEvent) {
      const res = await deleteDBData(StoreName.Events, userEvent.id);
      if (res) {
        onHandleClose();
        dispatch(setShouldUpdateData(true));
      }
    }
  }, [deleteDBData, dispatch, onHandleClose, setShouldUpdateData, userEvent]);

  const onSaveDBData = useCallback(
    async (data: UserEvent) => {
      if (isEdit && userEvent) {
        await deleteDBData(StoreName.Events, userEvent.id);
      }
      if (eventType) {
        data.date = state.current.dates;
        const res = await addDBData(StoreName.Events, data);
        if (res) {
          dispatch(setShouldUpdateData(true));
        }
        if (res) {
          onHandleClose();
          setIsSelecting(false);
        }
      }
    },
    [
      addDBData,
      deleteDBData,
      dispatch,
      eventType,
      isEdit,
      onHandleClose,
      setShouldUpdateData,
      userEvent,
    ]
  );

  const firstWeekDayOfMonth = getFirstWeekDayOfMonth(
    currentYear,
    displayedMonth
  );

  const className = calendarViewTab.toLowerCase();

  const rows = (
    <SchedulerMonthRows
      days={allDays}
      firstWeekDayOfMonth={firstWeekDayOfMonth}
      className={className}
      onOpenCard={onHandleOpen}
      onSelectDay={onHandleSelectDays}
      isSelecting={isSelecting}
    />
  );

  const columns = <SchedulerMonthColumns weekdays={weekdaysList} />;

  return (
    <Stack>
      <Month rows={rows} columns={columns} className={className} />
      {eventType && open && (
        <ModalCard
          open={open}
          onClose={() => onHandleClose()}
          day={day as Day}
          type={eventType}
          onSaveData={onSaveDBData}
          isEdit={isEdit}
          userEvent={userEvent}
          onEditHandle={onEditHandle}
          onHandleDelete={onDeleteDBData}
        />
      )}
    </Stack>
  );
};
