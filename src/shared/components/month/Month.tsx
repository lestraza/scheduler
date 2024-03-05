import {
  Paper,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { WEEKDAYS } from "../../constants";
import { ReactNode } from "react";
import { createMonthTableColumns } from "../../utils/dateTable";

const columns = createMonthTableColumns(WEEKDAYS);

export type MonthProps = {
  rows: ReactNode[];
};

export const Month = ({ rows }: MonthProps) => {
  return (
    <Stack>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 350, minHeight: 250 }} aria-label="simple table">
          <TableHead>
            <TableRow>{columns}</TableRow>
          </TableHead>
          <TableBody>{rows}</TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};
