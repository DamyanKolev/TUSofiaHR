import DailogSwitch from "@app-types/enums/DialogSwitch";
import { TableRowState } from "@app-types/TableRowState";
import { ChangeData } from "@models/EventData/ChangeData";
import { createDepartmentTeamUpdateData, defaultDepartmentTeamUpdateData, defaultDepTeamUpdateDTO, DepartmentTeam, DepartmentTeamUpdateData } from "@models/HR/DepartmentTeam";
import { defaultDepTeamtUpdateFormState, DepartmentTeamFormState } from "@models/States/departmentTeam/DepartmentTeamFormState";
import { toggle } from "@store/slices/toggleSlice";
import { useAppDispatch } from "@store/storeHooks";
import { Bar, Button, ButtonDesign, Dialog, FlexBox, FlexBoxAlignItems, FlexBoxDirection, InputDomRef, Label, StandardListItemDomRef, Title, TitleLevel, Ui5CustomEvent } from "@ui5/webcomponents-react";
import { setErrorInputStates } from "@utils/forms/formState";
import { submitPutForm } from "@utils/forms/submitForm";
import { updateFormInfo } from "@utils/forms/updateFormInfo";
import { isFilledForm } from "@utils/validation";
import { FC, useContext, useEffect, useState } from "react";
import { StandardInputField } from "../StandartFields/StandartInputField";
import StandardTableSelectField from "../StandartFields/StandartTableSelectField";
import DataType from "@app-types/enums/DataType";
import { getNewFormDataFromNestedForms } from "@utils/forms/formData";
import { depTeamJoinTableInfo } from "@models/JoinTableInfo/DepTeamJoinTablesInfo";
import { DepartmentTeamPageContext } from "@pages/hr/DepartmentTeamPage";
import { DepartmentTeamView } from "@models/TableViews/DepartmentTeamView";
import { createUpdateDTO } from "@/utils/createUpdateDTO";
import { getUpdateData } from "@/utils/getData";



interface Props {
    dialogSwitchGetter: () => DailogSwitch,
    dialogSwitchSetter: (dialogSwitch: DailogSwitch) => void
    tableURL: string
}

const UpdateDepTeamForm: FC<Props> = ({dialogSwitchGetter, dialogSwitchSetter, tableURL}) => {
    const rowState = useContext<TableRowState<DepartmentTeamView> | undefined>(DepartmentTeamPageContext)
    const [formState, setFormState] = useState<DepartmentTeamFormState>(defaultDepTeamtUpdateFormState)
    const [formData, setFormData] = useState<DepartmentTeam>(defaultDepTeamUpdateDTO)
    const [editMode, setEditMode] = useState<boolean>(false)
    const [disabled, setDisabled] = useState<boolean>(true)
    const [updateData, setUpdateData] = useState<DepartmentTeamUpdateData>(defaultDepartmentTeamUpdateData)
    const dispatchIsSuccess = useAppDispatch()

    const setDefaultValues = () => {
        setFormState(defaultDepTeamtUpdateFormState)
        dialogSwitchSetter(DailogSwitch.Close)
        setFormData(defaultDepTeamUpdateDTO)
        rowState?.setSelectedRow({} as DepartmentTeamView)
        setEditMode(false)
    }

    const init = async () => {
        if(rowState) {
            const tableRow = await getUpdateData<DepartmentTeam, number>(rowState.selectedRow.id, `${tableURL}/find-by-id`)
            if (tableRow) {
                setFormData(createUpdateDTO(formData, tableRow))
                setUpdateData(createDepartmentTeamUpdateData(rowState.selectedRow))
            }
        }
    }

    const successCalback = ():void => {
        dispatchIsSuccess(toggle())
        setDefaultValues()
    }

    const setFormStates = (changeData: ChangeData) => {
        updateFormInfo(changeData, formData, setFormData, formState, setFormState)
        if(disabled) {setDisabled(false)}
    }

    const cancelOnClick = () => {
        dialogSwitchSetter(DailogSwitch.Close)
    }

    const submitForm = () => {
        if(isFilledForm(formState)) {
            submitPutForm(tableURL, formData, successCalback) 
        }
        else {
            setErrorInputStates(formState, setFormState)
        }
    };

    useEffect(() => {
        if(rowState) {
            if (Object.keys(rowState.selectedRow).length > 0) {
                init()
            }
        }
    }, [rowState]);


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
        const value = selectedItem.textContent? selectedItem.textContent : ""
        const newUpdateData = getNewFormDataFromNestedForms(updateData, name, value, DataType.String);

        setFormStates(changeData)
        setUpdateData(newUpdateData)
    }

    return (
        <Dialog className="flexible-columns ui5-content-density-compact" open={dialogSwitchGetter() == DailogSwitch.OpenUpdateDialog}
            header={
                <Bar
                    startContent={<Title level={TitleLevel.H6}>Промяна на Позиция</Title>}
                    endContent={
                        <Button onClick={() => setEditMode(!editMode)}>{editMode ? 'Display Mode' : 'Edit'}</Button>
                    }
                />
            }
            footer={
                <Bar design="Footer">
                        <Button onClick={cancelOnClick} design={ButtonDesign.Transparent}>Отказ</Button>
                        <Button onClick={submitForm} design={ButtonDesign.Emphasized} disabled={disabled}>Запази</Button>
                </Bar>
            }
        >
            <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column} style={{padding: "1rem 2rem", gap: ".5rem", width:"fit-content"}}>
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label>Екип</Label>
                        <StandardInputField
                            editMode={editMode}
                            value={formData.teamName}
                            onChange={handleInputChange}
                            name={"teamName"}
                            valueState={formState.teamName.valueState}
                        />
                    </FlexBox>

                    <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label>Отдел</Label>
                        <StandardTableSelectField
                            name="departmentId"
                            isLargeTable={false}
                            editMode={editMode}
                            value={updateData.departmentName}
                            joinInfo={depTeamJoinTableInfo.departmentId}
                            formDataSetter={handleConfirm}
                            />
                    </FlexBox>

                    <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label>Мениджър</Label>
                        <StandardTableSelectField
                            name="managerId"
                            editMode={editMode}
                            value={updateData.managerName? updateData.managerName : ""}
                            joinInfo={depTeamJoinTableInfo.managerId}
                            formDataSetter={handleConfirm}
                        />
                    </FlexBox>
            </FlexBox>

        </Dialog>
    );
}

export default UpdateDepTeamForm