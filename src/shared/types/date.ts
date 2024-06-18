import { HolidayType, Weekdays } from "./dateEnums";
import { EventType } from "./enums";

export type Holiday = {
  id?: string;
  name: string;
  namePL: string;
  type: HolidayType;
};

export type UserEvent = {
  name: string;
  date: string[];
  period: string;
  type: EventType;
  color: string;
  id?: string;
  description?: string;
  user?: string;
};

export type Day = {
  date: string;
  dayNumber: number;
  weekNumber: number;
  dayweekNumber: number;
  isWeekend?: boolean;
  isHoliday?: boolean;
  isSelected?: boolean;
  weekday: Weekdays;
  holiday?: Holiday;
  userEvents?: UserEvent[];
};

export type Week = Day[];

export type Month = Day[];

export type Year = Month[];
