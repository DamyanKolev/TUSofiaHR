export default interface PageResponse {
    title: string,
    pages: int,
    count_records: int,
    records: Array<any>,
    fields: Array<any>,
}


export const defaultPageResponse: PageResponse = {
    title: "",
    pages: 0,
    count_records: 0,
    records: [],
    fields: []
}