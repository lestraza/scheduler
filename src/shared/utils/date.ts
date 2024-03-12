import { numberOfDaysPerWeek } from "../constants";
import { Day, Month, Year } from "../types";
import { Months, Weekdays } from "../types/dateEnums";
import {
  isHoliday as checkIfHoliday,
  getHolidayOnDate,
} from "poland-public-holidays";

export const getNumberDaysOfMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

export const getFirstWeekDayOfMonth = (year: number, month: number) => {
  const startDay = new Date(year, month, 1);
  return startDay.getDay() || numberOfDaysPerWeek;
};

export const getDaysOfMonth = (year: number, month: number) => {
  const d = new Date(year, month, 1);
  const timeZoneOffset = d.getTimezoneOffset() * 60 * 1000;
  const days = getNumberDaysOfMonth(year, month);

  const weeks = Object.keys(Weekdays);

  let res: Month = [];
  for (let i = 1; i <= days; i++) {
    const date = new Date(year, month, i);

    const isHoliday = checkIfHoliday(date);
    const dayweekNumber = date.getDay();
    const day: Day = {
      date: new Date((date as unknown as number) - timeZoneOffset)
        .toISOString()
        .slice(0, -1),
      isSelected: false,
      weekday: weeks[dayweekNumber] as Weekdays,
      isWeekend: dayweekNumber < 1 || dayweekNumber > 5,
      isHoliday: isHoliday,
    };
    if (isHoliday) {
      const holiday = getHolidayOnDate(date);
      day.holiday = {
        name: holiday?.name || "",
        namePL: holiday?.namePL || "",
      };
    }
    res.push(day);
  }
  return res;
};

export const getDaysOfYear = () => {
  const date = new Date();
  const year = date.getFullYear();

  const calendar = Object.keys(Months)?.reduce((acc: Year, _, index) => {
    const month = getDaysOfMonth(year, index);
    acc.push(month);
    return acc;
  }, []);
  return calendar;
};
