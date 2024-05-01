import { monthsList, weekdaysList } from "../constants";
import { Day, Month, UserEvent, Year } from "../types/date";
import { HolidayType, Weekdays } from "../types/dateEnums";
import {
  isHoliday as checkIfHoliday,
  getHolidayOnDate,
} from "poland-public-holidays";

type GetDaysOfMonthProps = {
  year: number;
  month: number;
  userEvents?: UserEvent[];
};

export const getNumberDaysOfMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

export const getFirstWeekDayOfMonth = (year: number, month: number) => {
  const startDay = new Date(year, month, 1);
  return startDay.getDay();
};

export const getDaysOfMonth = ({
  year,
  month,
  userEvents = [],
}: GetDaysOfMonthProps) => {
  const d = new Date(year, month, 1);
  const timeZoneOffset = d.getTimezoneOffset() * 60 * 1000;
  const days = getNumberDaysOfMonth(year, month);

  let res: Month = [];
  let weekNumber = 0;
  for (let i = 1; i <= days; i++) {
    const date = new Date(year, month, i);

    const isHoliday = checkIfHoliday(date);
    const dayweekNumber = date.getDay();
    if (dayweekNumber === 0) {
      weekNumber += 1;
    }
    const day: Day = {
      date: new Date((date as unknown as number) - timeZoneOffset)
        .toISOString()
        .slice(0, -1),
      weekNumber,
      dayweekNumber,
      dayNumber: date.getDate(),
      isSelected: false,
      weekday: weekdaysList[dayweekNumber] as Weekdays,
      isWeekend: dayweekNumber < 1 || dayweekNumber > 5,
      isHoliday: isHoliday,
    };
    day.userEvents = userEvents.filter(({ date }) => date.includes(day.date));
    if (isHoliday) {
      const holiday = getHolidayOnDate(date);
      day.holiday = {
        type: HolidayType.Public,
        name: holiday?.name || "",
        namePL: holiday?.namePL || "",
      };
    }
    res.push(day);
  }
  return res;
};

export const dateToISOSting = (date: Date) => {
  const month = date.getMonth();
  const year = date.getFullYear();
  const d = new Date(year, month, 1);
  const timeZoneOffset = d.getTimezoneOffset() * 60 * 1000;
  return new Date((date as unknown as number) - timeZoneOffset)
    .toISOString()
    .slice(0, -1);
};

export const getDaysOfYear = () => {
  const date = new Date();
  const year = date.getFullYear();

  const calendar = monthsList.reduce((acc: Year, _, index) => {
    const month = getDaysOfMonth({ year, month: index });
    acc.push(month);
    return acc;
  }, []);
  return calendar;
};

export const createTimePeriodOptions = () => {
  return [...new Array(24)].reduce((acc: string[], _, index) => {
    let hour = index < 10 ? "0" + index.toString() : index.toString();

    acc.push(`${hour} : 00`);
    acc.push(`${hour} : 15`);
    acc.push(`${hour} : 30`);
    acc.push(`${hour} : 45`);
    return acc;
  }, []);
};
