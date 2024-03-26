import { Chip, ChipProps } from "@mui/material";
import { useEffect, useState } from "react";
import { EventType } from "../../types";

export type BarProps = {
  type?: EventType;
  onClick?: () => void;
} & ChipProps;

export const Bar = ({ onClick, type = EventType.Event, ...rest }: BarProps) => {
  const [color, setColor] = useState<ChipProps["color"]>("success");

  useEffect(() => {
    if (type === EventType.Task) setColor("secondary");
  }, [type]);

  return (
    <Chip
      onClick={onClick}
      {...rest}
      color={color}
      sx={{ borderRadius: "4px", height: "24px", fontSize: "0.7500rem" }}
    />
  );
};
