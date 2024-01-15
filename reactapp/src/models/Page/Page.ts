interface Sort {
    field_name: string,
    order_asc: boolean,
}

export interface Filter {
    field_name: string,
    filter_type: string,
    r_value: string,
    or: boolean,
}

interface FilterSort {
    filters: Array<Filter>;
    sorts: Array<Sort>
}

export interface PageInfo {
    filter_sort: FilterSort,
    page_number: int,
    limit: int,
}


export const initialPageState: PageInfo = {
    filter_sort: {
        filters: [],
        sorts: []
    },
    page_number: 1,
    limit: 100
}


export const initialFilterState: Filter = {
    field_name: "",
    filter_type: "",
    r_value: "",
    or: false,
}

export function createPageInfo(filters: Array<Filter>, sorts: Array<Sort>, page_number: int, limit: int): PageInfo {
    return {
        filter_sort: {
            filters,
            sorts
        },
        page_number,
        limit
    }
}

export function createFilterObject(field_name:string, filter_type: string, r_value: string, or: boolean): Filter {
    return {
        field_name,
        filter_type,
        r_value,
        or
    }
}
