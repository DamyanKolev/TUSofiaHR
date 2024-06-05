import { PositionView } from "@/pages/Positions/models/PositionView";
import { Optional } from "@/types/Optional";

// select type
export interface Position {
    id: int;
    positionName: string,
    description: Optional<string>,
    sysPositionId: int
}

export const defaultPositionUpdateDTO: Position= {
    id: 0,
    positionName: "",
    description: null,
    sysPositionId: 0
}

//insert and update represention type
export interface PositionDTO {
    positionName: string,
    description: Optional<string>,
    sysPositionId: int
}

export const defaultPositionDTO: PositionDTO= {
    positionName: "",
    description: null,
    sysPositionId: 0
}


export interface PositionUpdateData {
    statePositionName: string
}

export const defaultPositionUpdateData: PositionUpdateData = {
    statePositionName: "",
}

export function createPositionUpdateData(positionView: PositionView): PositionUpdateData {
    return {
        statePositionName: positionView.statePositionName,
    }
}