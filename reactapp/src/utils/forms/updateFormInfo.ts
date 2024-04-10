import DataType from "@app-types/enums/DataType";
import { ChangeData } from "@models/EventData/ChangeData";
import { FormFieldState } from "@models/States/FormState";
import { ValueState } from "@ui5/webcomponents-react";
import { getNewFormData } from "@utils/forms/formData";
import { getNewFormState } from "@utils/forms/formState";

export function updateFormInfo<T extends object, E extends object>(
    changeData: ChangeData, formData: T, setFormData: (formData: T) => void, formState: E, setFormState: (formData: E) => void
) {
    changeData.valueType = changeData.valueType? changeData.valueType : DataType.String
    let {name, value, valueType} = changeData
    if (name && value) {
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