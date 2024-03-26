import type { StoryObj } from "@storybook/react";

import { HolidayCard as Component } from "./HolidayCard";
import { Weekdays } from "../../types";

const day = {
  date: "2024-04-01T00:00:00.000",
  isSelected: false,
  weekday: Weekdays.Monday,
  isWeekend: false,
  isHoliday: true,
  holiday: {
    name: "Easter Monday",
    namePL: "Poniedziałek Wielkanocny",
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
