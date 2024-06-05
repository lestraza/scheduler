import React, { ReactNode, useMemo, useRef } from "react";
import { Stack, TableCell, TableRow } from "@mui/material";
import { Day, EventType, UserEvent } from "../../../shared/types";
import { eventSchema, numberOfDaysPerWeek } from "../../../shared/constants";
import {
  DayContainer,
  OnSelectDayProps,
} from "../../../shared/components/day-container";
import { Bar } from "../../../shared/components";

export type OnOpenCardProps = {
  day: Day;
  eventType: EventType;
  userEvent?: UserEvent;
};

type Props = {
  days: Day[];
  firstWeekDayOfMonth: number;
  className?: string;
  isSelecting?: boolean;
  onOpen?: (day: Day, EventType: EventType) => void;
  onOpenCard?: (props: OnOpenCardProps) => void;
  onSelectDay?: (prop: OnSelectDayProps) => void;
};
type StateProps = {
  week: ReactNode[];
  numberOfWeek: number;
};
const initialState: StateProps = {
  week: [],
  numberOfWeek: 1,
};

export const SchedulerMonthRows = React.memo(
  ({
    days,
    firstWeekDayOfMonth,
    className = "year",
    isSelecting,
    onOpen,
    onOpenCard,
    onSelectDay,
  }: Props) => {
    const state = useRef(initialState);

    const allDays = useMemo(() => {
      [...new Array(numberOfDaysPerWeek)].forEach((_, index) => {
        if (index < firstWeekDayOfMonth) {
          state?.current?.week.push(
            <TableCell
              key={index * 60}
              sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}
            />
          );
        }
      });

      return days?.reduce((acc: ReactNode[], item, index) => {
        if (item.dayweekNumber < numberOfDaysPerWeek) {
          const onBarClick = () => {
            onOpen?.(item, EventType.Holiday);
          };

          state?.current?.week.push(
            <DayContainer
              className={className}
              id={item.date}
              day={item}
              onClick={onBarClick}
              onSelectDay={onSelectDay}
              isSelecting={isSelecting}
            >
              <Stack sx={{ userSelect: "none" }}>
                {new Date(item.date).getDate()}
              </Stack>
              {className === "month" && item.isHoliday ? (
                <Stack sx={{ minWidth: "100%" }}>
                  <Bar
                    label={item.holiday?.name}
                    type={EventType.Holiday}
                    color={
                      eventSchema.find(
                        (event) => event.type === EventType.Holiday
                      )?.color || ""
                    }
                    onClick={() =>
                      onOpenCard?.({
                        day: item,
                        eventType: EventType.Holiday,
                      })
                    }
                  />
                </Stack>
              ) : null}
              {className === "month" && item.userEvents?.length ? (
                <Stack sx={{ minWidth: "100%" }}>
                  {item.userEvents.map((event) => (
                    <Bar
                      label={event.name}
                      type={event.type}
                      color={event.color}
                      onClick={() =>
                        onOpenCard?.({
                          day: item,
                          eventType: event.type,
                          userEvent: event,
                        })
                      }
                      key={item.date + event.name}
                    />
                  ))}
                </Stack>
              ) : null}
            </DayContainer>
          );

          if (
            index + 1 === days?.length &&
            item.dayweekNumber < numberOfDaysPerWeek - 1
          ) {
            [
              ...new Array(numberOfDaysPerWeek - 1 - item.dayweekNumber),
            ].forEach((_, i) => {
              state?.current?.week.push(
                <TableCell
                  key={index * i + 15}
                  sx={{
                    padding: "8px",
                    border: "1px solid rgba(224, 224, 224, 1)",
                  }}
                />
              );
            });

            acc.push(
              <TableRow
                key={state.current.numberOfWeek + item.date}
                sx={{
                  height: "150px",
                }}
              >
                {state?.current?.week}
              </TableRow>
            );
            state.current.week = [];
            state.current.numberOfWeek += 1;
          }
        }
        if (item.dayweekNumber + 1 === numberOfDaysPerWeek) {
          acc.push(
            <TableRow
              key={state?.current?.week + item.date}
              sx={{
                "&:last-child th": { border: 0 },
                height: "150px",
              }}
            >
              {state?.current?.week}
            </TableRow>
          );
          state.current.week = [];
          state.current.numberOfWeek += 1;
        }
        return acc;
      }, []);
    }, [
      className,
      days,
      firstWeekDayOfMonth,
      isSelecting,
      onOpen,
      onOpenCard,
      onSelectDay,
    ]);

    return <>{allDays}</>;
  }
);
