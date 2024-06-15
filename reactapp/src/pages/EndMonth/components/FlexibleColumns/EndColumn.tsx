import { Dispatch, FC, SetStateAction, useEffect } from "react";
import { toggle } from "@store/slices/toggleSlice";
import { useAppDispatch } from "@store/storeHooks";
import { Bar, BarDesign, Button, ButtonDesign, DynamicPageHeader, DynamicPageTitle, FCLLayout, FlexBox, Form, Label, Link, ObjectPage, ObjectPageSection, ObjectPageSubSection, TitleLevel } from "@ui5/webcomponents-react";
import { formToggle } from "@store/slices/formToggleSlice";
import { EmployeeView } from "@/pages/Employees/models/EmployeeView";
import { EndMonthDataInsertSchema } from "../../models/schemas/EndMonthDataSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createEndMonthDataInsert, EndMonthDataInsert } from "../../models/EndMonthData";
import CreateIncomeForm from "../Forms/income/CreateIncomeForm";
import CreateCompanyEmployeeTaxForm from "../Forms/companyEmployeTax/CreateCompanyEmployeeTaxForm";
import CreateScheduleForm from "../Forms/schedule/CreateScheduleForm";
import { submitPostForm } from "@/utils/requests";
import { WorkDataView } from "@/pages/Employees/models/WorkDataView";


interface Props {
    setLayout: Dispatch<SetStateAction<FCLLayout>>,
    tableURL: string
    workData: WorkDataView | undefined
    selectedRow: EmployeeView  | undefined
}


const EndColumn: FC<Props> = ({tableURL, setLayout, workData, selectedRow}) => {
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
        setLayout(FCLLayout.OneColumn)
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
            submitPostForm(`${tableURL}/create`, formData, successCalback)
            reset()  
            // console.log(formData)
        }
        catch (error) {
            console.error(error)
        }
    };


    useEffect(() => {
        if(selectedRow) {
            reset(createEndMonthDataInsert(selectedRow.employeeId))
        }
    },[selectedRow])


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
                titleText="График"
                hideTitleText
            >
                <ObjectPageSubSection
                    titleText="График"
                    id="schedule"
                    titleTextUppercase
                    titleTextLevel={TitleLevel.H1}
                >
                    <Form>
                        <CreateScheduleForm
                            control={control}
                            formState={formState}
                        />
                    </Form>
                </ObjectPageSubSection>
            </ObjectPageSection>



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
                    <Form>
                        <CreateIncomeForm
                            control={control}
                            formState={formState}
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
                        <CreateCompanyEmployeeTaxForm
                            control={control}
                            formState={formState}
                        />
                    </Form>
                </ObjectPageSubSection>

            </ObjectPageSection>
        </ObjectPage>
    );
};

export default EndColumn;
