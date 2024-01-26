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

export const defaultPosition: Position= {
    id: 0,
    positionName: "",
    minSalary: 0,
    maxSalary: 0,
}

export const defaultPositionDTO: PositionDTO= {
    positionName: "",
    minSalary: 0,
    maxSalary: 0,
}