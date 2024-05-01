import { createElement } from "react";
import { icons } from "../../icons/icon";
import { colors } from "@mui/material";

export type IconName = keyof typeof icons;

type IconProps = {
  icon: IconName;
  className?: string;
  rotate?: number;
  fill?: string;
};

export const Icon = ({
  icon,
  className,
  rotate,
  fill = colors.grey[500],
}: IconProps) => {
  return (
    <div
      className={className}
      aria-label={icon}
      role="img"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transform: rotate ? `rotate(${rotate}deg)` : undefined,
        fill,
      }}
    >
      {createElement(icons[icon], {
        style: { width: "100%", height: "100%" },
      })}
    </div>
  );
};
