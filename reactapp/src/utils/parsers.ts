import DataType from "@app-types/enums/DataType";
import moment from 'moment';

export function parseValueByType<T>(
    object: T,
    fieldName: string,
    value: string,
    type: string
): T {
    switch (type) {
        case DataType.Int:
            {
                if (typeof value == "string"){
                    return { ...object, [fieldName]: Number.parseInt(value) }
                }
                throw new Error("Invalid Type");
            }
        case DataType.Float:
            {
                if (typeof value == "string"){
                    return { ...object, [fieldName]: Number.parseFloat(value) }
                }
                throw new Error("Invalid Type");
            }
        case DataType.String:
            {
                return { ...object, [fieldName]: value };
            }
        case DataType.Date:
            {
                if (typeof value == "string"){
                    return { ...object, [fieldName]: parseDateToISO(value) };
                }
                throw new Error("Invalid Type");
            }
        default:
            {
                throw new Error("Invalid Type");
            }
    }
}

export function parseDateToRFC2822(date: Date | string): string {
    const dateConvert = new Date(date)
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    const formattedDate:string = dateConvert.toLocaleDateString(undefined, options)
    return formattedDate
}

export function parseDateToISO(date: Date | string){
    moment.locale('bg');
    const dateConvert = new Date(date).toISOString()
    const dateValue = Date.parse(dateConvert)
    const formattedDate = moment(dateValue).format('YYYY-MM-DD');

    return formattedDate
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
                newData = {...newData, [key]: parseDateToISO(new Date())}
            }
        }
        else {
            if (value != null) {
                let result = parseObjectFields(value)
                newData = {...newData, [key]: result}
            }
            else {
                newData = {...newData, [key]: value}
            }
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