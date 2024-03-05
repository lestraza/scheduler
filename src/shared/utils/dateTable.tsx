import { TableCell, TableRow } from "@mui/material";
import { numberOfDaysPerWeek } from "../constants";
import { ReactNode } from "react";
import { DayContainer } from "../components/day-container";

export const getEmptyDays = (dayOfWeek: number) => {
  return [...new Array(numberOfDaysPerWeek)].reduce((acc, _, index) => {
    index < dayOfWeek && acc.push("");
    return acc;
  }, []);
};

const createListOfDays = (days: number) => {
  return new Array(days).fill("_").map((_, index) => (index + 1).toString());
};

export const fillMonthDays = (
  emptyDays: string[],
  days: number,
  month: number
) => {
  const listOfDays = createListOfDays(days);

  let counter = 0;
  let numberOfWeek = 1;
  let week: ReactNode[] = [];

  emptyDays.forEach((_, index) => {
    week.push(
      <DayContainer
        id={(index * 30).toString()}
        sx={{ cursor: "unset" }}
      ></DayContainer>
    );
    counter += 1;
  });

  const allDays: ReactNode[] = listOfDays.reduce(
    (acc: ReactNode[], item, index) => {
      if (counter < numberOfDaysPerWeek) {
        week.push(
          <DayContainer className="day" id={item + "/" + month.toString()}>
            {item}
          </DayContainer>
        );
        counter += 1;

        if (index + 1 === days) {
          [...new Array(numberOfDaysPerWeek - 1 - counter)].forEach((_, i) => {
            week.push(
              <TableCell
                key={index + i + 1}
                sx={{ padding: "8px" }}
              ></TableCell>
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
      } else {
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
    },
    []
  );
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
