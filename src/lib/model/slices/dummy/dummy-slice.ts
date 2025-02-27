import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { dummyState } from "./dummy-types";

export const dummySlice = createSlice({
  name: "dummy",
  initialState: {
    text: "",
    counter: 0,
  } as dummyState,
  reducers: {
    setText: (state, action: PayloadAction<string>) => {
      state.text = action.payload;
    },
    increment: (state) => {
      state.counter += 1;
    },
    decrement: (state) => {
      state.counter -= 1;
    },
  },
});

export const { setText, increment, decrement } = dummySlice.actions;
export const dummyReducer = dummySlice.reducer;
