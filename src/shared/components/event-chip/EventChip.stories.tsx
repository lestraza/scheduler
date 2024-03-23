import type { StoryObj } from "@storybook/react";

import { EventChip as Component } from "./EventChip";
import { EventType } from "../../types";

const meta = {
  title: "Scheduler/EventChip",
  component: Component,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Component>;

export const Event: Story = {
  render: () => <Component type={EventType.Event} />,
};
export const Task: Story = {
  render: () => <Component type={EventType.Task} />,
};
