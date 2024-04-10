import DataType from "@app-types/enums/DataType";
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

export function parseObjectFields<T extends object>(formData: T): T {
    let newData: T = formData
    Object.entries(formData).forEach(([key, value])=> {
        const fieldType = typeof value
        if (fieldType != "object") {
            if (key !== "change_date"){
                if (fieldType == "string" && value == ""){
                    newData = {...newData, [key]: null}
                }
            }
            else {
                newData = {...newData, [key]: formatDate(new Date())}
            }
        }
        else {
            let result = parseObjectFields(value)
            newData = {...newData, [key]: result}
        }
    }) 
    return newData
}


export function parseObjectTo<T extends object, R>(object: T, fields: Array<string>): R {
    let newFormData: R = {} as R
    Object.entries(object).forEach(([key, value])=> {
        if(!fields.includes(key)) {
            newFormData = {...newFormData, [key]: value}
        }
    })

    return newFormData
}