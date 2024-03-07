import { TableCell, TableRow } from "@mui/material";
import { numberOfDaysPerWeek } from "../constants";
import { ReactNode } from "react";
import { DayContainer } from "../components/day-container";
import { Day } from "../types";

export const getEmptyDays = (dayOfWeek: number) => {
  return [...new Array(numberOfDaysPerWeek)].reduce((acc, _, index) => {
    index < dayOfWeek && acc.push("");
    return acc;
  }, []);
};

export const fillMonthDays = (emptyDays: string[], days: Day[]) => {
  let counter = 0;
  let week: ReactNode[] = [];
  let numberOfWeek = 1;

  emptyDays.forEach((_, index) => {
    week.push(<TableCell id={(index * 30).toString()}></TableCell>);
    counter += 1;
  });

  const allDays: ReactNode[] = days?.reduce((acc: ReactNode[], item, index) => {
    if (counter < numberOfDaysPerWeek) {
      week.push(
        <DayContainer className="day" id={item.date}>
          {new Date(item.date).getDate()}
        </DayContainer>
      );

      counter += 1;
      if (index + 1 === days.length && numberOfDaysPerWeek > counter) {
        [...new Array(numberOfDaysPerWeek - 1 - counter)].forEach((_, i) => {
          week.push(
            <TableCell key={index * i + 1} sx={{ padding: "8px" }}></TableCell>
          );
        });

        acc.push(
          <TableRow
            key={numberOfWeek}
            sx={{
              "&:last-child td, &:last-child th": {
                border: 0,
              },
            }}
          >
            {week}
          </TableRow>
        );
      }
    }
    if (counter === numberOfDaysPerWeek) {
      acc.push(
        <TableRow
          key={numberOfWeek}
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
          {week}
        </TableRow>
      );
      week = [];
      numberOfWeek += 1;
      counter = 0;
    }
    return acc;
  }, []);
  return allDays;
};

export const createMonthTableColumns = (arr: string[]) => {
  return arr.map((key) => {
    return (
      <DayContainer sx={{ fontSize: "0.8rem", cursor: "unset" }} id={key}>
        {String(key).charAt(0)}
      </DayContainer>
    );
  });
};
