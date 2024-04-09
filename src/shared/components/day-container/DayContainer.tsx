import styled from "@emotion/styled";
import {
  Stack as MUIStack,
  StackProps,
  TableCell,
  colors,
} from "@mui/material";
import { PropsWithChildren, SyntheticEvent } from "react";
import { Day } from "../../types";

type CustomStackProps = {
  day?: Day;
  id?: string;
  isColumn?: boolean;
  onClick?: (day: Day) => void;
} & PropsWithChildren &
  StackProps;

const CustomStack = styled(MUIStack)`
  cursor: pointer;
  font-size: 0.725rem;
  align-items: center;
  color: ${colors.grey[600]};
  gap: 8px;
  font-weight: 300;
  position: relative;
  &.year {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    &:hover {
      background-color: rgb(241, 243, 244);
    }
  }
  &.month {
    min-height: 5rem;
    font-size: 0.825rem;
  }
`;

const CustomTableCell = styled(TableCell)`
  padding: 8px;
  border: 1px solid rgba(224, 224, 224, 1);
  width: 14%;
  &.column {
    border: none;
    & .MuiStack-root {
      font-size: 0.8rem;
      font-weight: bold;
      cursor: unset;
    }
  }
`;
export const DayContainer = ({
  children,
  id,
  day,
  isColumn = false,
  onClick,
  ...rest
}: CustomStackProps) => {
  const onHandleClick = (event: SyntheticEvent) => {
    event.stopPropagation();
    if (onClick && day) onClick?.(day);
  };
  return (
    <CustomTableCell
      className={isColumn ? "column" : ""}
      onClick={onHandleClick}
    >
      <CustomStack {...rest}>{children}</CustomStack>
    </CustomTableCell>
  );
};
