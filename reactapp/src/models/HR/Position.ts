// select type
export interface Position {
    id: int;
    positionName: string,
    minSalary: string
    maxSalary: string
}

export const defaultPositionUpdateDTO: Position= {
    id: 0,
    positionName: "",
    minSalary: "",
    maxSalary: ""
}

//insert and update represention type
export interface PositionDTO {
    positionName: string,
    minSalary: string
    maxSalary: string
}

export const defaultPositionDTO: PositionDTO= {
    positionName: "",
    minSalary: "",
    maxSalary: ""
}
