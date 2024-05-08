import type { StoryObj } from "@storybook/react";

import { ConfirmAlert as Component } from "./ConfirmAlert";
import { useToggle } from "../../hooks";
import { Card, IconButton, Typography } from "@mui/material";
import { Icon } from "../icon";

const meta = {
  title: "Scheduler/ConfirmAlert",
  component: Component,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Component>;

const text = "Are you sure you want to delete this event?";

const ComponentWithHooks = () => {
  const { open, setOpen } = useToggle();
  return (
    <>
      <Card
        sx={{
          padding: "24px",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <Typography> Press to open ConfirmAlert</Typography>
        <IconButton sx={{ borderRadius: "6px" }} onClick={() => setOpen(true)}>
          <Icon icon="Delete" />
        </IconButton>
      </Card>
      <Component
        open={open}
        setOpen={setOpen}
        text={text}
        onConfirm={() => setOpen(false)}
      />
    </>
  );
};

export const ConfirmAlert: Story = {
  render: () => <ComponentWithHooks />,
};
