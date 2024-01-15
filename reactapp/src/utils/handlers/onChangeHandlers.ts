import DataType from "@app-types/DataType";
import { DatePickerDomRef, InputDomRef, RadioButtonDomRef, ValueState } from "@ui5/webcomponents-react";
import { parseValueByType } from "@utils/parsers";
import { Dispatch, SetStateAction } from "react";

export function handleInputChangeFunc<T, E extends object>(
    target: InputDomRef, formData: T, setFormData: Dispatch<SetStateAction<T>>, formState: E, setFormState: Dispatch<SetStateAction<E>>
) {
    const value = target.value? target.value : "";
    const valueType = target.dataset.type
    const name = target.name

    if (name && valueType) {
        let isNumberType = valueType == DataType.Float || valueType == DataType.Int
        let newFormData:T

        if(!value && isNumberType) {
            newFormData = parseValueByType<T>(formData, name, value, DataType.String);
        }
        else {
            newFormData = parseValueByType<T>(formData, name, value, valueType);
        }
        setFormData(newFormData);


        if (formState.hasOwnProperty(name)) {
            if (value) {
                setFormState({ ...formState, [name]: { isFilled: true, valueState: ValueState.None } })
            }
            else {
                setFormState({ ...formState, [name]: { isFilled: false, valueState: ValueState.None } })
            }
        }
    }
}


export function handleRadioButtonChangeFunc<T, E extends object>(
    target: RadioButtonDomRef, formData: T, setFormData: Dispatch<SetStateAction<T>>, formState: E, setFormState: Dispatch<SetStateAction<E>>
) {
    const value = target.value? target.value : "";
    const valueType = target.dataset.type
    const name = target.name

    if (name && valueType) {
        let isNumberType = valueType == DataType.Float || valueType == DataType.Int
        let newFormData:T

        if(!value && isNumberType) {
            newFormData = parseValueByType<T>(formData, name, value, DataType.String);
        }
        else {
            newFormData = parseValueByType<T>(formData, name, value, valueType);
        }

        setFormData(newFormData);

        if (formState.hasOwnProperty(name)) {
            if (value) {
                setFormState({ ...formState, [name]: { isFilled: true, valueState: ValueState.None } })
            }
            else {
                setFormState({ ...formState, [name]: { isFilled: false, valueState: ValueState.None } })
            }
        }
    }
}


export function handleDateChangeFunc<T, E extends object>(
    target: DatePickerDomRef, formData: T, setFormData: Dispatch<SetStateAction<T>>, formState: E, setFormState: Dispatch<SetStateAction<E>>
) {
    const value = target.value? target.value : "";
    const valueType = target.dataset.type
    const name = target.name ? target.name : target.dataset.name

    if (name && valueType) {
        let newFormData: T;
        if (value) {
            newFormData = parseValueByType<T>(formData, name, value, valueType)
        }
        else {
            newFormData = parseValueByType<T>(formData, name, value, DataType.String)
        }
        setFormData(newFormData);

        if (formState.hasOwnProperty(name)) {
            if (value) {
                setFormState({ ...formState, [name]: { isFilled: true, valueState: ValueState.None } })
            }
            else {
                setFormState({ ...formState, [name]: { isFilled: false, valueState: ValueState.None } })
            }
        }
    }
}