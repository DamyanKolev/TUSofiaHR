import { PositionFormState } from "@models/States/position/PositionFormState";
import { PositionDTO } from "@models/HR/Position";
import { FlexBox, FlexBoxAlignItems, FlexBoxDirection, Input, InputDomRef, Label, StandardListItemDomRef, Ui5CustomEvent } from "@ui5/webcomponents-react";
import { CSSProperties, FC } from "react";
import { ChangeData } from "@models/EventData/ChangeData";
import LargeTableSelect from "@/components/Selects/TableSelect/LargeTableSelect";
import { contractJoinTablesInfo } from "@/models/JoinTableInfo/ContractJoinTablesInfo";
import DataType from "@/types/DataType";

interface Props {
    getFormState: () => PositionFormState,
    getFormData: () => PositionDTO,
    setFormStates: (changeData: ChangeData) => void,
}


const mainContainerStyles: CSSProperties = {
    padding: "1rem 2rem",
    gap: ".5rem",
    width:"fit-content"
}

const formItemsStyles: CSSProperties = {
    gap: ".5rem"
}

const InitPositionForm: FC<Props> = ({getFormState, getFormData, setFormStates}) => {
    const handleOnInput = (event: Ui5CustomEvent<InputDomRef, never>) => {
        const changeData: ChangeData = {
            value: event.target.value,
            valueType: event.target.dataset.type,
            name: event.target.name,
        }
        setFormStates(changeData)
    }

    const handleConfirm = (selectedItem: StandardListItemDomRef, name: string) => {
        const changeData: ChangeData = {
            value: selectedItem.id,
            name: name,
            valueType: DataType.Int,
        }
        setFormStates(changeData)
    }

    return (
        <FlexBox direction={FlexBoxDirection.Column} alignItems={FlexBoxAlignItems.End} style={mainContainerStyles}>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={formItemsStyles}>
                <Label>Позиция</Label>
                <Input
                    name="positionName"
                    value={getFormData().positionName}
                    onInput={handleOnInput}
                    valueState={getFormState().positionName.valueState}
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap: ".5rem"}}>
                <Label>Описание</Label>
                <Input
                    name="description"
                    value={getFormData().description? getFormData().description! : ""}
                    onInput={handleOnInput}
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap: ".5rem"}}>
                <Label>Код на позицията</Label>
                <LargeTableSelect
                    name="sysPositionId"
                    joinInfo={contractJoinTablesInfo.positionId}
                    formDataSetter={handleConfirm}
                />
            </FlexBox>
        </FlexBox>
    )
}

export default InitPositionForm