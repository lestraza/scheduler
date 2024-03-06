import { numberOfDaysPerWeek } from "../constants";
import { Day, Month, Year } from "../types";
import { Months, Weekdays } from "../types/dateEnums";
import {
  isHoliday as checkIfHoliday,
  getHolidayOnDate,
} from "poland-public-holidays";

export const getDaysOfMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

export const getFirstWeekDayOfMonth = (year: number, month: number) => {
  const startDay = new Date(year, month, 1);
  return startDay.getDay() || numberOfDaysPerWeek;
};

export const getDaysOfYear = () => {
  const date = new Date();
  const year = date.getFullYear();

  const weeks = Object.keys(Weekdays);

  let month: Month = [];

  const calendar = Object.keys(Months).reduce((acc: Year, _, index) => {
    const days = getDaysOfMonth(year, index);
    for (let i = 1; i <= days; i++) {
      const date = new Date(year, index, i);
      const isHoliday = checkIfHoliday(date);
      const dayweekNumber = date.getDay();
      const day: Day = {
        date: date.toISOString(),
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
      month.push(day);
      if (i === days) {
        acc.push(month);
        month = [];
      }
    }
    return acc;
  }, []);
  return calendar;
};
