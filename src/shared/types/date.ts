import { Weekdays } from "./dateEnums";

type Holiday = {
  name: string;
  namePL: string;
};

export type Day = {
  date: string;
  isWeekend?: boolean;
  isHoliday?: boolean;
  isSelected?: boolean;
  weekday: Weekdays;
  holiday?: Holiday;
};

export type Month = Day[];

export type Year = Month[];
