export function setNullValuesToEmtyString<T extends object>(formData: T): T {
    Object.entries(formData).forEach(([key, value])=> {
        if(value == null){
            formData = {...formData, [key]: ""}
        }
    }) 

    return formData
}