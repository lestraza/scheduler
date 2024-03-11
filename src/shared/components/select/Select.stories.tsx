import { useState } from "react";
import type { StoryObj } from "@storybook/react";

import { Select as Component } from "./Select";
import { CalendarView } from "../../types/dateEnums";
import { MenuItem } from "@mui/material";

const options = Object.keys(CalendarView).map((key) => {
  return (
    <MenuItem value={key} key={key}>
      {key}
    </MenuItem>
  );
});

const meta = {
  title: "Scheduler/Select",
  component: Component,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Component>;

const SelectWithHooks = () => {
  const [value, setValue] = useState<CalendarView>(CalendarView.Month);
  return (
    <Component
      variant="standard"
      value={value}
      onSelectOption={(value) => setValue(value as CalendarView)}
    >
      {options}
    </Component>
  );
};

export const Select: Story = {
  render: () => <SelectWithHooks />,
};
