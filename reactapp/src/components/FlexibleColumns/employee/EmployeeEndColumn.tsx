import { FC, useEffect, useState } from 'react';
import { 
    Bar, BarDesign, Button, FCLLayout, ObjectPage, ObjectPageSection, ObjectPageSubSection, ButtonDesign, StandardListItemDomRef, FlexBox
} from "@ui5/webcomponents-react";
import { EmployeeInsertFormState } from '@models/States/employee/EmployeeInsertFormState';
import { useAppDispatch } from '@store/storeHooks';
import { toggle } from '@store/slices/toggleSlice';
import { isFilledCertainField, isFilledForm, isFormChanged } from '@utils/validation';
import { ContractInsertFormState } from '@models/States/contract/ContractInsertFormState';
import { PDataFormState } from '@models/States/personalData/PersonalDataFormState';
import CreateEmployeeForm from '@components/Forms/employee/CreateEmployeeForm';
import CreatePersonalDataForm from '@components/Forms/personalData/CreatePersonalDataForm';
import CreateContract from '@components/Forms/contract/CreateContractForm';
import { submitPostForm } from '@utils/forms/submitForm';
import { EmployeeDataInsertDTO, EmployeeDataInsert, createEmployeeDataInsertDTO, defaultEmployeeDataInsert } from '@models/HR/EmployeeData';
import { formToggle } from '@store/slices/formToggleSlice';
import { EmpDataInsertFormState, defaultEmpDataInsertState } from '@models/States/employeeData/EmpDataInsertFormState';
import { setErrorInputStates } from '@utils/forms/formState';
import { updateFormInfo } from '@utils/forms/updateFormInfo';
import DataType from '@app-types/enums/DataType';
import { ChangeData } from '@models/EventData/ChangeData';
import CreateAddressForm from '@components/Forms/address/CreateAddressForm';
import { AddressFormState } from '@models/States/address/AddressFormState';
import CreateInsuranceForm from '@components/Forms/insurance/CreateInsuranceForm';
import { InsuranceFormState } from '@models/States/insurance/InsuranceFormState';
import { InsuranceDTO } from '@models/HR/Insurance';



interface EmployeeEndColumnProps {
    handleLayoutState: (layout: FCLLayout) => void,
    tableURL: string
}


const EmployeeEndColumn: FC<EmployeeEndColumnProps> = ({handleLayoutState, tableURL}) => {
    const [formData, setFormData] = useState<EmployeeDataInsert>(defaultEmployeeDataInsert)
    const [formState, setFormState] = useState<EmpDataInsertFormState>(defaultEmpDataInsertState)
    const [disabled, setDisabled] = useState<boolean>(true)
    const [isIconomicSelected, setIsIconomicSelected] = useState<boolean>(false)
    const dispatchIsSuccess = useAppDispatch()

    const setInsuranceFormState = (newState: InsuranceFormState) => {setFormState({...formState, insurance: newState})}
    const setAddressFormState = (newState: AddressFormState) => {setFormState({...formState, address: newState})}
    const setPDataFormState = (newState: PDataFormState) => {setFormState({...formState, personalData: newState})}
    const setContractFormState = (newState: ContractInsertFormState) => {setFormState({...formState, contract: newState})}
    const setEmployeeFormState = (newState: EmployeeInsertFormState) => {setFormState({...formState, employee: newState})}

    
    const setDefaultValues = () => {
        setFormData(defaultEmployeeDataInsert)
        setFormState(defaultEmpDataInsertState)
        handleLayoutState(FCLLayout.OneColumn)
        dispatchIsSuccess(formToggle())
        setIsIconomicSelected(false)
        setDisabled(true)
    }

    const setFormStates = (changeData: ChangeData) => {
        updateFormInfo(changeData, formData, setFormData, formState, setFormState)
        if(disabled) {setDisabled(false)}
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
        const isFilledAddress = isFilledForm(formState.address)
        const isFilledInsurance = isFilledForm(formState.insurance)
        const isChangedContract = isFormChanged(formState.contract)

        let formObject: EmployeeDataInsertDTO = createEmployeeDataInsertDTO(
            formData.employee, formData.personalData, null, null, formData.address
        )

        if(isChangedContract){
            const isFilled = isFilledEmployee && isFilledContract && isFilledPersonalData && isFilledAddress && isFilledInsurance
            if(isFilled) {
                formObject.contract= formData.contract
                formObject.insurance= formData.insurance
                await submitPostForm(`${tableURL}/create`, formObject, successCalback)
            }
            else {
                setErrorInputStates(formState.employee, setEmployeeFormState)
                setErrorInputStates(formState.contract, setContractFormState)
                setErrorInputStates(formState.personalData, setPDataFormState)
                setErrorInputStates(formState.address, setAddressFormState)
                setErrorInputStates(formState.insurance, setInsuranceFormState)
            }
        }
        else {
            const isFilled = isFilledEmployee && isFilledPersonalData
            if(isFilled) {
                await submitPostForm(`${tableURL}/create`, formObject, successCalback)
            }
            else {
                setErrorInputStates(formState.employee, setEmployeeFormState)
                setErrorInputStates(formState.personalData, setPDataFormState)
                setErrorInputStates(formState.address, setAddressFormState)
            }
        }
    };


    const handleConfirm = (selectedItem: StandardListItemDomRef, name: string) => {
        const changeData: ChangeData = {
            value: selectedItem.id,
            name: name,
            valueType: DataType.Int,
        }
        setFormStates(changeData)
    }


    useEffect(() => {
        if(!isIconomicSelected) {
            const result = isFilledCertainField(formState.contract, "sys_iconomic_activity_id")
            setIsIconomicSelected(result)
        }
    }, [formState.contract])


    return (
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
                        setFormStates={setFormStates}
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
                    <FlexBox style={{gap:"4rem", padding:".3rem 2rem"}}>
                        <CreatePersonalDataForm
                            getFormState={() => {return formState.personalData}}
                            getFormData={() => {return formData.personalData}}
                            setFormStates={setFormStates}
                        />
                        <CreateAddressForm
                            getFormState={() => {return formState.address}}
                            getFormData={() => {return formData.address}}
                            setFormStates={setFormStates}
                        />
                    </FlexBox>
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
                        style={{gap:"4rem", padding:".3rem 2rem"}}
                        getFormState={() => {return formState.contract}}
                        getFormData={() => {return formData.contract}}
                        setFormStates={setFormStates}
                        handleConfirm={handleConfirm}
                    />
                </ObjectPageSubSection>
            </ObjectPageSection>



            <ObjectPageSection
                id="insurance"
                titleText={isIconomicSelected? "Осигуровки" : ""}
            >
                {
                    isIconomicSelected &&
                    <ObjectPageSubSection
                        hideTitleText
                        titleText="Осигуровки"
                        id="insurance-info"
                    >
                        <CreateInsuranceForm
                            getFormState={() => {return formState.insurance}}
                            getFormData={() => {return formData.insurance}}
                            setFormStates={setFormStates}
                            setFormData={(newData: InsuranceDTO) => {setFormData({...formData, insurance: newData})}}
                            handleConfirm={handleConfirm}
                        />
                    </ObjectPageSubSection>
                }
            </ObjectPageSection>
        </ObjectPage>
    )
}

export default EmployeeEndColumn;