import { FC, useContext, useEffect } from "react";
import { toggle } from "@store/slices/toggleSlice";
import { useAppDispatch } from "@store/storeHooks";
import { Bar, BarDesign, Button, ButtonDesign, ButtonType, FCLLayout, ObjectPage, ObjectPageSection, ObjectPageSubSection, TitleLevel } from "@ui5/webcomponents-react";
import { formToggle } from "@store/slices/formToggleSlice";
import { TableRowState } from "@app-types/TableRowState";
import { EmployeeView } from "@/pages/Employees/models/EmployeeView";
import { IncomePageContext } from "@/pages/EndMonth/EndMonthPage";
import { submitPostForm } from "@utils/forms/submitForm";
import { EndMonthDataInsertSchema } from "../../models/schemas/EndMonthDataSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createEndMonthDataInsert, EndMonthDataInsert } from "../../models/EndMonthData";
import CreateIncomeForm from "../Forms/income/CreateIncomeForm";
import CreateCompanyEmployeeTaxForm from "../Forms/companyEmployeTax/CreateCompanyEmployeeTaxForm";
import CreateScheduleForm from "../Forms/schedule/CreateScheduleForm";


interface Props {
    handleLayoutState: (layout: FCLLayout) => void,
    tableURL: string
}


const EndColumn: FC<Props> = ({tableURL, handleLayoutState}) => {
    const rowState = useContext<TableRowState<EmployeeView> | undefined>(IncomePageContext)
    const dispatchIsSuccess = useAppDispatch()
    const {
        handleSubmit,
        reset,
        control,
        formState,
    } = useForm<EndMonthDataInsert>({
        defaultValues: createEndMonthDataInsert(0),
        mode: "onChange",
        resolver: zodResolver(EndMonthDataInsertSchema),
    });


    const setDefaultState = () => {
        handleLayoutState(FCLLayout.OneColumn)
        dispatchIsSuccess(formToggle())
    }


    const successCalback = () => {
        dispatchIsSuccess(toggle())
        setDefaultState()
    }

    const navBackClick = () => {
        setDefaultState()
    }

    const onSubmit = (data: EndMonthDataInsert) => {
        try {
            const formData = JSON.stringify(data, null, 2)
            submitPostForm(`${tableURL}/income`, formData, successCalback)
            reset()            
        }
        catch (error) {
            console.error(error)
        }
    };


    useEffect(() => {
        if(rowState) {
            if (Object.keys(rowState.selectedRow).length > 0) {
                reset(createEndMonthDataInsert(rowState.selectedRow.employeeId))
            }
        }
    },[rowState])


    return (
        <form onSubmit={handleSubmit(onSubmit)} >
            <ObjectPage
                footer={
                    <Bar design={BarDesign.FloatingFooter}>
                        <Button slot="endContent" design={ButtonDesign.Transparent} onClick={navBackClick}>Отказ</Button>
                        <Button slot="endContent" design={ButtonDesign.Emphasized} type={ButtonType.Submit}>Създай</Button>
                    </Bar>
                }
                headerContent={
                    <Bar design={BarDesign.Subheader} 
                        startContent={<Button design="Transparent" icon="nav-back" onClick={navBackClick}/>}
                    />
                }
                >
                <ObjectPageSection
                    id="incomes"
                    titleText="Доходи"
                >
                    <ObjectPageSubSection
                        titleText="Доходи"
                        id="income"
                        titleTextLevel={TitleLevel.H1}
                        titleTextUppercase
                    >
                        <CreateIncomeForm
                            control={control}
                            formState={formState}
                        />
                    </ObjectPageSubSection>

                    <ObjectPageSubSection
                        titleText="Декларация 6"
                        id="declaration6"
                        titleTextLevel={TitleLevel.H1}
                        titleTextUppercase
                    >
                        <CreateCompanyEmployeeTaxForm
                            control={control}
                            formState={formState}
                        />
                    </ObjectPageSubSection>

                </ObjectPageSection>



                <ObjectPageSection
                    id="schedule"
                    titleText="График"
                    hideTitleText
                >
                    <ObjectPageSubSection
                        titleText="График"
                        id="schedule"
                        titleTextUppercase
                        titleTextLevel={TitleLevel.H1}
                    >
                        <CreateScheduleForm
                            control={control}
                            formState={formState}
                        />
                    </ObjectPageSubSection>

                </ObjectPageSection>


            </ObjectPage>
        </form>
    );
};

export default EndColumn;
