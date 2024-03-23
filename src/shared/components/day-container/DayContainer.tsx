import styled from "@emotion/styled";
import {
  Stack as MUIStack,
  StackProps,
  TableCell,
  colors,
} from "@mui/material";
import { PropsWithChildren } from "react";
import { Day } from "../../types";

type CustomStackProps = {
  id?: string;
  day?: Day;
  onClick?: (id: string) => void;
} & PropsWithChildren &
  StackProps;

export const CustomStack = styled(MUIStack)`
  cursor: pointer;
  font-size: 0.725rem;
  align-items: center;
  color: ${colors.grey[400]};
  gap: 8px;
  font-weight: 300;
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
export const DayContainer = ({
  children,
  id,
  day,
  onClick,
  ...rest
}: CustomStackProps) => {
  const onHandleClick = () => {
    onClick?.(id || "");
  };
  return (
    <TableCell sx={{ padding: "8px" }} width="14%" onClick={onHandleClick}>
      <CustomStack {...rest}>{children}</CustomStack>
    </TableCell>
  );
};
