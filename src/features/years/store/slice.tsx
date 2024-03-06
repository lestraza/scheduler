import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Year } from "../../../shared/types/date";
import { getDaysOfYear } from "../../../shared/utils/date";

export interface YearsState {
  year: Year;
}

const initialState: YearsState = {
  year: [],
};

export const yearsSlice = createSlice({
  name: "years",
  initialState,
  reducers: {
    createYear: (state: YearsState, action: PayloadAction<number>) => {
      const year = getDaysOfYear();
      state.year = year;
    },
  },
});

export const { createYear } = yearsSlice.actions;

export default yearsSlice.reducer;
