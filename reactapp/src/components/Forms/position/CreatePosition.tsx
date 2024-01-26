import { PositionFormState } from "@models/FormStates/position/PositionFormState";
import { PositionDTO } from "@models/HR/Position";
import { FlexBox, FlexBoxAlignItems, FlexBoxDirection, Input, InputDomRef, Label, Ui5CustomEvent } from "@ui5/webcomponents-react";
import { CSSProperties, FC } from "react";

interface CreatePositionProps {
    getFormState: () => PositionFormState,
    getFormData: () => PositionDTO,
    handleInputChange: (event: Ui5CustomEvent<InputDomRef, never>) => void
}


const mainContainerStyles: CSSProperties = {
    padding: "1rem 2rem",
    gap: ".5rem",
    width:"fit-content"
}

const formItemsStyles: CSSProperties = {
    gap: ".5rem"
}

const CreatePosition: FC<CreatePositionProps> = ({getFormState, getFormData, handleInputChange}) => {
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
                    value={getFormData().minSalary ? getFormData().minSalary.toString() : ""}
                    onChange={handleInputChange}
                    valueState={getFormState().minSalary.valueState}
                />
            </FlexBox>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={formItemsStyles}>
                <Label>Максимална заплата</Label>
                <Input
                    name="maxSalary"
                    value={getFormData().maxSalary ? getFormData().maxSalary.toString() : ""}
                    onChange={handleInputChange}
                    valueState={getFormState().maxSalary.valueState}
                />
            </FlexBox>
        </FlexBox>
    )
}

export default CreatePosition