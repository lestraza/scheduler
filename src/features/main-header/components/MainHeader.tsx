import {
  Button,
  IconButton as MUIIconButton,
  MenuItem,
  Stack,
} from "@mui/material";
import { Header } from "../../../shared/components/header/Header";
import { ReactComponent as MenuIcon } from "../../../shared/icons/menu.svg";
import { ReactComponent as ChevronLeftIcon } from "../../../shared/icons/chevron_left.svg";
import { ReactComponent as ChevronRightIcon } from "../../../shared/icons/chevron_right.svg";
import { colors } from "../../../shared/styles";
import styled from "@emotion/styled";

import { useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector, yearsSlice } from "../../scheduler/store";
import { CalendarView } from "../../../shared/types";
import { Select } from "../../../shared/components/select/Select";

const StyledMenuIcon = styled(MenuIcon)`
  fill: ${() => colors.grey.main};
`;

const IconButton = styled(MUIIconButton)`
  min-width: 48px;
`;

export const MainHeader = () => {
  const dispatch = useDispatch();
  const tab = useAppSelector((state) => state.yearsReducer.calendarViewTab);

  const onSetCalendarViewTab = useCallback(
    (value: string) => {
      dispatch(yearsSlice.actions.setCalendarViewTab(value as CalendarView));
    },
    [dispatch]
  );

  const calendarViewOptions = useMemo(() => {
    return Object.keys(CalendarView).map((key) => {
      return (
        <MenuItem value={key} key={key}>
          {key}
        </MenuItem>
      );
    });
  }, []);

  return (
    <Header>
      <Stack direction="row" gap={"8px"}>
        <IconButton>
          <StyledMenuIcon />
        </IconButton>
        <Stack alignSelf={"center"} fontSize={"1.2rem"}>
          Calendar
        </Stack>
      </Stack>
      <Stack direction="row">
        <Button variant="text">Today</Button>
        <Stack direction={"row"} minWidth={"80px"}>
          <IconButton>
            <ChevronLeftIcon fill={colors.grey.main} />
          </IconButton>
          <IconButton>
            <ChevronRightIcon fill={colors.grey.main} />
          </IconButton>
        </Stack>
      </Stack>
      <Stack alignSelf={"center"}>2024</Stack>
      <Stack direction="row">
        <Select
          onSelectOption={onSetCalendarViewTab}
          variant="standard"
          value={tab}
        >
          {calendarViewOptions}
        </Select>
      </Stack>
    </Header>
  );
};
