import { FC, useReducer, useContext, useState, useEffect, Fragment } from 'react';
import { Bar, Button, FCLLayout, FlexBox, FlexBoxDirection, Tab, TabContainer } from '@ui5/webcomponents-react';
import { EmployeeData, EmployeeUpdateDTO, defaultEmployeeUpdate } from '@models/HR/Employee';
import { toggle } from '@store/slices/toggleSlice';
import { useAppDispatch } from '@store/storeHooks';
import { parseValueByType } from '@utils/parsers';
import { EmployeeView } from '@models/TableViews/EmployeeView';
import { PersonalDataDTO, defaultPersonalDataDTO } from '@models/HR/PersonalData';
import { ContractUpdateDTO, defaultContractUpdate } from '@models/HR/Contract';
// import { UpdateContractFormState, defaultUpdateContractFormState } from '@models/FormStates/contract/UpdateContractFormState';
// import { PersonalDataFormState, defaultPersonalDataFormState } from '@models/FormStates/personalData/PersonalDataFormState';
// import { UpdateEmployeeFormState, defaultUpdateEmployeeFormState } from '@models/FormStates/employee/UpdateEmployeeFormState';
import DataType from '@app-types/DataType';
import { setNullValuesToEmtyString } from '@utils/forms/setNullValuesToEmtyString';
import { EmployeePageContext } from '@pages/hr/EmployeePage';
import UpdateEmployeeForm from '@components/Forms/employee/UpdateEmployeeForm';
import UpdatePersonalDataForm from '@components/Forms/personalData/UpdatePersonalDataForm';
import UpdateContract from '@components/Forms/contract/UpdateContractForm';
import { createUpdateDTO } from '@models/UpdateDTO';


interface EmployeeMidColumnProps {
    handleLayoutState: (layout: FCLLayout) => void,
    tableURL: string
}


const EmployeeMidColumn: FC<EmployeeMidColumnProps> = ({ handleLayoutState, tableURL}) => {
    const selectedRow = useContext<EmployeeView>(EmployeePageContext)

    const [employeeData, setEmployeeData] = useState<EmployeeUpdateDTO>(defaultEmployeeUpdate)
    const [contractForm, setContractForm] = useState<ContractUpdateDTO>(defaultContractUpdate);
    const [personalDataForm, setPersonalDataForm] = useState<PersonalDataDTO>(defaultPersonalDataDTO);

    // const [employeeFormState, setEmployeeFormState] = useState<UpdateEmployeeFormState>(defaultUpdateEmployeeFormState)
    // const [contractFormState, setContractFormState] = useState<UpdateContractFormState>(defaultUpdateContractFormState)
    // const [personalDataFormState, setPersonalDataFormState] = useState<PersonalDataFormState>(defaultPersonalDataFormState)


    const [editMode, toggleEditMode] = useReducer((prev) => !prev, false, undefined);
    const [isSelected, setIsSelected] = useState<boolean>(false)
    const dispatchIsSuccess = useAppDispatch()

    const getEditMode = () => {
        return editMode
    }

    const navBackClick = () => {
        handleLayoutState(FCLLayout.OneColumn)
        setIsSelected(false)
    }

    const contractFormSetter = (rowId: string, name: string) => {
        const newFormData = parseValueByType<ContractUpdateDTO>(contractForm, name, rowId, DataType.Int);
        setContractForm(newFormData);
    }

    const setData = (data: EmployeeData) => {
        const employee = data.employee
        const personalData = setNullValuesToEmtyString<PersonalDataDTO>(data.personal_data)
        let contract = data.contract

        setEmployeeData(employee)
        setPersonalDataForm(personalData)
        

        if(contract == null){
            setContractForm(defaultContractUpdate)
        }
        else {
            let contractDTO = setNullValuesToEmtyString<ContractUpdateDTO>(contract) 
            setContractForm(contractDTO)
        }
 
        setIsSelected(true)
    }

    const submitForm = async () => {
        const response = await fetch(`${tableURL}/update`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(createUpdateDTO(selectedRow.employee_id, employeeData)),
        });

        if (!response.ok) {
            dispatchIsSuccess(toggle())
        }
    };

    const getEmployeeData = async() => {
        const response = await fetch(`${tableURL}/update-data`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                employee_id: selectedRow.employee_id,
                personal_data_id: selectedRow.personal_data_id
            }),
        })
        const json = await response.json()
    
        if (response.ok) {
            const data: EmployeeData = json.data
            setData(data)
        }
        else {
            console.error(json.message)
        }
    }

    useEffect(() => {
        if (selectedRow) {
            getEmployeeData()
        }
    }, [selectedRow]);


    return (
        <Fragment>
            <Bar startContent={
                    <Button design="Transparent" icon="nav-back" onClick={navBackClick} />
                }
                endContent={
                    <Button onClick={toggleEditMode}>{editMode ? 'Display-Only Mode' : 'Edit Mode'}</Button>
                }
            />
            
            <div className="form-container">
                {isSelected &&
                    <FlexBox direction={FlexBoxDirection.Column} style={{gap:"2rem"}}>
                        <UpdateEmployeeForm
                            getEditMode={getEditMode}
                            getFormData={() => {return employeeData}}
                            setFormData={setEmployeeData}
                        />

                        <TabContainer>
                            <Tab text='Лична информация' selected>
                                <UpdatePersonalDataForm
                                    getEditMode={getEditMode}
                                    getFormData={() => {return personalDataForm}}
                                    formDataSetter={setPersonalDataForm}
                                />
                            </Tab>

                            <Tab text='Договор'>
                                <UpdateContract
                                    getEditMode={getEditMode}
                                    getFormData={() => {return contractForm}}
                                    setFormData={setContractForm}
                                    setFormDataById={contractFormSetter}
                                />
                            </Tab>
                        </TabContainer>
                    </FlexBox>
                }
            </div>

            <Bar design="Footer">
                <Button slot="endContent" onClick={submitForm }>Update</Button>
            </Bar>
        </Fragment>
    );
};

export default EmployeeMidColumn;