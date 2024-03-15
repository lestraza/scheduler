import React, { ReactNode, useMemo, useRef } from "react";
import { TableCell, TableRow } from "@mui/material";
import { Day } from "../../../shared/types";
import { numberOfDaysPerWeek } from "../../../shared/constants";
import { DayContainer } from "../../../shared/components/day-container";

type Props = {
  days: Day[];
  firstWeekDayOfMonth: number;
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
  ({ days, firstWeekDayOfMonth }: Props) => {
    const state = useRef(initialState);

    const allDays = useMemo(() => {
      [...new Array(numberOfDaysPerWeek)].forEach((_, index) => {
        if (index < firstWeekDayOfMonth) {
          state?.current?.week.push(<TableCell key={index * 60}></TableCell>);
          state.current.counter += 1;
        }
      });

      return days?.reduce((acc: ReactNode[], item, index) => {
        if (state?.current?.counter < numberOfDaysPerWeek) {
          state?.current?.week.push(
            <DayContainer className="day" id={item.date}>
              {new Date(item.date).getDate()}
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
                  sx={{ padding: "8px" }}
                ></TableCell>
              );
            });

            acc.push(
              <TableRow
                key={state.current.numberOfWeek + item.date}
                sx={{
                  "&:last-child td, &:last-child th": {
                    border: 0,
                  },
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
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
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
    }, [days, firstWeekDayOfMonth]);

    return <>{allDays}</>;
  }
);
