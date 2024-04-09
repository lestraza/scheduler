import { Chip, ChipProps, colors } from "@mui/material";
import { SyntheticEvent } from "react";
import { EventVariant } from "../../types";
import { ReactComponent as TaskIcon } from "../../../shared/icons/task.svg";
import styled from "@emotion/styled";

export type BarProps = {
  type?: EventVariant;
  onClick?: () => void;
} & ChipProps;

const CustomChip = styled(Chip)`
  border-radius: 4px;
  height: 22px;
  font-size: 0.75rem;
  margin-bottom: 2px;
  max-width: 150px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  justify-content: flex-start;
  & .MuiChip-icon {
    width: 14px;
    height: 14px;
    min-height: 14px;
    min-width: 14px;
    fill: ${colors.grey[400]};
  }
`;

export const Bar = ({
  onClick,
  type = EventVariant.Holiday,
  ...rest
}: BarProps) => {
  const onHandleOnClick = (event: SyntheticEvent) => {
    event.stopPropagation();
    onClick?.();
  };

  return (
    <CustomChip
      onClick={onHandleOnClick}
      {...rest}
      color={type}
      icon={type === EventVariant.Task ? <TaskIcon /> : undefined}
    />
  );
};
