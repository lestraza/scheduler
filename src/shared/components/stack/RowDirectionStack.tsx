import { Stack as MUIStack } from "@mui/material";
import { PropsWithChildren } from "react";

type StackProps = {} & PropsWithChildren;

export const RowDirectionStack = (props: StackProps) => {
  return <MUIStack direction="row">{props.children}</MUIStack>;
};
