import type { StoryObj } from "@storybook/react";

import { Bar as Component } from "./Bar";
import { EventType } from "../../types";
import { eventSchema } from "../../constants";

const meta = {
  title: "Scheduler/Bar",
  component: Component,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Component>;

export const Holiday: Story = {
  render: () => (
    <Component
      type={EventType.Holiday}
      color={eventSchema[2].color}
      label="Orthodox Easter"
    />
  ),
};
export const Event: Story = {
  render: () => (
    <Component
      type={EventType.Event}
      color={eventSchema[0].color}
      label="meeting with John"
    />
  ),
};
export const Task: Story = {
  render: () => (
    <Component
      label="workout with James"
      type={EventType.Task}
      color={eventSchema[1].color}
    />
  ),
};
