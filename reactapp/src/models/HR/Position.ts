// select type
export interface Position {
    id: int;
    position_name: string,
    min_salary: number
    max_salary: number
}

//insert and update represention type
export interface PositionDTO {
    position_name: string,
    min_salary: number
    max_salary: number
}

export const defaultPositionDTO: PositionDTO= {} as PositionDTO