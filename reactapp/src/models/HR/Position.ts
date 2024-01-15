// select type
export type Position = {
    id: int;
    position_name: string,
    min_salary: number
    max_salary: number
}

//insert and update represention type
export type PositionDTO = {
    position_name: string,
    min_salary: number
    max_salary: number
}