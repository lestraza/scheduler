import { Chip, ChipProps } from "@mui/material";
import { useEffect, useState } from "react";

export type BarProps = {
  type?: "event" | "task";
} & ChipProps;

export const Bar = ({ onClick, type = "event", ...rest }: BarProps) => {
  const [color, setColor] = useState<ChipProps["color"]>("success");

  useEffect(() => {
    if (type === "task") setColor("secondary");
  }, [type]);

  const onHandleClick = () => {};
  return (
    <Chip
      onClick={onHandleClick}
      {...rest}
      color={color}
      sx={{ borderRadius: "4px", height: "24px", fontSize: "0.7500rem" }}
    />
  );
};
