import DataType from "@app-types/DataType";
import { formatDate } from "./formaters";

export function parseValueByType<T>(
    object: T,
    fieldName: string,
    value: string,
    type: string
): T {
    switch (type) {
        case DataType.Int:
            {
                return { ...object, [fieldName]: Number.parseInt(value) }
            }
        case DataType.Float:
            {
                return { ...object, [fieldName]: Number.parseFloat(value) }
            }
        case DataType.String:
            {
                return { ...object, [fieldName]: value };
            }
        case DataType.Date:
            {
                const date = new Date(value)
                return { ...object, [fieldName]: formatDate(date) };
            }
        default:
            {
                throw new Error("Invalid Type");
            }
    }
}



function parseObjectFields<T extends object>(formData: T): T {
    let newData: T = {} as T
    Object.entries(formData).forEach(([key, value])=> {
        if (key !== "change_date"){
            if (typeof value == "string" && value == ""){
                newData = {...newData, [key]: null}
            }
            else {
                newData = {...newData, [key]: value}
            }
        }
        else {
            newData = {...newData, [key]: formatDate(new Date())}
        }
    }) 

    return newData
}



export function parseUpdateDTO<T extends object>(formData: T): T {
    let newFormData: T = formData
    Object.entries(formData).forEach(([key, value])=> {
        if(value != null) {
            if(formData.hasOwnProperty("id")) {
                if (key !== "id") {
                    const newUpdateData = parseObjectFields(value)
                    newFormData = {...newFormData, [key]: newUpdateData}
                }
            }
            else {
                const newData = parseUpdateDTO(value)
                newFormData = {...newFormData, [key]: newData}
            }
        }
    })

    return newFormData
}