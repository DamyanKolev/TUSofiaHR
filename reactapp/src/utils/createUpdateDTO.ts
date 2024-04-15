export function createUpdateDTO<T extends object, R extends object>(formData: T, tableRow: R): T {
    let object:T = {} as T
    Object.entries(tableRow).forEach(([key, value]) => {
        if(formData.hasOwnProperty(key)){
            object = {...object, [key]: value}
        }
    })
    return object
}