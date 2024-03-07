import type { Meta, StoryObj } from "@storybook/react";

import { Month as Component } from "./Month";
import { getDaysOfMonth, getFirstWeekDayOfMonth } from "../../utils/date";
import {
  createMonthTableColumns,
  fillMonthDays,
  getEmptyDays,
} from "../../utils/dateTable";
import { Months, Weekdays } from "../../types/dateEnums";

const year = 2024;
const month = 5;
const months = Object.keys(Months);

const firstWeekDayOfMonth = getFirstWeekDayOfMonth(year, month);
const days = getDaysOfMonth(year, month);

const emptyDays = getEmptyDays(firstWeekDayOfMonth);
const rows = fillMonthDays(emptyDays, days);

const weekdays = Object.keys(Weekdays);

const columns = createMonthTableColumns(weekdays);

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
