import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store"

interface ToggleState {
    value: boolean
}

const initialState: ToggleState = {
    value: false,
}

export const toggleSlice = createSlice({
    name: 'isSuccess',
    initialState: initialState,
    reducers: {
        toggle: (state) => {
            state.value = !state.value
        }
    }
})


export const { toggle } = toggleSlice.actions

export const selectToggle = (state: RootState) => state.isSuccess.value

export default toggleSlice.reducer