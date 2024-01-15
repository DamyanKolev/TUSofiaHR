import { PositionFormState } from "@models/FormStates/position/PositionFormState";
import { PositionDTO } from "@models/HR/Position";
import { FlexBox, FlexBoxAlignItems, FlexBoxDirection, Input, InputDomRef, Label, Ui5CustomEvent } from "@ui5/webcomponents-react";
import { handleInputChangeFunc } from "@utils/handlers/onChangeHandlers";
import { CSSProperties, Dispatch, FC, SetStateAction } from "react";

interface CreatePositionProps {
    getFormState: () => PositionFormState,
    getFormData: () => PositionDTO,
    setFormState: Dispatch<SetStateAction<PositionFormState>>
    setFormData: Dispatch<SetStateAction<PositionDTO>>
}


const mainContainerStyles: CSSProperties = {
    padding: "1rem 2rem",
    gap: ".5rem",
    width:"fit-content"
}

const formItemsStyles: CSSProperties = {
    gap: ".5rem"
}

const CreatePosition: FC<CreatePositionProps> = ({getFormState, getFormData, setFormState, setFormData}) => {
    const handleInputChange = (event: Ui5CustomEvent<InputDomRef, never>) => {
        const target = event.target
        handleInputChangeFunc<PositionDTO, PositionFormState>(target, getFormData(), setFormData, getFormState(), setFormState);
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