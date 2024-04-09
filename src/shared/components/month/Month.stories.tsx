import type { Meta, StoryObj } from "@storybook/react";

import { Month as Component } from "./Month";
import { getDaysOfMonth, getFirstWeekDayOfMonth } from "../../utils/date";
import { Months, Weekdays } from "../../types/dateEnums";
import {
  SchedulerMonthRows,
  SchedulerMonthColumns,
} from "../../../features/scheduler/components";

const year = 2024;
const month = 2;
const months = Object.keys(Months);

const firstWeekDayOfMonth = getFirstWeekDayOfMonth(year, month);
const days = getDaysOfMonth({ year, month });

const rows = (
  <SchedulerMonthRows days={days} firstWeekDayOfMonth={firstWeekDayOfMonth} />
);

const weekdays = Object.keys(Weekdays);

const columns = <SchedulerMonthColumns weekdays={weekdays} />;

const meta = {
  title: "Scheduler/Month",
  component: Component,
  parameters: {
    layout: "centered",
  },

  tags: ["autodocs"],

  argTypes: {},
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Month: Story = {
  args: {
    rows,
    columns,
    label: months[month],
  },
};
