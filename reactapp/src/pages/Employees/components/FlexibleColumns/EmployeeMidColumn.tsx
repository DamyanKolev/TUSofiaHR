import { Dispatch, FC, SetStateAction, useContext, useEffect, useState } from 'react';
import { Button, FCLLayout, ObjectPage, ObjectPageSection, DynamicPageHeader, DynamicPageTitle, FlexBox, Link, Label, Form, FormGroup, ObjectPageSubSection, BarDesign, Bar, TitleLevel, Tab, TabContainer, TabLayout, TabContainerBackgroundDesign } from '@ui5/webcomponents-react';
import { EmployeeView } from '@pages/Employees/models/EmployeeView';
import { EmployeePageContext } from '@pages/Employees/EmployeePage';
import { TableRowState } from '@app-types/TableRowState';
import { zodResolver } from '@hookform/resolvers/zod';
import { EmployeeDataUpdateSchema } from '@pages/Employees/models/schemes/EmployeeDataSchema';
import { useForm } from 'react-hook-form';
import { defaultEmployeeDataUpdate, defaultEmployeeDataUpdateData, EmployeeData, EmployeeDataUpdateData, EmployeeDataUpdateDTO } from '@pages/Employees/models/EmployeeData';
import { useAppDispatch } from '@store/storeHooks';
import { setContract } from '@store/slices/contractSlice';
import UpdateEmployeeForm from '../Forms/employee/UpdateEmployeeForm';
import UpdatePersonalDataForm from '../Forms/personalData/UpdatePersonalDataForm';
import UpdateAddressForm from '../Forms/address/UpdateAddressForm';
import { createEmployeeUpdateData } from '@pages/Employees/models/Employee';
import UpdateInsuranceForm from '../Forms/insurance/UpdateInsuranceForm';
import { createInsuranceUpdateData } from '@pages/Employees/models/Insurance';
import { EndColumnEnum } from '@pages/Employees/models/EndColumnEnum';
import { getUpdateData, submitPutForm } from '@/utils/requests';
import { toggle } from '@/store/slices/toggleSlice';
import contractColumns from '@/pages/Contracts/models/Columns/ContractColumns';
import ContractSmartTable from '../ContractTable';
import { WorkDataView } from '../../models/WorkDataView';





interface Props {
    setLayout: Dispatch<SetStateAction<FCLLayout>>,
    layout: FCLLayout
    setEndColumnOption: Dispatch<SetStateAction<EndColumnEnum>>
    tableURL: string
}


