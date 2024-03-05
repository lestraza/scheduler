import type { Meta, StoryObj } from "@storybook/react";

import { Month as Component } from "./Month";
import { getDaysOfMonth, getFirstWeekDayOfMonth } from "../../utils/date";
import { fillMonthDays, getEmptyDays } from "../../utils/dateTable";

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth();

const daysOfMonth = getDaysOfMonth(year, month);
const firstWeekDayOfMonth = getFirstWeekDayOfMonth(year, month);

const emptyDays = getEmptyDays(firstWeekDayOfMonth);
const rows = fillMonthDays(emptyDays, daysOfMonth, month);

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
  },
};
