import type { StoryObj } from "@storybook/react";

import { DayContainer as Component } from "./DayContainer";
import { Bar } from "../bar";
import { EventType } from "../../types";

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
    <Component>
      <Bar variant="filled" label="workout with James" type={EventType.Task} />
    </Component>
  ),
};
