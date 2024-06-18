import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../../shared/api";

export const getUserEvents = createAsyncThunk(
  "years/getUserEvents",
  async (userId: string, thunkAPI) => {
    const data = await API.getUserEvents(userId);
    return data;
  }
);