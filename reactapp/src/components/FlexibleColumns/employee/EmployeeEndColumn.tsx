import { FC, Fragment, useState } from 'react';
import { Bar, BarDesign, Button, FCLLayout, ObjectPage, ObjectPageSection, ObjectPageSubSection, ButtonDesign } from "@ui5/webcomponents-react";
import { EmployeeInsertDTO, defaultEmployeeInsert } from '@models/HR/Employee';
import { InsertEmployeeFormState, defaultInsertEmployeeFormState } from '@models/FormStates/employee/InsertEmployeeFormState';
import { useAppDispatch } from '@store/storeHooks';
import { toggle } from '@store/slices/toggleSlice';
import { ContractInsertDTO, defaultContractInsert } from '@models/HR/Contract';
import { PersonalDataDTO, defaultPersonalDataDTO } from '@models/HR/PersonalData';
import { isFilledForm } from '@utils/validation';
import { InsertContractFormState, defaultInsertContractFormState } from '@models/FormStates/contract/InsertContractFormState';
import { PersonalDataFormState, defaultPersonalDataFormState } from '@models/FormStates/personalData/PersonalDataFormState';
import CreateEmployeeForm from '@components/Forms/employee/CreateEmployeeForm';
import CreatePersonalDataForm from '@components/Forms/personalData/CreatePersonalDataForm';
import CreateContract from '@components/Forms/contract/CreateContractForm';


interface EmployeeEndColumnProps {
    handleLayoutState: (layout: FCLLayout) => void,
    tableURL: string
}


const EmployeeEndColumn: FC<EmployeeEndColumnProps> = ({handleLayoutState, tableURL}) => {
    const [employeeForm, setEmployeeForm] = useState<EmployeeInsertDTO>(defaultEmployeeInsert);
    const [contractForm, setContractForm] = useState<ContractInsertDTO>(defaultContractInsert);
    const [personalDataForm, setPersonalDataForm] = useState<PersonalDataDTO>(defaultPersonalDataDTO);
    const [employeeFormState, setEmployeeFormState] = useState<InsertEmployeeFormState>(defaultInsertEmployeeFormState)
    const [contractFormState, setContractFormState] = useState<InsertContractFormState>(defaultInsertContractFormState)
    const [personalDataFormState, setPersonalDataFormState] = useState<PersonalDataFormState>(defaultPersonalDataFormState)

    const dispatchIsSuccess = useAppDispatch()

    const navBackClick = () => {
        setEmployeeForm(defaultEmployeeInsert);
        setContractForm(defaultContractInsert)
        setPersonalDataForm(defaultPersonalDataDTO)
        handleLayoutState(FCLLayout.OneColumn)
    }

    const onSubmitForm = async () => {
        const isFilledEmployee = isFilledForm<InsertEmployeeFormState>(employeeFormState, setEmployeeFormState)
        const isFilledContract = isFilledForm<InsertContractFormState>(contractFormState, setContractFormState)
        const isFilledPersonalData = isFilledForm<PersonalDataFormState>(personalDataFormState, setPersonalDataFormState)
        const isFilled = isFilledEmployee && isFilledContract && isFilledPersonalData

        if (isFilled) {
            const response = await fetch(`${tableURL}/create`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                   employee_insert: {
                    ...employeeForm, 
                    company_employee_id: 123,
                    personal_data_id: 0
                },
                   personal_data: personalDataForm,
                   contract_insert: contractForm,
                }),
            });
            if (!response.ok) {
                dispatchIsSuccess(toggle())
            }
        }
    };


    return (
        <Fragment>

            <ObjectPage
                footer={
                    <Bar
                        design={BarDesign.FloatingFooter}
                        endContent={
                            <Fragment>
                                <Button design={ButtonDesign.Transparent} onClick={onSubmitForm}>Отказ</Button>
                                <Button design={ButtonDesign.Emphasized} onClick={onSubmitForm}>Създай</Button>
                            </Fragment>
                        }
                    />
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
                            getFormState={()=> {return employeeFormState}}
                            getFormData={() => {return employeeForm}}
                            setFormData={setEmployeeForm}
                            setFormState={setEmployeeFormState}
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
                            getFormData={() => {return personalDataForm}}
                            getFormState={() => {return personalDataFormState}}
                            getFormDataSetter={setPersonalDataForm}
                            getFormStateSetter={setPersonalDataFormState}
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
                            getFormData={() => {return contractForm}}
                            getFormState={() => { return contractFormState}}
                            setFormData={setContractForm}
                            setFormState={setContractFormState}
                        />
                    </ObjectPageSubSection>
                </ObjectPageSection>
            </ObjectPage>
        </Fragment>
    )
}

export default EmployeeEndColumn;