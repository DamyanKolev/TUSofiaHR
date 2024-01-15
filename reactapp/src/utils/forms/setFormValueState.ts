import { FormFieldState } from "@models/FormStates/FormState";
import { ValueState } from "@ui5/webcomponents-react";
import { Dispatch, SetStateAction } from "react";

export function setFormValueState<T>(formState: T, setFormState: Dispatch<SetStateAction<T>>, valueState: ValueState): void {
    let currentState = formState
    let key: keyof typeof formState
    for (key in formState) {
        const fieldState = formState[key] as FormFieldState

        if (!fieldState.isFilled) {
            currentState = { ...currentState, [key]: { ...fieldState, "valueState": valueState } }
        }
    }
    setFormState(currentState);
};