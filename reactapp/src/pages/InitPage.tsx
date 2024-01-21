import { FC, Fragment, useState } from 'react';
import { Bar, BarDesign, Button, ButtonDesign, Title, Ui5CustomEvent, Wizard, WizardContentLayout, WizardDomRef, WizardStep } from '@ui5/webcomponents-react';
import "@ui5/webcomponents-icons/company-view"
import "@ui5/webcomponents-icons/suitcase"
import { DepartmentDTO, defualtDepartmentDTO } from '@models/HR/Departmnet';
import { PositionDTO, defaultPositionDTO } from '@models/HR/Position';
import CreateDepartment from '@components/Forms/department/CreateDepartment';
import { DepartmentFormState, defaultDepartmentFormState } from '@models/FormStates/department/DepartmentFormState';
import { PositionFormState, defualtPositionFormState } from '@models/FormStates/position/PositionFormState';
import CreatePosition from '@components/Forms/position/CreatePosition';
import { WizardStepChangeEventDetail } from '@ui5/webcomponents-fiori/dist/Wizard.js';
import { isFilledForm } from '@utils/validation';
import { useNavigate } from 'react-router-dom';
import { submitPostForm } from '@/utils/forms/submitForm';
import { setErrorInputStates } from '@/utils/forms/formInputState';



const InitPage: FC = () => {
    const navigate = useNavigate(); 
    const [selected, setSelected] = useState<int>(1);
    const [disabled, setDisabled] = useState<Record<int, boolean>>({1: false, 2: true});

    const [departmentForm, setDepartmentForm] = useState<DepartmentDTO>(defualtDepartmentDTO)
    const [positionForm, setPositionForm] = useState<PositionDTO>(defaultPositionDTO)

    const [departmentFormState, setDepartmentFormState] = useState<DepartmentFormState>(defaultDepartmentFormState);
    const [positionFormState, setPositionFormState] = useState<PositionFormState>(defualtPositionFormState);

    const nextButtonOnClick = () => {
        const newSelected = selected + 1
        setSelected(newSelected)
        setDisabled((prev) => {
            const { [newSelected]: _omit, ...rest } = prev;
            return rest;
        });
    }

    const previousButtonOnClick = () => {
        const newSelected = selected - 1
        setSelected(newSelected)
    }

    const successCalback = ():void => {
        navigate("/")
    }

    const handleStepChange = (e: Ui5CustomEvent<WizardDomRef, WizardStepChangeEventDetail>) => {
        const newSelected = Number(e.detail.step.dataset.step)
        setSelected(Number(newSelected));
    };

    const submitForms = async (): Promise<void> => {
        const isFilledDepartmentForm = isFilledForm<DepartmentFormState>(departmentFormState);
        const isFilledPositionForm = isFilledForm<DepartmentFormState>(departmentFormState);
        const isFilled = isFilledDepartmentForm && isFilledPositionForm
        
        if (isFilled) {
            const postURL = `/backend/api/hr/init-hr`
            const formObject = JSON.stringify({
                department_insert:departmentForm,
                position_insert:positionForm
            })
            submitPostForm(postURL, formObject, successCalback)
        }
        else {
            setErrorInputStates<DepartmentFormState>(departmentFormState, setDepartmentFormState)
            setErrorInputStates<PositionFormState>(positionFormState, setPositionFormState)
        }
    }

    return (
        <Wizard onStepChange={handleStepChange} contentLayout={WizardContentLayout.SingleStep}>
            <WizardStep titleText="Отдел" icon="company-view" selected={selected == 1} data-step={1} disabled={disabled[1]}>
                <Title>Нов Отдел</Title>
                <CreateDepartment
                    getFormState={() => {return departmentFormState}}
                    getFormData={() => {return departmentForm}}
                    setFormState={setDepartmentFormState}
                    setFormData={setDepartmentForm}
                />

                <Bar
                    design={BarDesign.Footer}
                    endContent={
                        <Button design={ButtonDesign.Emphasized} onClick={nextButtonOnClick}>Напред</Button>
                    }
                />
            </WizardStep>

            <WizardStep titleText="Позиция" icon="suitcase"  selected={selected == 2} data-step={2} disabled={disabled[2]}>
                <Title>Нова Позиция</Title>

                <CreatePosition
                    getFormState={() => {return positionFormState}}
                    getFormData={() => {return positionForm}}
                    setFormState={setPositionFormState}
                    setFormData={setPositionForm}
                />

                <Bar
                    design={BarDesign.Footer}
                    endContent={
                        <Fragment>
                            <Button design={ButtonDesign.Transparent} onClick={previousButtonOnClick}>Назад</Button>
                            <Button design={ButtonDesign.Emphasized} onClick={submitForms}>Финализиране</Button>
                        </Fragment>
                    }
                />
            </WizardStep>
        </Wizard>
    )
}

export default InitPage;