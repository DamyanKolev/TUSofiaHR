import { FC, useContext, useEffect, useState } from "react";
import { toggle } from "@store/slices/toggleSlice";
import { useAppDispatch } from "@store/storeHooks";
import { Bar, BarDesign, Button, ButtonDesign, FCLLayout, ObjectPage, ObjectPageSection, ObjectPageSubSection } from "@ui5/webcomponents-react";
import { formToggle } from "@store/slices/formToggleSlice";
import { updateFormInfo } from "@utils/forms/updateFormInfo";
import { ChangeData } from "@models/EventData/ChangeData";
import { createScheduleIncomeInsert, ScheduleIncomeInsert } from "@models/HR/ScheduleIncome";
import CreateIncomeForm from "@components/Forms/income/CreateIncomeForm";
import CreateScheduleForm from "@components/Forms/schedule/CreateScheduleForm";
import { TableRowState } from "@app-types/TableRowState";
import { EmployeeView } from "@models/TableViews/EmployeeView";
import { IncomePageContext } from "@pages/hr/EmployeeIncomePage";
import { isFilledForm } from "@utils/validation";
import { defaultSchedueleIncomeInsertFormState, SchedueleIncomeFormState } from "@models/States/scheduleIncome/SchedueleIncomeFormState";
import { setErrorInputStates } from "@utils/forms/formState";
import { submitPostForm } from "@utils/forms/submitForm";


interface Props {
    handleLayoutState: (layout: FCLLayout) => void,
    tableURL: string
}


const EndColumn: FC<Props> = ({tableURL, handleLayoutState}) => {
    const rowState = useContext<TableRowState<EmployeeView> | undefined>(IncomePageContext)
    const [formData, setFormData] = useState<ScheduleIncomeInsert>(createScheduleIncomeInsert(0));
    const [formState, setFormState] = useState<SchedueleIncomeFormState>(defaultSchedueleIncomeInsertFormState);
    const [disabled, setDisabled] = useState<boolean>(true)
    const dispatchIsSuccess = useAppDispatch()


    const setDefaultState = () => {
        handleLayoutState(FCLLayout.OneColumn)
        setFormData(createScheduleIncomeInsert(0))
        setFormState(defaultSchedueleIncomeInsertFormState)
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
                setFormData(createScheduleIncomeInsert(rowState.selectedRow.employee_id))
            }
        }
    })


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
            style={{
                height: 'calc(100vh - 3.73rem)'
            }}
            >
            <ObjectPageSection
                id="incomes"
                titleText="Доходи"
            >
                <ObjectPageSubSection
                    hideTitleText
                    titleText="Доходи"
                    id="employee-info"
                >
                    <CreateIncomeForm
                        getFormState={() => {return formState.income}}
                        getFormData={() => {return formData.income}}
                        setFormStates={setFormStates}
                    />
                </ObjectPageSubSection>
            </ObjectPageSection>



            <ObjectPageSection
                id="schedule"
                titleText="График"
            >
                <ObjectPageSubSection
                    hideTitleText
                    titleText="График"
                    id="personal-data-info"
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
