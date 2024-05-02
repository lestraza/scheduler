import type { StoryObj } from "@storybook/react";

import { HolidayCard as Component } from "./HolidayCard";
import { HolidayType, Weekdays } from "../../types";

const day = {
  date: "2024-04-01T00:00:00.000",
  isSelected: false,
  dayNumber: 1,
  weekNumber: 0,
  dayweekNumber: 1,
  weekday: Weekdays.Monday,
  isWeekend: false,
  isHoliday: true,
  holiday: {
    name: "Easter Monday",
    namePL: "Poniedziałek Wielkanocny",
    type: HolidayType.Public,
  },
};
const date = new Date(day.date);
const meta = {
  title: "Scheduler/HolidayCard",
  component: Component,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Component>;

export const HolidayCard: Story = {
  args: { day, date },
};
