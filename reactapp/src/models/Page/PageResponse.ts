export default interface PageResponse {
    pages: int,
    countRecords: int,
    records: Array<any>,
}


export const defaultPageResponse: PageResponse = {
    pages: 0,
    countRecords: 0,
    records: [],
}