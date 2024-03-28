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

export const Event: Story = {
  render: () => (
    <Component variant="filled" color="success" label="Orthodox Easter" />
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
