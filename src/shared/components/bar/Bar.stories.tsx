import type { StoryObj } from "@storybook/react";

import { Bar as Component } from "./Bar";
import { EventVariant } from "../../types";

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
      variant="filled"
      type={EventVariant.Holiday}
      label="Orthodox Easter"
    />
  ),
};
export const Event: Story = {
  render: () => (
    <Component
      variant="filled"
      type={EventVariant.Event}
      label="meeting with John"
    />
  ),
};
export const Task: Story = {
  render: () => (
    <Component
      variant="filled"
      label="workout with James"
      type={EventVariant.Task}
    />
  ),
};
