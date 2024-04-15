import { FC, useContext, useState, useEffect } from 'react';
import { Bar, BarDesign, Button, ButtonDesign, FCLLayout, FlexBox, FlexBoxAlignItems, FlexBoxDirection, ObjectPage, ObjectPageSection, ObjectPageSubSection, StandardListItemDomRef} from '@ui5/webcomponents-react';
import { toggle } from '@store/slices/toggleSlice';
import { useAppDispatch } from '@store/storeHooks';
import { EmployeeView } from '@models/TableViews/EmployeeView';
import { EmployeePageContext } from '@pages/hr/EmployeePage';
import UpdateEmployeeForm from '@components/Forms/employee/UpdateEmployeeForm';
import UpdatePersonalDataForm from '@components/Forms/personalData/UpdatePersonalDataForm';
import UpdateContract from '@components/Forms/contract/UpdateContractForm';
import { submitPutForm } from '@utils/forms/submitForm';
import { EmployeeData, EmployeeDataEditBtnState, EmployeeDataUpdateDTO, EmployeeDataUpdate, defaultEditBtnsState, defaultEmployeeDataUpdate } from '@models/HR/EmployeeData';
import { createEmployeeUpdateData  } from '@models/States/employee/EmployeeUpdateFormState';
import { createContractUpdateData } from '@models/States/contract/ContractUpdateFormState';
import { EmployeeDataUpdateData, EmpDataUpdateFormState, defaultEmployeeDataUpdateData, defaultEmpDataUpdateState } from '@models/States/employeeData/EmpDataUpdateFormState';
import { updateFormInfo } from '@utils/forms/updateFormInfo';
import DataType from '@app-types/enums/DataType';
import { isFilledForm, isFormChanged } from '@utils/validation';
import { getUpdateData } from '@utils/getData';
import { getNewFormDataFromNestedForms } from '@utils/forms/formData';
import { setErrorInputStates } from '@utils/forms/formState';
import { TableRowState } from '@app-types/TableRowState';
import { ChangeData } from '@models/EventData/ChangeData';
import UpdateInsuranceForm from '@components/Forms/insurance/UpdateInsuranceForm';
import { createInsuranceUpdateData } from '@models/States/insurance/InsuranceFormState';
import { Insurance } from '@models/HR/Insurance';
import UpdateAddressForm from '@components/Forms/address/UpdateAddressForm';


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
                employee_id: rowState.selectedRow.employeeId,
                personal_data_id: rowState.selectedRow.personalDataId
            }
            const data = await getUpdateData<EmployeeData, object>(bodyData, `${tableURL}/update-data`)
    
            if (data != null) {
                const newFormData:EmployeeDataUpdate = {
                    employee: data.employee,
                    contract: data.contract,
                    personalData: data.personalData,
                    insurance: data.insurance,
                    address: data.address
                }
                setFormData(newFormData)
                setUpdateData({
                    contract: createContractUpdateData((data.contractView)),
                    employee: createEmployeeUpdateData(rowState.selectedRow),
                    insurance: createInsuranceUpdateData(rowState.selectedRow.insuranceTypeCode)
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

    const setFormStates = (changeData: ChangeData) => {
        updateFormInfo(changeData, formData, setFormData, formState, setFormState)
        if(disabled) {setDisabled(false)}
    }

    const navBackClick = () => {
        setDefaultValues()
    }

    const submitForm = async () => {
        let object: EmployeeDataUpdateDTO = formData
        let isSubmittable = false

        Object.entries(formState).forEach(([key, stateObject]) => {
            if (isFormChanged(stateObject)){
                if (isFilledForm(stateObject)) {
                    isSubmittable = true
                }
                else {
                    isSubmittable = false
                }
            }
            else {
                object = {...object, [key]: null}
            }
        })


        if (isSubmittable) {
            submitPutForm(tableURL, object, successCalback)  
        }
                else {
            Object.entries(formState).forEach(([key, value]) => {
                setErrorInputStates(value, (newState): void => {setFormState({...formState, [key]: newState})})
            })
        }
    };



    useEffect(() => {
        if(rowState) {
            if (Object.keys(rowState.selectedRow).length > 0) {
                init()
            }
        }
    }, [rowState]);

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
        <ObjectPage 
            footer={
                <Bar design={BarDesign.FloatingFooter}>
                    <Button slot="endContent" design={ButtonDesign.Transparent} onClick={navBackClick}>Отказ</Button>
                    <Button slot="endContent" design={ButtonDesign.Emphasized} onClick={submitForm} disabled={disabled}>Запази</Button>
                </Bar>
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
                     <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column}>
                        <Button onClick={()=>setEditMode({...editMode, pDataEdit: !editMode.pDataEdit})}>{editMode.pDataEdit ? 'Display-Only' : 'Edit Mode'}</Button>
                    </FlexBox>
                    <FlexBox style={{gap:"4rem", padding:".3rem 2rem"}}>
                        <UpdatePersonalDataForm
                            getEditMode={() => {return editMode.pDataEdit}}
                            getFormData={() => {return formData.personalData}}
                            getFormState={() => {return formState.personalData}}
                            setFormStates={setFormStates}
                        />
                        <UpdateAddressForm
                            getEditMode={() => {return editMode.pDataEdit}}
                            getFormData={() => {return formData.address}}
                            getFormState={() => {return formState.address}}
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
                    <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column}>
                        <Button onClick={()=>setEditMode({...editMode, conEdit: !editMode.conEdit})}>{editMode.conEdit ? 'Display-Only' : 'Edit Mode'}</Button>
                    </FlexBox>
                    <UpdateContract
                        getEditMode={() => {return editMode.conEdit}}
                        getFormData={() => {return formData.contract}}
                        getFormState={() => {return formState.contract}}
                        getUpdateData={() => {return updateData.contract}}
                        setFormStates={setFormStates}
                        handleConfirm={handleConfirm}
                    />
                </ObjectPageSubSection>
            </ObjectPageSection>


            <ObjectPageSection
                id="insurance"
                titleText="Осигуровки"
            >
                <ObjectPageSubSection
                    hideTitleText
                    titleText="Осигуровки"
                    id="insurance-info"
                >
                    <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column}>
                        <Button onClick={()=>setEditMode({...editMode, insuranceEdit: !editMode.insuranceEdit})}>{editMode.insuranceEdit ? 'Display-Only' : 'Edit Mode'}</Button>
                    </FlexBox>
                    <UpdateInsuranceForm
                        getEditMode={() => {return editMode.insuranceEdit}}
                        getFormState={() => { return formState.insurance; } }
                        getFormData={() => { return formData.insurance } }
                        getUpdateData={() => {return updateData.insurance}}
                        setFormStates={setFormStates}
                        setFormData={(newData: Insurance) => {setFormData({...formData, insurance: newData})}}
                        handleConfirm={handleConfirm} 
                    />
                </ObjectPageSubSection>
            </ObjectPageSection>
            
        </ObjectPage>
    );
};

export default EmployeeMidColumn;