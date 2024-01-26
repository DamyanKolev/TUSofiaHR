import { FC, useContext, useState, useEffect, Fragment } from 'react';
import { Bar, BarDesign, Button, ButtonDesign, DatePickerDomRef, FCLLayout, FlexBox, FlexBoxAlignItems, FlexBoxDirection, InputDomRef, ObjectPage, ObjectPageSection, ObjectPageSubSection, RadioButtonDomRef, StandardListItemDomRef, Ui5CustomEvent, ValueState } from '@ui5/webcomponents-react';
import { toggle } from '@store/slices/toggleSlice';
import { useAppDispatch } from '@store/storeHooks';
import { EmployeeView } from '@models/TableViews/EmployeeView';
import { getNewFormDataFromNestedForms } from '@/utils/forms/formData';
import { EmployeePageContext } from '@pages/hr/EmployeePage';
import UpdateEmployeeForm from '@components/Forms/employee/UpdateEmployeeForm';
import UpdatePersonalDataForm from '@components/Forms/personalData/UpdatePersonalDataForm';
import UpdateContract from '@components/Forms/contract/UpdateContractForm';
import { EmployeeData, EmployeeDataEditBtnState, EmployeeDataUpdate, EmployeeDataUpdateDTO, defaultEditBtnsState, defaultEmployeeDataUpdate } from '@/models/HR/EmployeeData';
import { submitPutForm } from '@/utils/forms/submitForm';
import { EmpDataUpdateFormState, EmployeeDataUpdateData, defaultEmpDataUpdateState, defaultEmployeeDataUpdateData } from '@/models/FormStates/employeeData/EmpDataUpdateFormState';
import { TableRowState } from '@/types/TableRowState';
import { getUpdateData } from '@/utils/getData';
import { createContractUpdateData } from '@/models/FormStates/contract/UpdateContractFormState';
import { createEmployeeUpdateData } from '@/models/FormStates/employee/UpdateEmployeeFormState';
import { isFilledForm, isFormChanged } from '@/utils/validation';
import { getNewFormStateFromNestedForms, setErrorInputStates } from '@/utils/forms/formState';
import { handleDateChangeFunc, handleInputChangeFunc, handleRadioButtonChangeFunc } from '@/utils/handlers/onChangeHandlers';
import { DatePickerChangeEventDetail } from '@ui5/webcomponents/dist/DatePicker.js';
import DataType from '@/types/DataType';


interface EmployeeMidColumnProps {
    handleLayoutState: (layout: FCLLayout) => void,
    tableURL: string
}




