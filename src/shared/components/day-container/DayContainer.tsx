import styled from "@emotion/styled";
import { Stack as MUIStack, StackProps, TableCell } from "@mui/material";
import { PropsWithChildren } from "react";

type CustomStackProps = {
  id?: string;
  onClick?: (id: string) => void;
} & PropsWithChildren &
  StackProps;

export const CustomStack = styled(MUIStack)`
  cursor: pointer;
  font-size: 0.725rem;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  &.day:hover {
    background-color: rgb(241, 243, 244);
  }
`;
export const DayContainer = ({
  children,
  id,
  onClick,
  ...rest
}: CustomStackProps) => {
  const onHandleClick = () => {
    onClick?.(id || "");
  };
  return (
    <TableCell key={id} sx={{ padding: "8px" }} onClick={onHandleClick}>
      <CustomStack {...rest}>{children}</CustomStack>
    </TableCell>
  );
};
