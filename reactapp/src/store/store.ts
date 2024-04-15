import { configureStore } from '@reduxjs/toolkit'
import toggleSlice from './slices/toggleSlice';
import formToggleSlice from './slices/formToggleSlice';
import loginSlice from './slices/loginSlice';

export const store =  configureStore({
    reducer: {
        isSuccess: toggleSlice,
        isSuccessForm: formToggleSlice,     
        isLoggedIn: loginSlice
    }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
