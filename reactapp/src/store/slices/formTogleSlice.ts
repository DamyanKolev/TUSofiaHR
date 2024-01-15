import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store"

interface ToggleState {
    value: boolean
}

const initialState: ToggleState = {
    value: false,
}

export const formTogleSlice = createSlice({
    name: 'isSuccessForm',
    initialState: initialState,
    reducers: {
        formTogle: (state) => {
            state.value = !state.value
        }
    }
})


export const { formTogle } = formTogleSlice.actions

export const insertTogleSelector = (state: RootState) => state.isSuccessForm.value

export default formTogleSlice.reducer