const EmployeeMidColumn: FC<Props> = ({ tableURL, layout, setLayout, setEndColumnOption }) => {
    const rowState = useContext<TableRowState<EmployeeView> | undefined>(EmployeePageContext)
    const [editMode, setEditMode] = useState<boolean>(false)
    const [updateData, setUpdateData] = useState<EmployeeDataUpdateData>(defaultEmployeeDataUpdateData)
    const [workData, setWorkData] = useState<WorkDataView | undefined>(undefined)
    const appDispatch = useAppDispatch()
    const {
        reset,
        control,
        getValues,
        setValue,
        handleSubmit
    } = useForm<EmployeeDataUpdateDTO>({
        defaultValues: defaultEmployeeDataUpdate,
        mode: "onChange",
        resolver: zodResolver(EmployeeDataUpdateSchema),
    });

    const init = async () => {
        try {
            if(rowState) {
                const bodyData = {
                    employeeId: rowState.selectedRow.employeeId,
                    personalDataId: rowState.selectedRow.personalDataId
                }
                const currWorkData = await getUpdateData<WorkDataView, number>(rowState.selectedRow.employeeId, `${tableURL}/work-data`)
                const data = await getUpdateData<EmployeeData, object>(bodyData, `${tableURL}/update-data`)
                const insuranceUpdateData = rowState.selectedRow.insuranceTypeCode? createInsuranceUpdateData(rowState.selectedRow.insuranceTypeCode) : null
                const newFormData:EmployeeDataUpdateDTO = {
                    employee: data.employee,
                    personalData: data.personalData,
                    insurance: data.insurance? data.insurance : null,
                    address: data.address? data.address : null,
                }
    
                setWorkData(currWorkData)
                reset(newFormData)
                setUpdateData({
                    employee: createEmployeeUpdateData(rowState.selectedRow),
                    insurance: insuranceUpdateData
                })
            }
        }
        catch (error) {
            console.error(error)
        }
    }

    const setDefaultValues = () => {
        setLayout(FCLLayout.OneColumn)
        rowState?.setSelectedRow({} as EmployeeView)
        setEditMode(false)
    }

    const onClickContract = (event: any) => {
        const row = event.detail.row.original
        setLayout(FCLLayout.ThreeColumnsMidExpanded)
        setEndColumnOption(EndColumnEnum.UpdateContract)
        appDispatch(setContract(row))
    }

    const successCalback = ():void => {
        appDispatch(toggle())
        setDefaultValues()
    }


    const onClickFullscreen = () => {
        if (layout === FCLLayout.TwoColumnsMidExpanded) {
            setLayout(FCLLayout.MidColumnFullScreen)
        }
        else {
            setLayout(FCLLayout.TwoColumnsMidExpanded)
        }
    }


    const onCLickCreateContract = () => {
        setLayout(FCLLayout.ThreeColumnsMidExpanded)
        setEndColumnOption(EndColumnEnum.InsertContract)
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
        if(rowState && Object.keys(rowState.selectedRow).length > 0) {
            init()
        }
    }, [rowState]);


    return (
        <ObjectPage
            headerContent={
                <DynamicPageHeader>
                    <FlexBox alignItems="Center" wrap="Wrap">
                        <FlexBox direction="Column">
                            <Link>{workData?.phoneNumber}</Link>
                            <Link href={`mailto:${workData?.workEmail}`}>{workData?.workEmail}</Link>
                        </FlexBox>
                    <FlexBox direction="Column" style={{padding: '10px'}}>
                    <Label>{workData?.employeeName}</Label>
                    <Label>{`${workData?.populatedPlace}, България`}</Label>
                    </FlexBox></FlexBox>
                </DynamicPageHeader>
            }
            headerContentPinnable
            headerTitle={
                <DynamicPageTitle 
                    actions={
                        <>
                            <Button 
                                icon={layout == FCLLayout.TwoColumnsMidExpanded ? "full-screen" : "exit-full-screen"}
                                onClick={onClickFullscreen}
                            />
                        </>
                    } 
                    header={workData?.employeeName} 
                    showSubHeaderRight 
                    subHeader={workData?.positionName}
                    breadcrumbs={
                        <Button icon="nav-back" onClick={setDefaultValues}></Button>
                    }
                >
                </DynamicPageTitle>
            }
            imageShapeCircle
            showHideHeaderButton
            style={{
                height: "calc(100vh - 3.73rem)"
            }}
        >
            <ObjectPageSection
                aria-label="Информация за служителя"
                id="personal-data"
                titleText="Информация за служителя"
            >
                <div>
                    <ObjectPageSubSection
                        actions={
                            <Button onClick={()=>setEditMode(!editMode)}>{editMode ? 'Display-Only' : 'Edit Mode'}</Button>
                        }
                        id="personal-data-address"
                    >
                        <TabContainer
                            contentBackgroundDesign={TabContainerBackgroundDesign.Transparent}
                            headerBackgroundDesign={TabContainerBackgroundDesign.Transparent}
                            tabLayout={TabLayout.Standard}
                        >
                            <Tab
                                icon="employee"
                                selected
                                text="Информация за служителя"
                            >
                                <Form>
                                    <FormGroup titleText='Информация за служителя'>
                                        <UpdateEmployeeForm
                                            getEditMode={() => {return editMode}}
                                            control={control}
                                            getUpdateData={() => {return updateData.employee}}
                                        />
                                    </FormGroup>
                                </Form>
                            </Tab>
                            <Tab
                                icon="private"
                                text="Лични данни"
                            >
                                <Form>
                                    <FormGroup titleText='Лични данни'>
                                        <UpdatePersonalDataForm
                                            getEditMode={() => {return editMode}}
                                            control={control}
                                        />
                                    </FormGroup>

                                    {
                                        getValues("address") != null &&
                                        <FormGroup titleText='Адрес'>
                                            <UpdateAddressForm
                                                getEditMode={() => {return editMode}}
                                                control={control}
                                            />
                                        </FormGroup>
                                    }
                                </Form>
                            </Tab>
                            <Tab 
                                icon="money-bills" 
                                text="Осигуровки"
                            >
                                <Form>
                                    {
                                        getValues("insurance") != null &&
                                        <FormGroup titleText='Осигуровки'>
                                            <UpdateInsuranceForm
                                                getEditMode={() => {return editMode}}
                                                control={control}
                                                setValue={setValue}
                                                getValues={getValues}
                                                getUpdateData={() => {return updateData.insurance!}}
                                            />
                                        </FormGroup>
                                    }
                                </Form>
                            </Tab>
                        </TabContainer>


                        <Bar design={BarDesign.Footer}
                            endContent={
                                <Button onClick={handleSubmit(onSubmit)}>Запази</Button>
                            }
                        />
                    </ObjectPageSubSection>
                </div>
            </ObjectPageSection>

            {
                rowState?.selectedRow != undefined && Object.keys(rowState.selectedRow).length > 0 &&
                <ObjectPageSection
                    aria-label="Договори"
                    id="contract"
                    titleText="Договори"
                    titleTextLevel={TitleLevel.H1}
                >
                    <ContractSmartTable
                        employeeId={rowState?.selectedRow.employeeId}
                        columns={contractColumns}
                        onRowClick={onClickContract}
                        onCreateClick={onCLickCreateContract}
                    />
                </ObjectPageSection>
            }
        </ObjectPage>
    );
};

export default EmployeeMidColumn;