const EmployeeMidColumn: FC<EmployeeMidColumnProps> = ({ handleLayoutState, tableURL}) => {
    const rowState = useContext<TableRowState<EmployeeView> | undefined>(EmployeePageContext)
    const [formData, setFormData] = useState<EmployeeDataUpdate>(defaultEmployeeDataUpdate)
    const [formState, setFormState] = useState<EmpDataUpdateFormState>(defaultEmpDataUpdateState)
    const [updateData, setUpdateData] = useState<EmployeeDataUpdateData>(defaultEmployeeDataUpdateData)
    const [editMode, setEditMode] = useState<EmployeeDataEditBtnState>(defaultEditBtnsState);
    const [disabled, setDisabled] = useState<boolean>(true)
    const dispatchIsSuccess = useAppDispatch()


    const init = async () => {
        if(rowState) {
            const bodyData = {
                employeeId: rowState.selectedRow.employeeId,
                personalDataId: rowState.selectedRow.personalDataId,
                contractId: rowState.selectedRow.contractId
            }
            const data = await getUpdateData<EmployeeData, object>(bodyData, `${tableURL}/update-data`)
    
            if (data != null) {
                const newFormData:EmployeeDataUpdate = {
                    employee: data.employee,
                    contract: data.contract,
                    personalData: data.personalData
                }
                setFormData(newFormData)
                setUpdateData({
                    contract: createContractUpdateData((data.contractView)),
                    employee: createEmployeeUpdateData(rowState.selectedRow)
                })
            }
        }
    }


    const setDefaultValues = () => {
        setFormData(defaultEmployeeDataUpdate)
        setFormState(defaultEmpDataUpdateState)
        setEditMode(defaultEditBtnsState)
        handleLayoutState(FCLLayout.OneColumn)
        rowState?.setSelectedRow({} as EmployeeView)
    }

    const successCalback = ():void => {
        dispatchIsSuccess(toggle())
        setDefaultValues()
    }

    const navBackClick = () => {
        setDefaultValues()
    }



    const submitForm = async () => {
        let object: EmployeeDataUpdateDTO = formData
        let isSubmittable = false

        Object.entries(formState).forEach(([key, value]) => {
            const fieldType = typeof value
            if(fieldType == "object"){
                if (isFormChanged(value)){
                    if (isFilledForm(value)) {
                        isSubmittable = true
                    }
                    else {
                        isSubmittable = false
                        setErrorInputStates(value, (newState): void => {setFormState({...formState, [key]: newState})})
                    }
                }
                else {
                    object = {...object, [key]: null}
                }
            }
        })

        if (isSubmittable) {
            submitPutForm(tableURL, object, successCalback)
        }
    };


    useEffect(() => {
        if(rowState) {
            if (Object.keys(rowState.selectedRow).length > 0) {
                init()
            }
        }
    }, [rowState]);



        //input change event listener 
        const handleInputChange = (event: Ui5CustomEvent<InputDomRef, never>) => {
            const target = event.target
            handleInputChangeFunc(target, formData, setFormData, formState, setFormState);
            if (disabled) {setDisabled(false)}
        };
    
        //date input change event listener 
        const handleDateChange = (event: Ui5CustomEvent<DatePickerDomRef, DatePickerChangeEventDetail>) => {
            const target = event.target
            handleDateChangeFunc(target, formData, setFormData, formState, setFormState);
            if (disabled) {setDisabled(false)}
        }
    
        //radio button change event listener 
        const handleRadioButtonChange = (event: Ui5CustomEvent<RadioButtonDomRef, never>) => {
            const target = event.target
            handleRadioButtonChangeFunc(target, formData, setFormData, formState, setFormState);
            if (disabled) {setDisabled(false)}
        }
    
    
        const handleConfirm = (selectedItem: StandardListItemDomRef, name: string) => {
            const rowId = selectedItem.id
            const value = selectedItem.textContent? selectedItem.textContent : ""
            const newFormData = getNewFormDataFromNestedForms(formData, name, rowId, DataType.Int)
            const newUpdateData = getNewFormDataFromNestedForms(updateData, name, value, DataType.String);
            const formFieldState = { isFilled: true, valueState: ValueState.None, message: "", isChanged: true}
            const newFormStates = getNewFormStateFromNestedForms(formState, name, formFieldState)

            setFormData(newFormData);
            setFormState(newFormStates)
            setUpdateData(newUpdateData)
            if (disabled) {setDisabled(false)}
        }


    return (
        <ObjectPage 
            footer={
                <Bar
                    design={BarDesign.FloatingFooter}
                    endContent={
                        <Fragment>
                            <Button design={ButtonDesign.Transparent}>Отказ</Button>
                            <Button design={ButtonDesign.Emphasized} onClick={submitForm}>Промени</Button>
                        </Fragment>
                    }
                />
            }
            headerTitle={
                <Button design="Transparent" icon="nav-back" onClick={navBackClick}/>
            }
            style={{
                height: 'calc(100vh - 3.73rem)'
            }}
            >
            <ObjectPageSection
                id="employee"
                titleText="Служител"
            >
                <ObjectPageSubSection
                    hideTitleText
                    titleText="Служител"
                    id="employee-info"
                >
                    <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column}>
                        <Button onClick={()=>setEditMode({...editMode, empEdit: !editMode.empEdit})}>{editMode.empEdit ? 'Display-Only' : 'Edit Mode'}</Button>
                    </FlexBox>
                    <UpdateEmployeeForm
                        getEditMode={() => {return editMode.empEdit}}
                        getFormData={() => {return formData.employee}}
                        getFormState={() => {return formState.employee}}
                        getUpdateData={() => {return updateData.employee}}
                        handleInputChange={handleInputChange}
                        handleConfirm={handleConfirm}
                    />
                </ObjectPageSubSection>

            </ObjectPageSection>



            <ObjectPageSection
                id="personal"
                titleText="Лична данни"
            >
                <ObjectPageSubSection
                    hideTitleText
                    titleText="Лична данни"
                    id="personal-data-info"
                >
                     <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column}>
                        <Button onClick={()=>setEditMode({...editMode, pDataEdit: !editMode.pDataEdit})}>{editMode.pDataEdit ? 'Display-Only' : 'Edit Mode'}</Button>
                    </FlexBox>
                    <UpdatePersonalDataForm
                        getEditMode={() => {return editMode.pDataEdit}}
                        getFormData={() => {return formData.personalData}}
                        getFormState={() => {return formState.personalData}}
                        handleInputChange={handleInputChange}
                        handleDateChange={handleDateChange}
                        handleRadioButtonChange={handleRadioButtonChange}
                    />
                </ObjectPageSubSection>

            </ObjectPageSection>


            <ObjectPageSection
                id="contract"
                titleText="Договор"
            >
                <ObjectPageSubSection
                    hideTitleText
                    titleText="Договор"
                    id="contract-info"
                >
                    <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column}>
                        <Button onClick={()=>setEditMode({...editMode, conEdit: !editMode.conEdit})}>{editMode.conEdit ? 'Display-Only' : 'Edit Mode'}</Button>
                    </FlexBox>
                    <UpdateContract
                        getEditMode={() => {return editMode.conEdit}}
                        getFormData={() => {return formData.contract}}
                        getFormState={() => {return formState.contract}}
                        getUpdateData={() => {return updateData.contract}}
                        handleInputChange={handleInputChange}
                        handleDateChange={handleDateChange}
                        handleConfirm={handleConfirm}
                    />
                </ObjectPageSubSection>
            </ObjectPageSection>
            
        </ObjectPage>
    );
};

export default EmployeeMidColumn;