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
import { CalendarView, IncDec } from "../../../shared/types";
import { monthsList } from "../../../shared/constants";

const StyledMenuIcon = styled(MenuIcon)`
  fill: ${colors.grey.main};
`;

const IconButton = styled(MUIIconButton)`
  min-width: 48px;
`;

export const MainHeader = () => {
  const dispatch = useDispatch();
  const { calendarViewTab, displayedMonth, displayedYear } = useAppSelector(
    (state) => state.yearsReducer
  );

  const onSetCalendarViewTab = useCallback(
    (value: string) => {
      dispatch(yearsSlice.actions.setCalendarViewTab(value as CalendarView));
    },
    [dispatch]
  );

  const onSetDisplayedMonth = (value: IncDec) => {
    if (value === IncDec.Inc) {
      const month = displayedMonth === 11 ? 0 : displayedMonth + 1;
      dispatch(yearsSlice.actions.setDisplayedMonth(month));
      if (month === 0) {
        dispatch(yearsSlice.actions.setDispayedYear(displayedYear + 1));
      }
    } else {
      const month = displayedMonth === 0 ? 11 : displayedMonth - 1;
      dispatch(yearsSlice.actions.setDisplayedMonth(month));
      if (month === 11) {
        dispatch(yearsSlice.actions.setDispayedYear(displayedYear - 1));
      }
    }
  };

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
      <Stack alignSelf="center">{displayedYear}</Stack>
      <Stack direction="row">
        <Select
          onSelectOption={onSetCalendarViewTab}
          variant="standard"
          value={calendarViewTab}
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
      {calendarViewTab === CalendarView.Month ? (
        <Stack direction="row" minWidth="80px">
          <IconButton onClick={() => onSetDisplayedMonth(IncDec.Dec)}>
            <ChevronLeftIcon fill={colors.grey.main} />
          </IconButton>
          <Stack minWidth="120px" alignSelf="center">
            {monthsList[displayedMonth]}
          </Stack>
          <IconButton onClick={() => onSetDisplayedMonth(IncDec.Inc)}>
            <ChevronRightIcon fill={colors.grey.main} />
          </IconButton>
        </Stack>
      ) : null}
    </Header>
  );
};
