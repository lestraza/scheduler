import type { StoryObj } from "@storybook/react";

import { EventChip as Component } from "./EventChip";
import { eventSchema } from "../../constants";

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
  render: () => <Component color={eventSchema[0].color} />,
};
export const Task: Story = {
  render: () => <Component color={eventSchema[1].color} />,
};
