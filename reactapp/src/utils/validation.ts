import { FormFieldState, FormState } from "@models/FormStates/FormState";
import { ValueState } from "@ui5/webcomponents-react";
import { setFormValueState } from "./forms/setFormValueState";
import { Dispatch, SetStateAction } from "react";

export function isFilledForm<T extends FormState>(
    formState: T,
    setFormState: Dispatch<SetStateAction<T>>,
): boolean {
    let isFilled: boolean = true;
    let key: keyof typeof formState
    for (key in formState) {
        const fieldState = formState[key] as FormFieldState

        if (!fieldState.isFilled) {
            isFilled = false;
        }
    }

    if (!isFilled) {
        setFormValueState<T>(formState, setFormState, ValueState.Error);
        setTimeout(() => {
            setFormValueState<T>(formState, setFormState, ValueState.None);
        }, 1000);
    }

    return isFilled;
}
