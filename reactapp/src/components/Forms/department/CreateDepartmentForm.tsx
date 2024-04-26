import { Bar, Button, ButtonDesign, Dialog, FlexBox, FlexBoxAlignItems, FlexBoxDirection, FlexBoxJustifyContent, Input, InputDomRef, Label, MessageStrip, MessageStripDesign, StandardListItemDomRef, Ui5CustomEvent } from "@ui5/webcomponents-react"
import { FC, useState } from "react"
import { DepartmentDTO, defaultDepartmentDTO } from "@models/HR/Departmnet"
import { DepartmentFormState, defaultDepartmentInsertFormState } from "@models/States/department/DepartmentFormState"
import { useAppDispatch } from "@store/storeHooks"
import { toggle } from "@store/slices/toggleSlice"
import DailogSwitch from "@app-types/enums/DialogSwitch"
import { isFilledForm } from "@utils/validation"
import { submitPostForm } from "@utils/forms/submitForm"
import { setErrorInputStates } from "@utils/forms/formState"
import { updateFormInfo } from "@utils/forms/updateFormInfo"
import { ChangeData } from "@models/EventData/ChangeData"
import { largeFormItem } from "@utils/css"
import { setInputDefaultValue } from "@utils/forms/setInputDefaultValue"
import DataType from "@app-types/enums/DataType"
import LargeTableSelect from "@components/Selects/TableSelect/LargeTableSelect"
import SmallTableSelect from "@/components/Selects/TableSelect/SmallTableSelect"
import { departmentJoinTableInfo } from "@/models/JoinTableInfo/DepartmentJoinTableInfo"


interface CreateDepartmentFormProps {
    dialogSwitchGetter: () => DailogSwitch,
    dialogSwitchSetter: (dialogSwitch: DailogSwitch) => void
    tableURL: string
}


const CreateDepartmentForm: FC<CreateDepartmentFormProps> = ( { dialogSwitchGetter, dialogSwitchSetter, tableURL}) => {
    const [formData, setFormData] = useState<DepartmentDTO>(defaultDepartmentDTO);
    const [formState, setFormState] = useState<DepartmentFormState>(defaultDepartmentInsertFormState);
    const [disabled, setDisabled] = useState<boolean>(true)
    const dispatchIsSuccess = useAppDispatch()

    const setDefaultState = () => {
        dialogSwitchSetter(DailogSwitch.Close)
        setFormData(defaultDepartmentDTO)
        setFormState(defaultDepartmentInsertFormState)
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
        const isFilled = isFilledForm<DepartmentFormState>(formState);

        if (isFilled) {
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
            <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column} style={{padding: "1rem 2rem", gap: ".5rem", width:"fit-content"}}>
                <FlexBox alignItems={FlexBoxAlignItems.Center} justifyContent={FlexBoxJustifyContent.End} style={{gap:"1rem"}}>
                    <Label>Отдел</Label>
                    <Input
                        style={largeFormItem}
                        name="departmentName"
                        value={formData.departmentName}
                        onChange={handleInputChange}
                        valueState={formState.departmentName.valueState}
                    />
                </FlexBox>
                <FlexBox alignItems={FlexBoxAlignItems.Center} justifyContent={FlexBoxJustifyContent.End} style={{gap:"1rem"}}>
                    <Label>Описание</Label>
                    <Input
                        style={largeFormItem}
                        name="description"
                        value={setInputDefaultValue(formData.description)}
                        onChange={handleInputChange}
                    />
                </FlexBox>
                <FlexBox alignItems={FlexBoxAlignItems.Center} justifyContent={FlexBoxJustifyContent.End} style={{gap:"1rem"}}>
                    <Label>Мениджър</Label>
                    <LargeTableSelect
                        name="managerId"
                        tableId="employeeId"
                        joinInfo={departmentJoinTableInfo.managerId}
                        formDataSetter={handleConfirm}
                    />
                </FlexBox>
                <FlexBox alignItems={FlexBoxAlignItems.Center} justifyContent={FlexBoxJustifyContent.End} style={{gap:"1rem", paddingInlineStart:"2.5rem"}}>
                    <Label>Родителска Единица</Label>
                    <SmallTableSelect
                        name="parent_id"
                        joinInfo={departmentJoinTableInfo.parentId}
                        formDataSetter={handleConfirm}
                    />
                </FlexBox> 
            </FlexBox>
        </Dialog>
    )
}

export default CreateDepartmentForm