import type { StoryObj } from "@storybook/react";

import { TaskCard as Component } from "./TaskCard";

const meta = {
  title: "Scheduler/TaskCard",
  component: Component,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Component>;

export const TaskCard: Story = {
    args: {
        date: new Date()
    }
};
