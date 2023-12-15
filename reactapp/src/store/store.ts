import { configureStore } from '@reduxjs/toolkit'
import toggleSlice from './slices/toggleSlice';

export const store =  configureStore({
    reducer: {
        isSuccess: toggleSlice
    }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
