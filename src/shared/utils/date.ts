import { numberOfDaysPerWeek } from "../constants";

export const getDaysOfMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

export const getFirstWeekDayOfMonth = (year: number, month: number) => {
  const startDay = new Date(year, month, 1);
  return startDay.getDay() || numberOfDaysPerWeek;
};
