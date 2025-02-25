import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { dummyState } from "./dummy-types";

export const dummySlice = createSlice({
    name: "dummy",
    initialState: {
        text: "",
        counter: 0,
    } as dummyState,
    reducers: {
        setText: (state, action:PayloadAction<string>) => {
            state.text = action.payload;
        },
        increment: (state) => {
            state.counter++;
        },
        decrement: (state) => {
            state.counter--;
        },
    },
})

export const {setText, increment, decrement} = dummySlice.actions;
export default dummySlice.reducer;