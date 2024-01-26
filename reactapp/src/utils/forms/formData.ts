import { parseValueByType } from "../parsers";

export function getNewFormDataFromNestedForms<T extends object>(formData: T, name: string, value: string, valueType: string): T{
    let newFormData: T = formData
    Object.entries(formData).forEach(([key, objectValue]) => {
        const fieldType = typeof objectValue
        if(fieldType == "object" && objectValue != null){
            if (objectValue.hasOwnProperty(name)) {
                let newObject = parseValueByType<object>(objectValue, name, value, valueType);
                newFormData = {...formData, [key]: newObject}
            }
            else {
                getNewFormDataFromNestedForms(objectValue, name, value, valueType)
            }
        }
    })
    return newFormData
}


export function getNewFormData<T extends object>(formData: T, name: string, value: string, valueType: string): T {
    let newFormData:T
    if(formData.hasOwnProperty(name)){
        newFormData = parseValueByType<T>(formData, name, value, valueType);
    }
    else {
        newFormData = getNewFormDataFromNestedForms(formData, name, value, valueType)
    }
    return newFormData
}


export function setNullValuesToEmtyString<T extends object>(formData: T): T {
    Object.entries(formData).forEach(([key, value])=> {
        const fieldType = typeof value
        if(fieldType == "object" && value != null){
            const newValue = setNullValuesToEmtyString(value)
            formData = {...formData, [key]: newValue}
        }
        else {
            if(value == null){
                formData = {...formData, [key]: ""}
            }
        }
    }) 
    return formData
}