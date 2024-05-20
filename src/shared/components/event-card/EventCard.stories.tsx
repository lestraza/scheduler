import type { StoryObj } from "@storybook/react";

import { EventCard as Component, EventCardProps } from "./EventCard";
import { EventType, HolidayType, Weekdays } from "../../types";
import { Card } from "@mui/material";

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

const userEvent = {
  id: "1f552986-b0f4-42b3-8707-c3b6ff918264",
  name: "swimpool",
  period: "12 : 15",
  description: "take the swimsuit",
  date: ["2024-05-09T00:00:00.000"],
  type: EventType.Event,
  color: "#80deea",
};
const date = new Date(day.date);
const meta = {
  title: "Scheduler/EventCard",
  component: Component,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Component>;

const EventCardComponent = (props: EventCardProps) => (
  <Card sx={{padding: '24px'}}>
    <Component {...props} />
  </Card>
);

export const Holiday: Story = {
  render: () => (
    <EventCardComponent
      day={day}
      date={date}
      onHandleEdit={() => {}}
      onHandleDelete={() => {}}
    />
  ),
};

export const Event: Story = {
  render: () => (
    <EventCardComponent
      day={day}
      date={date}
      userEvent={userEvent}
      onHandleEdit={() => {}}
      onHandleDelete={() => {}}
    />
  ),
};
