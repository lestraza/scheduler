import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getDaysOfYear } from "../../../shared/utils/date";
import { YearsState } from "./types";
import { CalendarView } from "../../../shared/types";

const initialState: YearsState = {
  year: [],
  currentYear: new Date().getFullYear(),
  displayedYear: new Date().getFullYear(),
  currentMonth: new Date().getMonth(),
  displayedMonth: new Date().getMonth(),
  calendarViewTab: CalendarView.Month,
  shouldUpdateData: true
};

export const yearsSlice = createSlice({
  name: "years",
  initialState,
  reducers: {
    createYear: (state: YearsState, action: PayloadAction<number>) => {
      const year = getDaysOfYear();
      state.year = year;
    },
    setDispayedYear: (state: YearsState, action: PayloadAction<number>) => {
      state.displayedYear = action.payload;
    },
    setDisplayedMonth: (state: YearsState, action: PayloadAction<number>) => {
      state.displayedMonth = action.payload;
    },
    setCalendarViewTab: (
      state: YearsState,
      action: PayloadAction<CalendarView>
    ) => {
      state.calendarViewTab = action.payload;
    },
    setShouldUpdateData: (state: YearsState, action: PayloadAction<boolean>) => {
      state.shouldUpdateData = action.payload;
    },
  },
});

export const { createYear } = yearsSlice.actions;

export default yearsSlice.reducer;
