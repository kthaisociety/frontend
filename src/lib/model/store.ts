import {configureStore} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import  dummySlice from './slices/dummy/dummy-slice';

export const makeStore = () =>{
    return configureStore({
        reducer: {
            dummy: dummySlice
        },
        devTools: process.env.NODE_ENV !== 'production',
    })
}

export type RootState = ReturnType<ReturnType<typeof makeStore>['getState']>;
export type AppDispatch = ReturnType<typeof makeStore>['dispatch'];
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type AppStore = ReturnType<typeof makeStore>;