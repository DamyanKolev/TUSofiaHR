import { FC, useContext, useState, useEffect } from 'react';
import { Bar, BarDesign, Button, ButtonDesign, ButtonType, FCLLayout, ObjectPage, ObjectPageSection, ObjectPageSubSection, TitleLevel } from '@ui5/webcomponents-react';
import { toggle } from '@store/slices/toggleSlice';
import { useAppDispatch } from '@store/storeHooks';
import { submitPutForm } from '@utils/forms/submitForm';
import { TableRowState } from '@app-types/TableRowState';
import { EmployeeView } from '@/pages/Employees/models/EmployeeView';
import { IncomePageContext, IncomePageDataContext } from '@/pages/EndMonth/EndMonthPage';
import { zodResolver } from '@hookform/resolvers/zod';
import { EndMonthDataUpdateSchema } from '../../models/schemas/EndMonthDataSchema';
import { defaultEndMonthUpdate, EndMonthDataUpdate } from '../../models/EndMonthData';
import { useForm } from 'react-hook-form';
import UpdateIncomeForm from '../Forms/income/UpdateIncomeForm';
import UpdateCompanyEmployeeTaxForm from '../Forms/companyEmployeTax/UpdateCompanyEmployeeTaxForm';
import UpdateScheduleForm from '../Forms/schedule/UpdateScheduleForm';



interface Props {
    handleLayoutState: (layout: FCLLayout) => void,
    tableURL: string
}



const MidColumn: FC<Props> = ({tableURL, handleLayoutState}) => {
    const rowState = useContext<TableRowState<EmployeeView> | undefined>(IncomePageContext)
    const selectedData = useContext<EndMonthDataUpdate | undefined>(IncomePageDataContext)
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
        handleLayoutState(FCLLayout.OneColumn)
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
        if (rowState && selectedData) {
            const isSelectRow = Object.keys(rowState.selectedRow).length > 0
            const isHaveMonthIncome = Object.keys(selectedData).length > 0
            if (isSelectRow && isHaveMonthIncome) {
                const newData = {
                    income: selectedData.income, 
                    schedule: selectedData.schedule,
                    companyEmployeeTax: selectedData.companyEmployeeTax
                }
                reset(newData)
            }
        }
    }, [rowState]);


    return (
        <form onSubmit={handleSubmit(onSubmit)} >
            <ObjectPage
                footer={
                    <Bar design={BarDesign.FloatingFooter}>
                        <Button slot="endContent" design={ButtonDesign.Transparent} onClick={navBackClick}>Отказ</Button>
                        <Button slot="endContent" design={ButtonDesign.Emphasized} type={ButtonType.Submit}>Запази</Button>
                    </Bar>
                }
                headerContent={
                    <Bar design={BarDesign.Subheader} 
                        startContent={<Button design="Transparent" icon="nav-back" onClick={navBackClick}/>}
                        endContent={
                            <Button onClick={()=> setEditMode(!editMode)}>{editMode ? 'Display-Only' : 'Edit Mode'}</Button>
                        }
                    />
                }
                >
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
                        <UpdateIncomeForm
                            getEditMode={() => {return editMode}}
                            control={control}
                        />
                    </ObjectPageSubSection>

                    <ObjectPageSubSection
                        titleText="Декларация 6"
                        id="declaration6"
                        titleTextLevel={TitleLevel.H1}
                        titleTextUppercase
                    >
                        <UpdateCompanyEmployeeTaxForm
                            getEditMode={() => {return editMode}}
                            control={control}
                        />
                    </ObjectPageSubSection>

                </ObjectPageSection>



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
                        <UpdateScheduleForm
                            getEditMode={() => {return editMode}}
                            control={control}
                        />
                    </ObjectPageSubSection>

                </ObjectPageSection>


            </ObjectPage>
        </form>
    );
};

export default MidColumn;