import { HolidayType, Weekdays } from "./dateEnums";

export type Holiday = {
  id?: string;
  name: string;
  namePL: string;
  type: HolidayType;
};

export type Task = {
  id: string;
  name: string;
  date: string;
};

export type Day = {
  date: string;
  isWeekend?: boolean;
  isHoliday?: boolean;
  isSelected?: boolean;
  weekday: Weekdays;
  holiday?: Holiday;
  tasks?: Task[];
};

export type Month = Day[];

export type Year = Month[];
