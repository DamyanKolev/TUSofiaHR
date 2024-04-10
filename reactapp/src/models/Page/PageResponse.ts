export default interface PageResponse {
    pages: int,
    count_records: int,
    records: Array<any>,
}


export const defaultPageResponse: PageResponse = {
    pages: 1,
    count_records: 0,
    records: [],
}