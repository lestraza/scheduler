import styled from "@emotion/styled";
import {
  Container,
  Paper,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableProps,
  TableRow,
} from "@mui/material";
import { ReactNode } from "react";

const TableWrapper = styled(Stack)`
  &.month {
    height: 100%;
    width: 100%;
  }
`;

export type MonthProps = {
  rows: ReactNode;
  columns: ReactNode;
  label?: string;
} & TableProps;

export const Month = ({ rows, columns, label, className }: MonthProps) => {
  return (
    <TableWrapper className={className}>
      <Container sx={{ textAlign: "center", marginBottom: "8px" }}>
        {label?.toUpperCase()}
      </Container>
      <TableContainer component={Paper}>
        <Table sx={{ minHeight: 250 }} aria-label="simple table">
          <TableHead>
            <TableRow>{columns}</TableRow>
          </TableHead>
          <TableBody>{rows}</TableBody>
        </Table>
      </TableContainer>
    </TableWrapper>
  );
};
