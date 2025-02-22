import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import dummySlice from "./slices/dummy/dummySlice";

// This is where we manage our states 

export const makeStore = () =>{
    return configureStore({
        reducer:{
            // Add reducers here
            dummy: dummySlice,
        }
    })
}

export type RootState = ReturnType<ReturnType<typeof makeStore>["getState"]>;
export type AppDispatch = ReturnType<typeof makeStore>["dispatch"];
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type AppStore = ReturnType<typeof makeStore>;