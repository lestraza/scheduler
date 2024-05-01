import { MenuOption } from "../components";
import { EventType, Months, Weekdays } from "../types";
import { EventProps } from "../types/events";

export const numberOfDaysPerWeek = 7;

export const weekdaysList = Object.keys(Weekdays);

export const monthsList = Object.keys(Months);

export const dbName = "scheduler";

export const newEventMenuOptions = [
  { label: "Vacation", value: "vacation", icon: "Vacation" },
  { label: "Day Off", value: "dayOff", icon: "Sick" },
] as MenuOption[];

export const eventSchema: EventProps[] = [
  {
    color: "#80deea",
    type: EventType.Event,
  },
  {
    color: "#d1c4e9",
    type: EventType.Task,
  },
  {
    color: "#c5e1a5",
    type: EventType.Holiday,
  },
  {
    color: "#ffd54f",
    type: EventType.DayOff,
  },
];

export const eventTypeList = eventSchema.map((item) => item.type);
