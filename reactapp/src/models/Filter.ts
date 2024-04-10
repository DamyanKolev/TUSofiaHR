export interface FilterData {
    fieldName: string,
    value: string,
}

export interface Filter {
    fieldName: string,
    value: string,
}

export const defaultFilter: Filter = {
    fieldName: "",
    value: "",
}

export function createFilter(name: string, value: string):Filter {
    return {
        fieldName: name,
        value: value
    }
}