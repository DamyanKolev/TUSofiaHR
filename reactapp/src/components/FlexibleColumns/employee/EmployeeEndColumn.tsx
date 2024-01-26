import { FC, Fragment, useState } from 'react';
import { Bar, BarDesign, Button, FCLLayout, ObjectPage, ObjectPageSection, ObjectPageSubSection, ButtonDesign, Ui5CustomEvent, InputDomRef, DatePickerDomRef, RadioButtonDomRef, StandardListItemDomRef, ValueState } from "@ui5/webcomponents-react";
import { InsertEmployeeFormState} from '@models/FormStates/employee/InsertEmployeeFormState';
import { useAppDispatch } from '@store/storeHooks';
import { toggle } from '@store/slices/toggleSlice';
import { isFilledForm, isFormChanged } from '@utils/validation';
import { InsertContractFormState} from '@/models/FormStates/contract/InsertContractFormState';
import { PDataFormState} from '@models/FormStates/personalData/PersonalDataFormState';
import CreateEmployeeForm from '@components/Forms/employee/CreateEmployeeForm';
import CreatePersonalDataForm from '@components/Forms/personalData/CreatePersonalDataForm';
import CreateContract from '@components/Forms/contract/CreateContractForm';
import { formToggle } from '@/store/slices/formToggleSlice';
import { getNewFormStateFromNestedForms, setErrorInputStates } from '@/utils/forms/formState';
import { submitPostForm } from '@/utils/forms/submitForm';
import { EmployeeDataInsert, createEmployeeDataInsertDTO, defaultEmployeeDataInsert } from '@/models/HR/EmployeeData';
import { EmpDataInsertFormState, defaultEmpDataInsertState } from '@/models/FormStates/employeeData/EmpDataInsertFormState';
import { handleDateChangeFunc, handleInputChangeFunc, handleRadioButtonChangeFunc } from '@/utils/handlers/onChangeHandlers';
import { DatePickerChangeEventDetail } from '@ui5/webcomponents/dist/DatePicker.js';
import DataType from '@/types/DataType';
import { getNewFormDataFromNestedForms } from '@/utils/forms/formData';


interface EmployeeEndColumnProps {
    handleLayoutState: (layout: FCLLayout) => void,
    tableURL: string
}


const EmployeeEndColumn: FC<EmployeeEndColumnProps> = ({handleLayoutState, tableURL}) => {
    const [formData, setFormData] = useState<EmployeeDataInsert>(defaultEmployeeDataInsert)
    const [formState, setFormState] = useState<EmpDataInsertFormState>(defaultEmpDataInsertState)
    const [disabled, setDisabled] = useState<boolean>(true)
    const setPDataFormState = (newState: PDataFormState) => {setFormState({...formState, personalData: newState})}
    const setContractFormState = (newState: InsertContractFormState) => {setFormState({...formState, contract: newState})}
    const setEmployeeFormState = (newState: InsertEmployeeFormState) => {setFormState({...formState, employee: newState})}
    const dispatchIsSuccess = useAppDispatch()


    const setDefaultValues = () => {
        setFormData(defaultEmployeeDataInsert)
        setFormState(defaultEmpDataInsertState)
        handleLayoutState(FCLLayout.OneColumn)
        dispatchIsSuccess(formToggle())
        setDisabled(true)
    }

    const navBackClick = ():void => {
        setDefaultValues()
    }

    const successCalback = ():void => {
        dispatchIsSuccess(toggle())
        setDefaultValues()
    }


    const onSubmitForm = async () => {
        const isFilledEmployee = isFilledForm(formState.employee)
        const isFilledContract = isFilledForm(formState.contract)
        const isFilledPersonalData = isFilledForm(formState.personalData)
        const isChangedContract = isFormChanged(formState.contract)

        let formObject = createEmployeeDataInsertDTO(formData.employee, formData.personalData, null)

        if(isChangedContract){
            const isFilled = isFilledEmployee && isFilledContract && isFilledPersonalData
            if(isFilled) {
                formObject.contract= formData.contract
                await submitPostForm(`${tableURL}/create`, JSON.stringify(formObject), successCalback)
            }
            else {
                setErrorInputStates(formState.employee, setEmployeeFormState)
                setErrorInputStates(formState.contract, setContractFormState)
                setErrorInputStates(formState.personalData, setPDataFormState)
            }
        }
        else {
            const isFilled = isFilledEmployee && isFilledPersonalData
            if(isFilled) {
                await submitPostForm(`${tableURL}/create`, JSON.stringify(formObject), successCalback)
            }
            else {
                setErrorInputStates(formState.employee, setEmployeeFormState)
                setErrorInputStates(formState.personalData, setPDataFormState)
            }
        }
    };

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
        const newFormData = getNewFormDataFromNestedForms(formData, name, rowId, DataType.Int)
        const formFieldState = { isFilled: true, valueState: ValueState.None, message: "", isChanged: true}
        const newFormStates = getNewFormStateFromNestedForms(formState, name, formFieldState)

        setFormData(newFormData);
        setFormState(newFormStates)
        if (disabled) {setDisabled(false)}
    }


    return (
        <Fragment>

            <ObjectPage
                footer={
                    <Bar design={BarDesign.FloatingFooter}>
                        <Button slot="endContent" design={ButtonDesign.Transparent} onClick={navBackClick}>Отказ</Button>
                        <Button slot="endContent" design={ButtonDesign.Emphasized} onClick={onSubmitForm} disabled={disabled}>Запази</Button>
                    </Bar>
                }
                headerContent={
                    <Bar design={BarDesign.Subheader} 
                        startContent={<Button design="Transparent" icon="nav-back" onClick={navBackClick}/>}
                    />
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
                        <CreateEmployeeForm
                            getFormState={() => {return formState.employee}}
                            getFormData={() => {return formData.employee}}
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
                        <CreatePersonalDataForm
                            getFormState={() => {return formState.personalData}}
                            getFormData={() => {return formData.personalData}}
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
                        <CreateContract
                            getFormState={() => {return formState.contract}}
                            getFormData={() => {return formData.contract}}
                            handleInputChange={handleInputChange}
                            handleDateChange={handleDateChange}
                            handleConfirm={handleConfirm}
                        />
                    </ObjectPageSubSection>
                </ObjectPageSection>
            </ObjectPage>
        </Fragment>
    )
}

export default EmployeeEndColumn;