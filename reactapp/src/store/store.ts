import { configureStore } from '@reduxjs/toolkit'
import toggleSlice from './slices/toggleSlice';
import formToggleSlice from './slices/formToggleSlice';
import loginSlice from './slices/loginSlice';
import contractSlice from './slices/contractSlice';

export const store =  configureStore({
    reducer: {
        isSuccess: toggleSlice,
        isSuccessForm: formToggleSlice,     
        isLoggedIn: loginSlice,
        selectedContract: contractSlice
    }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
