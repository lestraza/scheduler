import { Stack } from "@mui/material";
import { Month } from "../../../shared/components";
import { yearsSlice } from "../store";
import { OnOpenCardProps, SchedulerMonthRows } from "./SchedulerMonthRows";
import { getDaysOfMonth, getFirstWeekDayOfMonth } from "../../../shared/utils";
import { SchedulerMonthColumns } from "./SchedulerMonthColumns";
import { Day, EventType, UserEvent } from "../../../shared/types";
import { useToggle } from "../../../shared/hooks";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { weekdaysList } from "../../../shared/constants";
import { ModalCard } from "./ModalCard";
import { OnSelectDayProps } from "../../../shared/components/day-container";
import { useDispatch } from "react-redux";
import { API } from "../../../shared/api";
import { AuthContext } from "../../authorization/components";
import { useAppSelector } from "../../../store";

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
  const { user } = useContext(AuthContext);

  const { displayedYear, displayedMonth, calendarViewTab, shouldUpdateData } = useAppSelector(
    ({ yearsReducer }) => yearsReducer
  );
  const { setShouldUpdateData } = yearsSlice.actions;
  const dispatch = useDispatch();

  useEffect(() => {
    if (displayedMonth) {
      const days = getDaysOfMonth({
        year: displayedYear,
        month: displayedMonth,
        userEvents,
      });
      setAllDays(days);
    }
  }, [displayedYear, displayedMonth, userEvents]);

  const onHandleOpen = useCallback(
    ({ day: value, eventType, userEvent }: OnOpenCardProps) => {
      setDay(value);
      if (day?.date === value.date) {
        setOpen(false);
      }
      if (day?.date !== value.date) {
        setEventType(eventType);
        setOpen(true);
      }
      if (userEvent) {
        setUserEvent(userEvent);
      }
    },
    [day, setOpen]
  );

  const onHandleEdit = () => {
    setIsEdit((prev) => !prev);
  };

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
      const res = await API.deleteEvent(userEvent);
      if (res) {
        onHandleClose();
        dispatch(setShouldUpdateData(true));
      }
    }
  }, [dispatch, onHandleClose, setShouldUpdateData, userEvent]);

  const onSaveData = useCallback(
    async (data: UserEvent) => {
      let res: unknown;
      if (isEdit && userEvent) {
        res = await API.updateEvent(data);
      }
      if (eventType && user && !isEdit) {
        data.date = state.current.dates;
        data.user = user.id;
        res = await API.saveEvent(data);
      }
      if (res) {
        dispatch(setShouldUpdateData(true));
        onHandleClose();
        setIsSelecting(false);
      }
    },
    [
      dispatch,
      eventType,
      isEdit,
      onHandleClose,
      setShouldUpdateData,
      user,
      userEvent,
    ]
  );

  const firstWeekDayOfMonth = getFirstWeekDayOfMonth(
    displayedYear,
    displayedMonth
  );

  const className = calendarViewTab.toLowerCase();

  const rows = shouldUpdateData ? (
    []
  ) : (
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
          onSaveData={onSaveData}
          isEdit={isEdit}
          userEvent={userEvent}
          onHandleEdit={onHandleEdit}
          onHandleDelete={onDeleteDBData}
        />
      )}
    </Stack>
  );
};
