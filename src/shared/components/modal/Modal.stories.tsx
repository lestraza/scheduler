import type { StoryObj } from "@storybook/react";

import { Modal as Component } from "./Modal";
import { useToggle } from "../../hooks";
import { Button } from "@mui/material";

const meta = {
  title: "Scheduler/Modal",
  component: Component,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Component>;

const ComponentWithHooks = () => {
  const { open, setOpen } = useToggle();
  return (
    <>
      <Button variant="outlined" onClick={() => setOpen(true)}>
        Open dialog
      </Button>
      <Component open={open} onClose={() => setOpen(false)}>
        Hello World
      </Component>
    </>
  );
};

export const Modal: Story = {
  render: () => <ComponentWithHooks />,
};
