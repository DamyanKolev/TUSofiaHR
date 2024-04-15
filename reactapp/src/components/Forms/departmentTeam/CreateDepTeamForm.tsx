import DataType from "@app-types/enums/DataType";
import DailogSwitch from "@app-types/enums/DialogSwitch";
import LargeTableSelect from "@components/Selects/TableSelect/LargeTableSelect";
import SmallTableSelect from "@components/Selects/TableSelect/SmallTableSelect";
import { ChangeData } from "@models/EventData/ChangeData";
import { defaultDepartmentTeamDTO, DepartmentTeamDTO } from "@models/HR/DepartmentTeam";
import { depTeamJoinTableInfo } from "@models/JoinTableInfo/DepTeamJoinTablesInfo";
import { defaultDepTeamInsertFormState, DepartmentTeamFormState } from "@models/States/departmentTeam/DepartmentTeamFormState";
import { toggle } from "@store/slices/toggleSlice";
import { useAppDispatch } from "@store/storeHooks";
import { Bar, Button, ButtonDesign, Dialog, FlexBox, FlexBoxAlignItems, FlexBoxDirection, Input, InputDomRef, Label, MessageStrip, MessageStripDesign, StandardListItemDomRef, Ui5CustomEvent } from "@ui5/webcomponents-react";
import { largeFormItem } from "@utils/css";
import { setErrorInputStates } from "@utils/forms/formState";
import { submitPostForm } from "@utils/forms/submitForm";
import { updateFormInfo } from "@utils/forms/updateFormInfo";
import { isFilledForm } from "@utils/validation";
import { CSSProperties, FC, useState } from "react";


const mainContainerStyles: CSSProperties = {
    padding: "1rem 2rem",
    gap: ".5rem",
    width:"fit-content"
}

const formItemsStyles: CSSProperties = {
    gap: ".5rem"
}


interface Props {
    dialogSwitchGetter: () => DailogSwitch,
    dialogSwitchSetter: (dialogSwitch: DailogSwitch) => void
    tableURL: string
}


const CreateDepTeamForm: FC<Props> = ({dialogSwitchGetter, dialogSwitchSetter, tableURL}) => {
    const [formData, setFormData] = useState<DepartmentTeamDTO>(defaultDepartmentTeamDTO);
    const [formState, setFormState] = useState<DepartmentTeamFormState>(defaultDepTeamInsertFormState);
    const [disabled, setDisabled] = useState<boolean>(true)
    const dispatchIsSuccess = useAppDispatch()

    const setDefaultState = () => {
        dialogSwitchSetter(DailogSwitch.Close)
        setFormData(defaultDepartmentTeamDTO)
        setFormState(defaultDepTeamInsertFormState)
    }

    const setFormStates = (changeData: ChangeData) => {
        updateFormInfo(changeData, formData, setFormData, formState, setFormState)
        if(disabled) {setDisabled(false)}
    }

    const successCalback = () => {
        dispatchIsSuccess(toggle())
        setDefaultState()
    }
    
    const cancelOnClick = () => {
        setDefaultState()
    }

    const submitForm = async () => {
        const isFilled = isFilledForm<DepartmentTeamFormState>(formState);

        if (isFilled) {
            console.log(formData)
            submitPostForm(`${tableURL}/create`, formData, successCalback)
        }
        else {
            setErrorInputStates(formState, setFormState)
        }
    };

    const handleInputChange = (event: Ui5CustomEvent<InputDomRef, never>) => {
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
        <Dialog className="flexible-columns ui5-content-density-compact" open={dialogSwitchGetter() == DailogSwitch.OpenInsertDialog}
            headerText="Нов Отдел"
            footer={
                <Bar endContent={
                    <>
                        <Button onClick={cancelOnClick} design={ButtonDesign.Transparent}>Отказ</Button>
                        <Button onClick={submitForm} design={ButtonDesign.Emphasized} disabled={disabled}>Създай</Button>
                    </>
                }/>
            }
        >
            <MessageStrip hideCloseButton design={MessageStripDesign.Negative} hideIcon>
                Success
            </MessageStrip>
            <FlexBox direction={FlexBoxDirection.Column} alignItems={FlexBoxAlignItems.End} style={mainContainerStyles}>
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={formItemsStyles}>
                    <Label>Име на екипа</Label>
                    <Input
                        style={largeFormItem}
                        name="teamName"
                        value={formData.teamName}
                        onChange={handleInputChange}
                        valueState={formState.teamName.valueState}
                    />
                </FlexBox>
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={formItemsStyles}>
                    <Label>Отдел</Label>
                    <SmallTableSelect
                        name="departmentId"
                        joinInfo={depTeamJoinTableInfo.departmentId}
                        formDataSetter={handleConfirm}
                    />
                </FlexBox>
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={formItemsStyles}>
                    <Label>Мениджър на екипа</Label>
                    <LargeTableSelect
                        name="managerId"
                        tableId="employeeId"
                        joinInfo={depTeamJoinTableInfo.managerId}
                        formDataSetter={handleConfirm}
                    />
                </FlexBox>
            </FlexBox>
        </Dialog>
    )
}


export default CreateDepTeamForm

