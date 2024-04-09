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
  period: string;
  description?: string;
};

export type UserEvent = {
  id: string;
  name: string;
  date: string;
  period: string;
  description?: string;
};

export type Day = {
  date: string;
  isWeekend?: boolean;
  isHoliday?: boolean;
  isSelected?: boolean;
  weekday: Weekdays;
  holiday?: Holiday;
  tasks?: Task[];
  events?: UserEvent[];
};

export type Month = Day[];

export type Year = Month[];
