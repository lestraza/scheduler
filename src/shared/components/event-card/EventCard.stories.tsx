import type { StoryObj } from "@storybook/react";

import { EventCard as Component } from "./EventCard";

const meta = {
  title: "Scheduler/EventCard",
  component: Component,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Component>;

export const EventCard: Story = {
  args: {
    //date: new Date(),
  },
};
