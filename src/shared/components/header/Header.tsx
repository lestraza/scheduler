import styled from "@emotion/styled";
import { Stack } from "@mui/material";
import { PropsWithChildren } from "react";

export type HeaderProps = {} & PropsWithChildren;

const HeaderWrapper = styled(Stack)`
  height: 64px;
  padding: 8px;
  flex-grow: 1;
  gap: 40px;
`;

export const Header = ({ children }: HeaderProps) => {
  return <HeaderWrapper direction="row">{children}</HeaderWrapper>;
};
