import { FC, useContext, useState, useEffect, Fragment } from 'react';
import { Bar, BarDesign, Button, ButtonDesign, FCLLayout, FlexBox, FlexBoxAlignItems, FlexBoxDirection, ObjectPage, ObjectPageSection, ObjectPageSubSection } from '@ui5/webcomponents-react';
import { Employee, defaultEmployee } from '@models/HR/Employee';
import { toggle } from '@store/slices/toggleSlice';
import { useAppDispatch } from '@store/storeHooks';
import { EmployeeView } from '@models/TableViews/EmployeeView';
import { PersonalData, defaultPersonalData } from '@models/HR/PersonalData';
import { Contract, defaultContract } from '@models/HR/Contract';
// import { UpdateContractFormState, defaultUpdateContractFormState } from '@models/FormStates/contract/UpdateContractFormState';
// import { PersonalDataFormState, defaultPersonalDataFormState } from '@models/FormStates/personalData/PersonalDataFormState';
// import { UpdateEmployeeFormState, defaultUpdateEmployeeFormState } from '@models/FormStates/employee/UpdateEmployeeFormState';
import { setNullValuesToEmtyString } from '@utils/forms/setNullValuesToEmtyString';
import { EmployeePageContext } from '@pages/hr/EmployeePage';
import UpdateEmployeeForm from '@components/Forms/employee/UpdateEmployeeForm';
import UpdatePersonalDataForm from '@components/Forms/personalData/UpdatePersonalDataForm';
import UpdateContract from '@components/Forms/contract/UpdateContractForm';
import { ContractUpdateFormData, UpdateContractFormState, defaultUpdateContractFormState } from '@/models/FormStates/contract/UpdateContractFormState';
import { EmployeeFormUpdateData, UpdateEmployeeFormState, defaultUpdateEmployeeFormState } from '@/models/FormStates/employee/UpdateEmployeeFormState';
import { EmployeeData, EmployeeDataEditBtnState, EmployeeDataUpdate, createEmployeeDataUpdate, defaultEditBtnsState } from '@/models/HR/EmployeeData';
import { submitPutForm } from '@/utils/forms/submitForm';
import { PersonalDataFormState, defaultPersonalDataFormState } from '@/models/FormStates/personalData/PersonalDataFormState';


interface EmployeeMidColumnProps {
    handleLayoutState: (layout: FCLLayout) => void,
    tableURL: string
}




const EmployeeMidColumn: FC<EmployeeMidColumnProps> = ({ handleLayoutState, tableURL}) => {
    const selectedRow = useContext<EmployeeView>(EmployeePageContext)
    const [employeeForm, setEmployeeForm] = useState<Employee>(defaultEmployee)
    const [contractForm, setContractForm] = useState<Contract>(defaultContract);
    const [pDataForm, setPDataForm] = useState<PersonalData>(defaultPersonalData);

    const [employeeFormState, setEmployeeFormState] = useState<UpdateEmployeeFormState>(defaultUpdateEmployeeFormState)
    const [contractFormState, setContractFormState] = useState<UpdateContractFormState>(defaultUpdateContractFormState)
    const [pDataFormState, setPDataFormState] = useState<PersonalDataFormState>(defaultPersonalDataFormState)

    const [conUpdateData, setConUpdateData] = useState<ContractUpdateFormData>({} as ContractUpdateFormData)
    const [empUpdateData, setEmpUpdateData] = useState<EmployeeFormUpdateData>({} as EmployeeFormUpdateData)
    const [editMode, setEditMode] = useState<EmployeeDataEditBtnState>(defaultEditBtnsState);
    const dispatchIsSuccess = useAppDispatch()

    const setDefaultValues = () => {
        setEmployeeForm(defaultEmployee)
        setContractForm(defaultContract)
        setPDataForm(defaultPersonalData)

        setEmployeeFormState(defaultUpdateEmployeeFormState)
        setContractFormState(defaultUpdateContractFormState)
        setPDataFormState(defaultPersonalDataFormState)

        handleLayoutState(FCLLayout.OneColumn)
    }

    const successCalback = ():void => {
        dispatchIsSuccess(toggle())
        setDefaultValues()
    }

    const navBackClick = () => {
        setDefaultValues()
    }

    const setData = (data: EmployeeData) => {
        const employee = data.employee
        const personalData = setNullValuesToEmtyString<PersonalData>(data.personalData)
        let contract = data.contract

        setEmployeeForm(employee)
        setPDataForm(personalData)

        if(contract == null){
            setContractForm(defaultContract)
        }
        else {
            let contractDTO = setNullValuesToEmtyString<Contract>(contract) 
            setContractForm(contractDTO)
        }
 
    }

    const getEmployeeData = async() => {
        const response = await fetch(`${tableURL}/update-data`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                employeeId: selectedRow.employeeId,
                personalDataId: selectedRow.personalDataId,
                contractId: selectedRow.contractId
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


    const submitForm = async () => {
        let object: EmployeeDataUpdate = createEmployeeDataUpdate(
            employeeForm, pDataForm, {...contractForm, changeDate: new Date()}
        )

        submitPutForm(tableURL, JSON.stringify(object), successCalback)
    };


    useEffect(() => {
        if (selectedRow) {
            getEmployeeData()
        }
    }, [selectedRow]);


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
                        getFormData={() => {return employeeForm}}
                        setFormData={setEmployeeForm}
                        getFormState={() => {return employeeFormState}}
                        setFormState={setEmployeeFormState}
                        getUpdateData={() => {return empUpdateData}}
                        setUpdateData={setEmpUpdateData}
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
                        getFormData={() => {return pDataForm}}
                        setFormData={setPDataForm}
                        getFormState={() => {return pDataFormState}}
                        setFormState={setPDataFormState}
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
                        getFormData={() => {return contractForm}}
                        setFormData={setContractForm}
                        getFormState={() => {return contractFormState}}
                        setFormState={setContractFormState}
                        getUpdateData={() => {return conUpdateData}}
                        setUpdateData={setConUpdateData}
                    />
                </ObjectPageSubSection>
            </ObjectPageSection>
            
        </ObjectPage>
    );
};

export default EmployeeMidColumn;