import { FC, useContext, useState, useEffect } from 'react';
import { Bar, Button, ButtonDesign, Dialog, FlexBox, FlexBoxAlignItems, FlexBoxDirection, InputDomRef, Label, StandardListItemDomRef, Title, TitleLevel, Ui5CustomEvent } from '@ui5/webcomponents-react';
import { StandardInputField } from '../StandartFields/StandartInputField';
import { useAppDispatch } from '@store/storeHooks';
import { toggle } from '@store/slices/toggleSlice';
import { Department, DepartmentUpdateData, createDepartmentUpdateData, defaultDepartmentUpdateDTO, defaultDepartmentUpdateData } from '@models/HR/Departmnet';
import DailogSwitch from '@app-types/enums/DialogSwitch';
import { DepartmentPageContext } from '@pages/hr/DepartmentPage';
import { submitPutForm } from '@utils/forms/submitForm';
import { isFilledForm } from '@utils/validation';
import { setErrorInputStates } from '@utils/forms/formState';
import { updateFormInfo } from '@utils/forms/updateFormInfo';
import { DepartmentFormState, defaultDepartmentUpdateFormState } from '@models/States/department/DepartmentFormState';
import { TableRowState } from '@app-types/TableRowState';
import { ChangeData } from '@models/EventData/ChangeData';
import StandardTableSelectField from '../StandartFields/StandartTableSelectField';
import { depTeamJoinTableInfo } from '@/models/JoinTableInfo/DepTeamJoinTablesInfo';
import { getNewFormDataFromNestedForms } from '@/utils/forms/formData';
import DataType from '@/types/DataType';
import { DepartmentView } from '@/models/TableViews/DepartmentView';
import { getUpdateData } from '@/utils/getData';
import { createUpdateDTO } from '@/utils/createUpdateDTO';


interface UpdateDepartmentFormProps {
    dialogSwitchGetter: () => DailogSwitch,
    dialogSwitchSetter: (dialogSwitch: DailogSwitch) => void
    tableURL: string
}


const UpdateDepartmentForm: FC<UpdateDepartmentFormProps> = ({dialogSwitchGetter, dialogSwitchSetter, tableURL}) => {
    const rowState = useContext<TableRowState<DepartmentView> | undefined>(DepartmentPageContext)
    const [formState, setFormState] = useState<DepartmentFormState>(defaultDepartmentUpdateFormState)
    const [formData, setFormData] = useState<Department>(defaultDepartmentUpdateDTO)
    const [editMode, setEditMode] = useState<boolean>(false)
    const [disabled, setDisabled] = useState<boolean>(true)
    const [updateData, setUpdateData] = useState<DepartmentUpdateData>(defaultDepartmentUpdateData)
    const dispatchIsSuccess = useAppDispatch()

    const setDefaultValues = () => {
        setFormState(defaultDepartmentUpdateFormState)
        dialogSwitchSetter(DailogSwitch.Close)
        setFormData(defaultDepartmentUpdateDTO)
        rowState?.setSelectedRow({} as DepartmentView)
        setEditMode(false)
    }

    const init = async () => {
        if(rowState) {
            const tableRow = await getUpdateData<Department, number>(rowState.selectedRow.id, `${tableURL}/find-by-id`)
            if (tableRow) {
                setFormData(createUpdateDTO(formData, tableRow))
                setUpdateData(createDepartmentUpdateData(rowState.selectedRow))
            }
        }
    }

    const successCalback = ():void => {
        dispatchIsSuccess(toggle())
        setDefaultValues()
    }

    const cancelOnClick = () => {
        setDefaultValues()
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

    const setFormStates = (changeData: ChangeData) => {
        updateFormInfo(changeData, formData, setFormData, formState, setFormState)
        if(disabled) {setDisabled(false)}
    }

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
                    startContent={<Title level={TitleLevel.H6}>Промяна на Отдел</Title>}
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
                    <Label>Отдел</Label>
                        <StandardInputField
                            editMode={editMode}
                            value={formData.departmentName}
                            onChange={handleInputChange}
                            name={"departmentName"}
                            valueState={formState.departmentName.valueState}
                        />
                    </FlexBox>
                    <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label>Описание</Label>
                        <StandardInputField
                            editMode={editMode}
                            value={formData.description? formData.description: ""}
                            onChange={handleInputChange}
                            name={"description"}
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
};

export default UpdateDepartmentForm;