import { PositionFormState } from "@models/States/position/PositionFormState";
import { PositionDTO } from "@models/HR/Position";
import { FlexBox, FlexBoxAlignItems, FlexBoxDirection, Input, InputDomRef, InputType, Label, Ui5CustomEvent } from "@ui5/webcomponents-react";
import { CSSProperties, FC } from "react";
import { ChangeData } from "@models/EventData/ChangeData";

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
    const handleInputChange = (event: Ui5CustomEvent<InputDomRef, never>) => {
        const changeData: ChangeData = {
            value: event.target.value,
            valueType: event.target.dataset.type,
            name: event.target.name,
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
                    onChange={handleInputChange}
                    valueState={getFormState().positionName.valueState}
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={formItemsStyles}>
                <Label>Минимална заплата</Label>
                <Input
                    name="minSalary"
                    type={InputType.Number}
                    value={getFormData().minSalary}
                    onChange={handleInputChange}
                    valueState={getFormState().minSalary.valueState}
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={formItemsStyles}>
                <Label>Максимална заплата</Label>
                <Input
                    name="maxSalary"
                    type={InputType.Number}
                    value={getFormData().maxSalary}
                    onChange={handleInputChange}
                    valueState={getFormState().maxSalary.valueState}
                />
            </FlexBox>
        </FlexBox>
    )
}

export default InitPositionForm