export interface PageInfo {
    pageNumber: int,
    pageSize: int,
}


export const initialPageState: PageInfo = {
    pageNumber: 1,
    pageSize: 100
}


export interface PageFilterInfo {
    pageNumber: int,
    pageSize: int,
    filter: Filter
}

export interface Filter {
    fieldName: string,
    value: string
}

export const initialFilterState: Filter = {
    fieldName: "",
    value: ""
}

export function createFilter(name: string, value: string):Filter {
    return {
        fieldName: name,
        value: value
    }
}

export const initialPageFilterInfo:PageFilterInfo = {
    pageNumber: 1,
    pageSize: 100,
    filter: initialFilterState
}

export function createPageFilterInfo(page:int, pageSize: int, filter: Filter):PageFilterInfo {
    return {
        pageNumber: page,
        pageSize: pageSize,
        filter: filter
    }
}