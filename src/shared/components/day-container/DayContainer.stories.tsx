import type { StoryObj } from "@storybook/react";

import { DayContainer as Component } from "./DayContainer";
import { Bar } from "../bar";
import { EventType, HolidayType, Weekdays } from "../../types";
import { eventSchema } from "../../constants";

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

const meta = {
  title: "Scheduler/DayContainer",
  component: Component,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Component>;

export const DayContainer: Story = {
  render: () => (
    <Component day={day}>
      <Bar
        label="workout with James"
        color={eventSchema[2].color}
        type={EventType.Holiday}
      />
    </Component>
  ),
};
