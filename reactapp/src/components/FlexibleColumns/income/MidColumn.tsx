import { FC, useContext, useState, useEffect } from 'react';
import { Bar, BarDesign, Button, ButtonDesign, FCLLayout, ObjectPage, ObjectPageSection, ObjectPageSubSection } from '@ui5/webcomponents-react';
import { toggle } from '@store/slices/toggleSlice';
import { useAppDispatch } from '@store/storeHooks';
import { submitPutForm } from '@utils/forms/submitForm';
import { updateFormInfo } from '@utils/forms/updateFormInfo';
import { isFilledForm } from '@utils/validation';
import { TableRowState } from '@app-types/TableRowState';
import { ChangeData } from '@models/EventData/ChangeData';
import { defaultScheduleIncomeUpdate, ScheduleIncomeUpdate } from '@models/HR/ScheduleIncome';
import { EmployeeView } from '@models/TableViews/EmployeeView';
import { IncomePageContext, IncomePageDataContext } from '@pages/hr/EmployeeIncomePage';
import UpdateIncomeForm from '@components/Forms/income/UpdateIncomeForm';
import { defaultSchedueleIncomeUpdateFormState, SchedueleIncomeFormState } from '@models/States/scheduleIncome/SchedueleIncomeFormState';
import UpdateScheduleForm from '@components/Forms/schedule/UpdateScheduleForm';



interface Props {
    handleLayoutState: (layout: FCLLayout) => void,
    tableURL: string
}



const MidColumn: FC<Props> = ({tableURL, handleLayoutState}) => {
    const rowState = useContext<TableRowState<EmployeeView> | undefined>(IncomePageContext)
    const selectedData = useContext<ScheduleIncomeUpdate | undefined>(IncomePageDataContext)
    const [formState, setFormState] = useState<SchedueleIncomeFormState>(defaultSchedueleIncomeUpdateFormState)
    const [formData, setFormData] = useState<ScheduleIncomeUpdate>(defaultScheduleIncomeUpdate)
    const [editMode, setEditMode] = useState<boolean>(false)
    const [disabled, setDisabled] = useState<boolean>(true)
    const dispatchIsSuccess = useAppDispatch()
    
    
    const setDefaultValues = () => {
        setFormState(defaultSchedueleIncomeUpdateFormState)
        setFormData(defaultScheduleIncomeUpdate)
        handleLayoutState(FCLLayout.OneColumn)
        setDisabled(true)
        setEditMode(false)
    }

    const setFormStates = (changeData: ChangeData) => {
        updateFormInfo(changeData, formData, setFormData, formState, setFormState)
        if(disabled) {setDisabled(false)}
    }

    const successCalback = ():void => {
        dispatchIsSuccess(toggle())
        setDefaultValues()
    }
    
    const navBackClick = () => {
        setDefaultValues()
    }

    const onSubmitForm = () => {
        let isSubmittable = false

        Object.entries(formState).forEach(([, value]) => {
            const formStateObj = value 
            if(isFilledForm(formStateObj)){
                isSubmittable = true
            }
            else {
                isSubmittable = false
            }
            
        })
        if (isSubmittable) {
            submitPutForm(tableURL, formData, successCalback) 
        }
        else {
            // Object.entries(formState).forEach(([key, value]) => {
            //     setErrorInputStates(value, (newState): void => {setFormState({...formState, [key]: newState})})
            // })
        }
    };

    useEffect(() => {
        if (rowState && selectedData) {
            const isSelectRow = Object.keys(rowState.selectedRow).length > 0
            const isHaveMonthIncome = Object.keys(selectedData).length > 0
            if (isSelectRow && isHaveMonthIncome) {
                setFormData({income: selectedData.income, schedule: selectedData.schedule})
            }
        }
    }, [rowState]);


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
                    <UpdateIncomeForm
                        getEditMode={() => {return editMode}}
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
                    <UpdateScheduleForm
                        getEditMode={() => {return editMode}}
                        getFormState={() => {return formState.schedule}}
                        getFormData={() => {return formData.schedule}}
                        setFormStates={setFormStates}
                    />
                </ObjectPageSubSection>

            </ObjectPageSection>


        </ObjectPage>
    );
};

export default MidColumn;