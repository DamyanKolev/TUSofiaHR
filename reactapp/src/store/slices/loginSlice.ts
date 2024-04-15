import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store"

interface ToggleState {
    value: boolean
}

const initialState: ToggleState = {
    value: false,
}

export const loginSlice = createSlice({
    name: 'isLoggedIn',
    initialState: initialState,
    reducers: {
        loginToggle: (state) => {
            state.value = !state.value
        }
    }
})


export const { loginToggle } = loginSlice.actions

export const insertTogleSelector = (state: RootState) => state.isLoggedIn.value

export default loginSlice.reducer