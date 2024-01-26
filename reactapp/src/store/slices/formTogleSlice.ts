import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store"

interface ToggleState {
    value: boolean
}

const initialState: ToggleState = {
    value: false,
}

export const formToggleSlice = createSlice({
    name: 'isSuccessForm',
    initialState: initialState,
    reducers: {
        formToggle: (state) => {
            state.value = !state.value
        }
    }
})


export const { formToggle } = formToggleSlice.actions

export const insertTogleSelector = (state: RootState) => state.isSuccessForm.value

export default formToggleSlice.reducer