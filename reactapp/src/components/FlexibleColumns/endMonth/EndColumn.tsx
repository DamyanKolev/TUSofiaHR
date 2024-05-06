import { FC, useContext, useEffect, useState } from "react";
import { toggle } from "@store/slices/toggleSlice";
import { useAppDispatch } from "@store/storeHooks";
import { Bar, BarDesign, Button, ButtonDesign, FCLLayout, ObjectPage, ObjectPageSection, ObjectPageSubSection, TitleLevel } from "@ui5/webcomponents-react";
import { formToggle } from "@store/slices/formToggleSlice";
import { updateFormInfo } from "@utils/forms/updateFormInfo";
import { ChangeData } from "@models/EventData/ChangeData";
import CreateIncomeForm from "@components/Forms/income/CreateIncomeForm";
import CreateScheduleForm from "@components/Forms/schedule/CreateScheduleForm";
import { TableRowState } from "@app-types/TableRowState";
import { EmployeeView } from "@models/TableViews/EmployeeView";
import { IncomePageContext } from "@/pages/hr/EndMonthPage";
import { isFilledForm } from "@utils/validation";
import { setErrorInputStates } from "@utils/forms/formState";
import { submitPostForm } from "@utils/forms/submitForm";
import { createEndMonthDataInsert, EndMonthDataInsert } from "@/models/HR/EndMonthData";
import { defaultEndMonthInsertFormState, EndMonthFormState } from "@/models/States/endMonth/EndMonthFormState";
import CreateCompanyEmployeeTaxForm from "@/components/Forms/companyEmployeTax/CreateCompanyEmployeeTaxForm";


interface Props {
    handleLayoutState: (layout: FCLLayout) => void,
    tableURL: string
}


const EndColumn: FC<Props> = ({tableURL, handleLayoutState}) => {
    const rowState = useContext<TableRowState<EmployeeView> | undefined>(IncomePageContext)
    const [formData, setFormData] = useState<EndMonthDataInsert>(createEndMonthDataInsert(0));
    const [formState, setFormState] = useState<EndMonthFormState>(defaultEndMonthInsertFormState);
    const [disabled, setDisabled] = useState<boolean>(true)
    const dispatchIsSuccess = useAppDispatch()


    const setDefaultState = () => {
        handleLayoutState(FCLLayout.OneColumn)
        setFormData(createEndMonthDataInsert(0))
        setFormState(defaultEndMonthInsertFormState)
        setDisabled(true)
        dispatchIsSuccess(formToggle())
    }

    const setFormStates = (changeData: ChangeData) => {
        updateFormInfo(changeData, formData, setFormData, formState, setFormState)

        if(disabled) {setDisabled(false)}
    }

    const successCalback = () => {
        dispatchIsSuccess(toggle())
        setDefaultState()
    }

    const navBackClick = () => {
        setDefaultState()
    }

    const onSubmitForm = async () => {
        let isSubmittable = false

        Object.entries(formState).forEach(([, value]) => {
            if(isFilledForm(value)){
                isSubmittable = true
            }
            else {
                isSubmittable = false
            }
            
        })
        if (isSubmittable) {
            const postURL = `${tableURL}/income`
            submitPostForm(postURL, formData, successCalback)
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
                setFormData(createEndMonthDataInsert(rowState.selectedRow.employeeId))
            }
        }
    },[rowState])


    return (
        <ObjectPage
            footer={
                <Bar design={BarDesign.FloatingFooter}>
                    <Button slot="endContent" design={ButtonDesign.Transparent} onClick={navBackClick}>Отказ</Button>
                    <Button slot="endContent" design={ButtonDesign.Emphasized} onClick={onSubmitForm} disabled={disabled}>Запази</Button>
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
                        getFormState={() => {return formState.income}}
                        getFormData={() => {return formData.income}}
                        setFormStates={setFormStates}
                    />
                </ObjectPageSubSection>

                <ObjectPageSubSection
                    titleText="Декларация 6"
                    id="declaration6"
                    titleTextLevel={TitleLevel.H1}
                    titleTextUppercase
                >
                    <CreateCompanyEmployeeTaxForm
                        getFormState={() => {return formState.companyEmployeeTax}}
                        getFormData={() => {return formData.companyEmployeeTax}}
                        setFormStates={setFormStates}
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
                        getFormState={() => {return formState.schedule}}
                        getFormData={() => {return formData.schedule}}
                        setFormStates={setFormStates}
                    />
                </ObjectPageSubSection>

            </ObjectPageSection>


        </ObjectPage>
    );
};

export default EndColumn;
