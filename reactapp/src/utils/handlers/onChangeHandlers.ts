import DataType from "@app-types/DataType";
import { DatePickerDomRef, InputDomRef, RadioButtonDomRef, ValueState } from "@ui5/webcomponents-react";
import { getNewFormData } from "../forms/formData";
import { FormFieldState } from "@/models/FormStates/FormState";
import { getNewFormState } from "../forms/formState";

export function handleInputChangeFunc<T extends object, E extends object>(
    target: InputDomRef, formData: T, setFormData: (formData: T) => void, formState: E, setFormState: (formData: E) => void
) {
    const value = target.value? target.value : "";
    const valueType = target.dataset.type? target.dataset.type : DataType.String
    const name = target.name

    if (name && valueType) {
        let newFormData = getNewFormData(formData, name, value, valueType)
        setFormData(newFormData);
        

        let formFieldState: FormFieldState
        if (value) {
            formFieldState = { isFilled: true, valueState: ValueState.None, isChanged: true}
        }
        else {
            formFieldState = { isFilled: false, valueState: ValueState.None, isChanged: true}
        }
        const newFormState = getNewFormState(formState, name, formFieldState)
        setFormState(newFormState)
    }
}


export function handleRadioButtonChangeFunc<T extends object, E extends object>(
    target: RadioButtonDomRef, formData: T, setFormData: (formData: T) => void, formState: E, setFormState: (formData: E) => void
) {
    const value = target.value? target.value : "";
    const valueType = target.dataset.type
    const name = target.name

    if (name && valueType) {
        let newFormData = getNewFormData(formData, name, value, valueType)
        setFormData(newFormData);
        

        let formFieldState: FormFieldState
        if (value) {
            formFieldState = { isFilled: true, valueState: ValueState.None, isChanged: true}
        }
        else {
            formFieldState = { isFilled: false, valueState: ValueState.None, isChanged: true}
        }
        const newFormState = getNewFormState(formState, name, formFieldState)
        setFormState(newFormState)
    }
}


export function handleDateChangeFunc<T extends object, E extends object>(
    target: DatePickerDomRef, formData: T, setFormData: (formData: T) => void, formState: E, setFormState: (formData: E) => void
) {
    const value = target.value? target.value : "";
    const valueType = target.dataset.type
    const name = target.name ? target.name : target.dataset.name

    if (name && valueType) {
        let newFormData = getNewFormData(formData, name, value, valueType)
        setFormData(newFormData);
        

        let formFieldState: FormFieldState
        if (value) {
            formFieldState = { isFilled: true, valueState: ValueState.None, isChanged: true}
        }
        else {
            formFieldState = { isFilled: false, valueState: ValueState.None, isChanged: true}
        }
        const newFormState = getNewFormState(formState, name, formFieldState)
        setFormState(newFormState)
    }
}