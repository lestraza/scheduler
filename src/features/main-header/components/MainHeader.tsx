import { useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  IconButton as MUIIconButton,
  MenuItem,
  Stack,
} from "@mui/material";
import styled from "@emotion/styled";
import { Select, Header } from "../../../shared/components";
import { ReactComponent as MenuIcon } from "../../../shared/icons/menu.svg";
import { ReactComponent as ChevronLeftIcon } from "../../../shared/icons/chevron_left.svg";
import { ReactComponent as ChevronRightIcon } from "../../../shared/icons/chevron_right.svg";
import { colors } from "../../../shared/styles";

import { useAppSelector, yearsSlice } from "../../scheduler/store";
import { CalendarView } from "../../../shared/types";

const StyledMenuIcon = styled(MenuIcon)`
  fill: ${colors.grey.main};
`;

const IconButton = styled(MUIIconButton)`
  min-width: 48px;
`;

export const MainHeader = () => {
  const dispatch = useDispatch();
  const tab = useAppSelector((state) => state.yearsReducer.calendarViewTab);
  const currentYear = useAppSelector((state) => state.yearsReducer.currentYear);

  const onSetCalendarViewTab = useCallback(
    (value: string) => {
      dispatch(yearsSlice.actions.setCalendarViewTab(value as CalendarView));
    },
    [dispatch]
  );

  return (
    <Header>
      <Stack direction="row" gap="8px">
        <IconButton>
          <StyledMenuIcon />
        </IconButton>
        <Stack alignSelf="center" fontSize="1.2rem">
          Calendar
        </Stack>
      </Stack>
      <Stack direction="row">
        <Button variant="text">Today</Button>
        <Stack direction="row" minWidth="80px">
          <IconButton>
            <ChevronLeftIcon fill={colors.grey.main} />
          </IconButton>
          <IconButton>
            <ChevronRightIcon fill={colors.grey.main} />
          </IconButton>
        </Stack>
      </Stack>
      <Stack alignSelf="center">{currentYear}</Stack>
      <Stack direction="row">
        <Select
          onSelectOption={onSetCalendarViewTab}
          variant="standard"
          value={tab}
        >
          {Object.keys(CalendarView).map((key) => {
            return (
              <MenuItem value={key} key={key}>
                {key}
              </MenuItem>
            );
          })}
        </Select>
      </Stack>
    </Header>
  );
};
