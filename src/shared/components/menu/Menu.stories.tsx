import type { StoryObj } from "@storybook/react";

import { Menu as Component } from "./Menu";

const meta = {
  title: "Scheduler/Menu",
  component: Component,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Component>;

export const Menu: Story = {
  args: {
    options: [
      { label: "vaction", value: "vacation", icon: "Vacation" },
      { label: "day off", value: "dayOff", icon: "Sick" },
    ],
  },
};
