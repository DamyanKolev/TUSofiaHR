import { configureStore } from '@reduxjs/toolkit'
import toggleSlice from './slices/toggleSlice';
import formTogleSlice from './slices/formTogleSlice';

export const store =  configureStore({
    reducer: {
        isSuccess: toggleSlice,
        isSuccessForm: formTogleSlice        
    }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
