import { Chip, ChipProps } from "@mui/material";
import { useEffect, useState } from "react";
import { EventVariant } from "../../types";

export type BarProps = {
  type?: EventVariant;
  onClick?: () => void;
} & ChipProps;

export const Bar = ({ onClick, type = EventVariant.Event, ...rest }: BarProps) => {
  const [color, setColor] = useState<ChipProps["color"]>("success");

  useEffect(() => {
    if (type === EventVariant.Task) setColor("secondary");
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
