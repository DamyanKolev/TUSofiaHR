import { configureStore } from '@reduxjs/toolkit'
import toggleSlice from './slices/toggleSlice';
import formToggleSlice from './slices/formToggleSlice';

export const store =  configureStore({
    reducer: {
        isSuccess: toggleSlice,
        isSuccessForm: formToggleSlice        
    }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
