import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store"
import { ContractView } from "@/pages/Contracts/models/Views/ContractView"

interface State {
    value: ContractView | undefined
}

const initialState: State = {
    value: undefined,
}

export const contractSlice = createSlice({
    name: 'selectedContract',
    initialState: initialState,
    reducers: {
        setContract: (state, actions) => {
            state.value = actions.payload
        },
        clearContractView: (state) => {
            state.value = undefined;
        },
    }
})


export const { setContract, clearContractView } = contractSlice.actions

export const insertTogleSelector = (state: RootState) => state.selectedContract.value

export default contractSlice.reducer