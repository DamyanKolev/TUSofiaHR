// select type
export interface Position {
    id: int;
    positionName: string,
    minSalary: number
    maxSalary: number
}

//insert and update represention type
export interface PositionDTO {
    positionName: string,
    minSalary: number
    maxSalary: number
}

export const defaultPositionDTO: PositionDTO= {} as PositionDTO