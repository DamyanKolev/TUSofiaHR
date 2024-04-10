import { defaultFilter, Filter } from "../Filter"

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


export const defautlPageFilterInfo:PageFilterInfo = {
    pageNumber: 0,
    pageSize: 0,
    filter: defaultFilter
}


export function createPageFilterInfo(
    pageNumber: int, pageSize: int, filter: Filter
): PageFilterInfo {
    return {
        pageNumber,
        pageSize,
        filter
    }
} 