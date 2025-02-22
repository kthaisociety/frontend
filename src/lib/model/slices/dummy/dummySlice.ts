import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DummyState } from "./dummyTypes";

const initialState: DummyState = {
    counter: 0,
    text: "",
    moreText: "",
}

const dummySlice = createSlice({
    name: "dummy",
    initialState,
    reducers: {
        increment: (state) => {
            state.counter += 1;
        },
        decrement: (state) => {
            state.counter -= 1;
        },
        setText: (state, action: PayloadAction<string>) => {
            state.text = action.payload;
        },
        setMoreText: (state, action: PayloadAction<string>) => {
            state.moreText = action.payload;
        },
    },
});

export const { increment, decrement, setText, setMoreText } = dummySlice.actions;
export default dummySlice.reducer;