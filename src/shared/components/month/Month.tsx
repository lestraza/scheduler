import {
  Container,
  Paper,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { ReactNode } from "react";

export type MonthProps = {
  rows: ReactNode[];
  columns: ReactNode[];
  label: string;
};

export const Month = ({ rows, columns, label }: MonthProps) => {
  return (
    <Stack>
      <Container sx={{ textAlign: "center", marginBottom: "8px" }}>
        {label.toUpperCase()}
      </Container>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: "xs", minHeight: 250 }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>{columns}</TableRow>
          </TableHead>
          <TableBody>{rows}</TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};
