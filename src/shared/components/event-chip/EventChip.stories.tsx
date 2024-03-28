import type { StoryObj } from "@storybook/react";

import { EventChip as Component } from "./EventChip";
import { EventVariant } from "../../types";

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
  render: () => <Component type={EventVariant.Event} />,
};
export const Task: Story = {
  render: () => <Component type={EventVariant.Task} />,
};
