import { Optional } from "@app-types/Optional"

export interface PositionView {
    id: int
    positionName: string
    description: Optional<string>
    statePositionName: string
    nkpd: string
    sysPositionId: int
}