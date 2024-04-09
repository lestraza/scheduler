import React, { ReactNode, useMemo, useRef } from "react";
import { Stack, TableCell, TableRow } from "@mui/material";
import { Day, EventVariant } from "../../../shared/types";
import { numberOfDaysPerWeek } from "../../../shared/constants";
import { DayContainer } from "../../../shared/components/day-container";
import { Bar } from "../../../shared/components";

type Props = {
  days: Day[];
  firstWeekDayOfMonth: number;
  className?: string;
  onOpen?: (day: Day, EventVariant: EventVariant) => void;
  onOpenHolidayCard?: (day: Day) => void;
};
type StateProps = {
  counter: number;
  week: ReactNode[];
  numberOfWeek: number;
};
const initialState: StateProps = {
  counter: 0,
  week: [],
  numberOfWeek: 1,
};

export const SchedulerMonthRows = React.memo(
  ({
    days,
    firstWeekDayOfMonth,
    className = "year",
    onOpen,
    onOpenHolidayCard,
  }: Props) => {
    const state = useRef(initialState);

    const allDays = useMemo(() => {
      [...new Array(numberOfDaysPerWeek)].forEach((_, index) => {
        if (index < firstWeekDayOfMonth) {
          state?.current?.week.push(
            <TableCell
              key={index * 60}
              sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}
            ></TableCell>
          );
          state.current.counter += 1;
        }
      });

      return days?.reduce((acc: ReactNode[], item, index) => {
        if (state?.current?.counter < numberOfDaysPerWeek) {
          //const type = item.isHoliday ? EventVariant.Holiday : EventVariant.Task;

          const onBarClick = () => {
            onOpen?.(item, EventVariant.Holiday);
          };

          state?.current?.week.push(
            <DayContainer
              className={className}
              id={item.date}
              day={item}
              onClick={onBarClick}
            >
              <Stack>{new Date(item.date).getDate()}</Stack>
              {className === "month" && item.isHoliday ? (
                <Stack>
                  <Bar
                    label={item.holiday?.name}
                    type={EventVariant.Holiday}
                    onClick={() => onOpenHolidayCard?.(item)}
                  />
                </Stack>
              ) : null}
              {className === "month" && item.tasks?.length ? (
                <Stack>
                  {item.tasks.map((task) => (
                    <Bar
                      label={task.name}
                      type={EventVariant.Task}
                      onClick={() => onOpenHolidayCard?.(item)}
                    />
                  ))}
                </Stack>
              ) : null}
            </DayContainer>
          );

          state.current.counter += 1;
          if (
            index + 1 === days.length &&
            numberOfDaysPerWeek > state?.current?.counter
          ) {
            [
              ...new Array(numberOfDaysPerWeek - 1 - state?.current?.counter),
            ].forEach((_, i) => {
              state?.current?.week.push(
                <TableCell
                  key={index * i + 15}
                  sx={{
                    padding: "8px",
                    border: "1px solid rgba(224, 224, 224, 1)",
                  }}
                ></TableCell>
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
            state.current.counter = 0;
          }
        }
        if (state.current.counter === numberOfDaysPerWeek) {
          acc.push(
            <TableRow
              key={state?.current?.week + item.date}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                height: "150px",
              }}
            >
              {state?.current?.week}
            </TableRow>
          );
          state.current.week = [];
          state.current.numberOfWeek += 1;
          state.current.counter = 0;
        }
        return acc;
      }, []);
    }, [className, days, firstWeekDayOfMonth, onOpen, onOpenHolidayCard]);

    return <>{allDays}</>;
  }
);
