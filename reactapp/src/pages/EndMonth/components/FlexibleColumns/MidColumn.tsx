import { FC, useState, useEffect, Dispatch, SetStateAction } from 'react';
import { Bar, BarDesign, Button, ButtonDesign, DynamicPageHeader, DynamicPageTitle, FCLLayout, FlexBox, Form, Label, Link, ObjectPage, ObjectPageSection, ObjectPageSubSection, TitleLevel } from '@ui5/webcomponents-react';
import { toggle } from '@store/slices/toggleSlice';
import { useAppDispatch } from '@store/storeHooks';
import { EmployeeView } from '@/pages/Employees/models/EmployeeView';
import { zodResolver } from '@hookform/resolvers/zod';
import { EndMonthDataUpdateSchema } from '../../models/schemas/EndMonthDataSchema';
import { defaultEndMonthUpdate, EndMonthDataUpdate } from '../../models/EndMonthData';
import { useForm } from 'react-hook-form';
import UpdateIncomeForm from '../Forms/income/UpdateIncomeForm';
import UpdateCompanyEmployeeTaxForm from '../Forms/companyEmployeTax/UpdateCompanyEmployeeTaxForm';
import UpdateScheduleForm from '../Forms/schedule/UpdateScheduleForm';
import { submitPutForm } from '@/utils/requests';
import { WorkDataView } from '@/pages/Employees/models/WorkDataView';



interface Props {
    setLayout: Dispatch<SetStateAction<FCLLayout>>,
    tableURL: string
    workData: WorkDataView | undefined
    endMonthData: EndMonthDataUpdate | undefined
    selectedRow: EmployeeView | undefined
}



const MidColumn: FC<Props> = ({tableURL, setLayout, workData, endMonthData, selectedRow}) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const dispatchIsSuccess = useAppDispatch()
    const {
        handleSubmit,
        reset,
        control,
    } = useForm<EndMonthDataUpdate>({
        defaultValues: defaultEndMonthUpdate,
        mode: "onChange",
        resolver: zodResolver(EndMonthDataUpdateSchema),
    });
    
    
    const setDefaultValues = () => {
        setLayout(FCLLayout.OneColumn)
        setEditMode(false)
    }

    const successCalback = ():void => {
        dispatchIsSuccess(toggle())
        setDefaultValues()
    }
    
    const navBackClick = () => {
        setDefaultValues()
    }

    const onSubmit = (data: EndMonthDataUpdate) => {
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
        if (endMonthData) {
            const newData = {
                income: endMonthData.income, 
                schedule: endMonthData.schedule,
                companyEmployeeTax: endMonthData.companyEmployeeTax
            }
            reset(newData)
        }
    }, [selectedRow]);


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
            headerTitle={
                <DynamicPageTitle 
                    actions={
                        <Button design={ButtonDesign.Emphasized} onClick={()=>setEditMode(!editMode)}>{editMode ? 'Display-Only' : 'Edit Mode'}</Button>
                    }
                    header={workData?.employeeName} 
                    showSubHeaderRight 
                    subHeader={workData?.positionName}
                    breadcrumbs={
                        <Button icon="nav-back" design={ButtonDesign.Transparent} onClick={navBackClick}></Button>
                    }
                >
                </DynamicPageTitle>
            }
            footer={
                <Bar design={BarDesign.FloatingFooter}>
                    <Button slot="endContent" design={ButtonDesign.Transparent} onClick={navBackClick}>Отказ</Button>
                    <Button slot="endContent" design={ButtonDesign.Emphasized} onClick={handleSubmit(onSubmit)}>Запази</Button>
                </Bar>
            }
            >
            <ObjectPageSection
                id="schedule"
                titleText='График'
                hideTitleText
            >
                <ObjectPageSubSection
                    titleText='График'
                    id="schedule"
                    titleTextLevel={TitleLevel.H1}
                    titleTextUppercase
                >
                    <Form>
                        <UpdateScheduleForm
                            getEditMode={() => {return editMode}}
                            control={control}
                        />
                    </Form>
                </ObjectPageSubSection>
            </ObjectPageSection>


            <ObjectPageSection
                id="incomes"
                titleText="Доход"
            >
                <ObjectPageSubSection
                    titleText="Доход"
                    id="incomes"
                    titleTextLevel={TitleLevel.H1}
                    titleTextUppercase
                >
                    <Form>
                        <UpdateIncomeForm
                            getEditMode={() => {return editMode}}
                            control={control}
                        />
                    </Form>
                </ObjectPageSubSection>

                <ObjectPageSubSection
                    titleText="Декларация 6"
                    id="declaration6"
                    titleTextLevel={TitleLevel.H1}
                    titleTextUppercase
                >
                    <Form>
                        <UpdateCompanyEmployeeTaxForm
                            getEditMode={() => {return editMode}}
                            control={control}
                        />
                    </Form>
                </ObjectPageSubSection>
            </ObjectPageSection>
        </ObjectPage>
    );
};

export default MidColumn;