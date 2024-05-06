import { FC, useContext, useState, useEffect } from 'react';
import { Bar, BarDesign, Button, ButtonDesign, FCLLayout, ObjectPage, ObjectPageSection, ObjectPageSubSection, TitleLevel } from '@ui5/webcomponents-react';
import { toggle } from '@store/slices/toggleSlice';
import { useAppDispatch } from '@store/storeHooks';
import { submitPutForm } from '@utils/forms/submitForm';
import { updateFormInfo } from '@utils/forms/updateFormInfo';
import { isFilledForm, isFormChanged } from '@utils/validation';
import { TableRowState } from '@app-types/TableRowState';
import { ChangeData } from '@models/EventData/ChangeData';
import { EmployeeView } from '@models/TableViews/EmployeeView';
import { IncomePageContext, IncomePageDataContext } from '@/pages/hr/EndMonthPage';
import UpdateIncomeForm from '@components/Forms/income/UpdateIncomeForm';
import UpdateScheduleForm from '@components/Forms/schedule/UpdateScheduleForm';
import { setErrorInputStates } from '@/utils/forms/formState';
import { createEndMonthDataUpdate, EndMonthDataUpdate } from '@/models/HR/EndMonthData';
import { defaultEndMonthUpdateFormState, EndMonthFormState } from '@/models/States/endMonth/EndMonthFormState';
import UpdateCompanyEmployeeTaxForm from '@/components/Forms/companyEmployeTax/UpdateCompanyEmployeeTaxForm';



interface Props {
    handleLayoutState: (layout: FCLLayout) => void,
    tableURL: string
}



const MidColumn: FC<Props> = ({tableURL, handleLayoutState}) => {
    const rowState = useContext<TableRowState<EmployeeView> | undefined>(IncomePageContext)
    const selectedData = useContext<EndMonthDataUpdate | undefined>(IncomePageDataContext)
    const [formState, setFormState] = useState<EndMonthFormState>(defaultEndMonthUpdateFormState)
    const [formData, setFormData] = useState<EndMonthDataUpdate>(createEndMonthDataUpdate)
    const [editMode, setEditMode] = useState<boolean>(false)
    const [disabled, setDisabled] = useState<boolean>(true)
    const dispatchIsSuccess = useAppDispatch()
    
    
    const setDefaultValues = () => {
        setFormState(defaultEndMonthUpdateFormState)
        setFormData(createEndMonthDataUpdate)
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
        let object = {}
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
        if (rowState && selectedData) {
            const isSelectRow = Object.keys(rowState.selectedRow).length > 0
            const isHaveMonthIncome = Object.keys(selectedData).length > 0
            if (isSelectRow && isHaveMonthIncome) {
                setFormData({
                    income: selectedData.income, 
                    schedule: selectedData.schedule,
                    companyEmployeeTax: selectedData.companyEmployeeTax
            })
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
                    <UpdateCompanyEmployeeTaxForm
                        getEditMode={() => {return editMode}}
                        getFormState={() => {return formState.companyEmployeeTax}}
                        getFormData={() => {return formData.companyEmployeeTax}}
                        setFormStates={setFormStates}
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