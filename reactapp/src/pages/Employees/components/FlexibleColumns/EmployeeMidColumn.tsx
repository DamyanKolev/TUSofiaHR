import { FC, useContext, useState, useEffect } from 'react';
import { Bar, BarDesign, Button, ButtonDesign, ButtonType, FCLLayout, FlexBox, FlexBoxAlignItems, FlexBoxDirection, ObjectPage, ObjectPageSection, ObjectPageSubSection } from '@ui5/webcomponents-react';
import { toggle } from '@store/slices/toggleSlice';
import { useAppDispatch } from '@store/storeHooks';
import { EmployeeView } from '@/pages/Employees/models/EmployeeView';
import { EmployeePageContext } from '@/pages/Employees/EmployeePage';
import UpdateEmployeeForm from '@/pages/Employees/components/Forms/employee/UpdateEmployeeForm';
import { submitPutForm } from '@utils/forms/submitForm';
import { getUpdateData } from '@utils/getData';
import { TableRowState } from '@app-types/TableRowState';
import UpdateInsuranceForm from '@/pages/Employees/components/Forms/insurance/UpdateInsuranceForm';
import { defaultEditBtnsState, defaultEmployeeDataUpdate, defaultEmployeeDataUpdateData, EmployeeData, EmployeeDataEditBtnState, EmployeeDataUpdate, EmployeeDataUpdateData, EmployeeDataUpdateDTO } from '../../models/EmployeeData';
import { EmployeeDataUpdateSchema } from '../../models/schemes/EmployeeDataSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import UpdatePersonalDataForm from '../Forms/personalData/UpdatePersonalDataForm';
import UpdateContractForm from '../Forms/contract/UpdateContractForm';
import UpdateAddressForm from '../Forms/address/UpdateAddressForm';
import { createContractUpdateData } from '@/pages/Contracts/models/Contract';
import { createEmployeeUpdateData } from '../../models/Employee';
import { createInsuranceUpdateData } from '../../models/Insurance';


interface EmployeeMidColumnProps {
    handleLayoutState: (layout: FCLLayout) => void,
    tableURL: string
}


const EmployeeMidColumn: FC<EmployeeMidColumnProps> = ({ handleLayoutState, tableURL}) => {
    const rowState = useContext<TableRowState<EmployeeView> | undefined>(EmployeePageContext)
    const [updateData, setUpdateData] = useState<EmployeeDataUpdateData>(defaultEmployeeDataUpdateData)
    const [editMode, setEditMode] = useState<EmployeeDataEditBtnState>(defaultEditBtnsState);
    const dispatchIsSuccess = useAppDispatch()
    const {
        handleSubmit,
        reset,
        control,
        getValues,
        setValue,
    } = useForm<EmployeeDataUpdateDTO>({
        defaultValues: defaultEmployeeDataUpdate,
        mode: "onChange",
        resolver: zodResolver(EmployeeDataUpdateSchema),
    });

    const init = async () => {
        if(rowState) {
            const bodyData = {
                employeeId: rowState.selectedRow.employeeId,
                personalDataId: rowState.selectedRow.personalDataId
            }
            const data = await getUpdateData<EmployeeData, object>(bodyData, `${tableURL}/update-data`)
    
            if (data != null) {
                const insuranceUpdateData = rowState.selectedRow.insuranceTypeCode? createInsuranceUpdateData(rowState.selectedRow.insuranceTypeCode) : null
                const contractUpdateData = data.contract? createContractUpdateData((data.contractView)) : null

                const newFormData:EmployeeDataUpdate = {
                    employee: data.employee,
                    contract: data.contract? data.contract : null,
                    personalData: data.personalData,
                    insurance: data.insurance? data.insurance : null,
                    address: data.address
                }
                
                reset(newFormData)
                setUpdateData({
                    contract: contractUpdateData,
                    employee: createEmployeeUpdateData(rowState.selectedRow),
                    insurance: insuranceUpdateData
                })
            }
        }
    }

    const setDefaultValues = () => {
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

    const onSubmit = (data: EmployeeDataUpdateDTO) => {
        try {
            const formData = JSON.stringify(data)
            submitPutForm(tableURL, formData, successCalback)
            reset() 
        }
        catch (error) {
            console.error(error)
        }
    };



    useEffect(() => {
        if(rowState) {
            if (Object.keys(rowState.selectedRow).length > 0) {
                init()
            }
        }
    }, [rowState]);


    return (
        <form onSubmit={handleSubmit(onSubmit)} >
            <ObjectPage 
                footer={
                    <Bar design={BarDesign.FloatingFooter}>
                        <Button slot="endContent" design={ButtonDesign.Transparent} onClick={navBackClick}>Отказ</Button>
                        <Button slot="endContent" design={ButtonDesign.Emphasized} type={ButtonType.Submit} >Запази</Button>
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
                            control={control}
                            getUpdateData={() => {return updateData.employee}}
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
                                control={control}
                            />
                            <UpdateAddressForm
                                getEditMode={() => {return editMode.pDataEdit}}
                                control={control}
                            />
                        </FlexBox>
                    </ObjectPageSubSection>

                </ObjectPageSection>


                {
                    getValues("contract") != null &&
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
                            <UpdateContractForm
                                getEditMode={() => {return editMode.conEdit}}
                                control={control}
                                getUpdateData={() => {return updateData.contract!}}
                            />
                        </ObjectPageSubSection>
                    </ObjectPageSection>
                }


                {
                    getValues("insurance") != null &&
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
                                control={control}
                                getUpdateData={() => {return updateData.insurance!}}
                                getValues={getValues}
                                setValue={setValue}
                            />
                        </ObjectPageSubSection>
                    </ObjectPageSection>
                }
                
            </ObjectPage>
        </form>
    );
};

export default EmployeeMidColumn;