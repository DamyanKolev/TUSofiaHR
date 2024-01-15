export interface UpdateDTO<T> {
    id: int,
    update_data: T
}

export function createUpdateDTO<T> (id: int, update_data: T): UpdateDTO<T> {
    return {
        id,
        update_data
    }
}