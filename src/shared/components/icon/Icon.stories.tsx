import type { StoryObj } from "@storybook/react";

import { Icon as Component } from "./Icon";

const meta = {
  title: "Scheduler/Icon",
  component: Component,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Component>;

export const Icon: Story = {
  args: {
    icon: "Close",
  },
};
