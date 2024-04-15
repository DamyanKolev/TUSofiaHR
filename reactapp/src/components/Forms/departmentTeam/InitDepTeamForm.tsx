import { FlexBox, FlexBoxAlignItems, FlexBoxDirection, Input, InputDomRef, Label, Ui5CustomEvent } from "@ui5/webcomponents-react";
import { FC } from "react";
import { ChangeData } from "@models/EventData/ChangeData";
import { largeFormItem } from "@utils/css";
import { DepartmentTeamFormState } from "@models/States/departmentTeam/DepartmentTeamFormState";
import { DepartmentTeamDTO } from "@models/HR/DepartmentTeam";

interface Props {
    getFormState: () => DepartmentTeamFormState,
    getFormData: () => DepartmentTeamDTO,
    setFormStates: (changeData: ChangeData) => void,
}

const InitDepTeamForm: FC<Props> = ({getFormState, getFormData, setFormStates}) => {
    const handleInputChange = (event: Ui5CustomEvent<InputDomRef, never>) => {
        const changeData: ChangeData = {
            value: event.target.value,
            valueType: event.target.dataset.type,
            name: event.target.name,
        }
        setFormStates(changeData)
    }

    return (
        <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column} style={{padding: "1rem 2rem", gap: ".5rem", width:"fit-content"}}>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap: ".5rem"}}>
                <Label>Име на екипа</Label>
                <Input
                    style={largeFormItem}
                    name="teamName"
                    value={getFormData().teamName}
                    onChange={handleInputChange}
                    valueState={getFormState().teamName.valueState}
                />
            </FlexBox>
        </FlexBox>
    )
}

export default InitDepTeamForm