import { DepartmentFormState, defaultDepartmentInsertFormState } from "@/models/FormStates/department/DepartmentFormState";
import { PositionFormState, defualtInsertPositionFormState } from "@/models/FormStates/position/PositionFormState";
import CreateDepartment from "@components/Forms/department/CreateDepartment";
import CreatePosition from "@components/Forms/position/CreatePosition";
import { DepartmentDTO, defualtDepartmentDTO } from "@models/HR/Departmnet";
import { PositionDTO, defaultPositionDTO } from "@models/HR/Position";
import { WizardStepChangeEventDetail } from "@ui5/webcomponents-fiori/dist/Wizard.js";
import { Bar, BarDesign, Button, ButtonDesign, Dialog, InputDomRef, Title, Ui5CustomEvent, Wizard, WizardContentLayout, WizardDomRef, WizardStep } from "@ui5/webcomponents-react";
import { setErrorInputStates } from "@utils/forms/formState";
import { submitPostForm } from "@utils/forms/submitForm";
import { handleInputChangeFunc } from "@utils/handlers/onChangeHandlers";
import { isFilledForm } from "@utils/validation";
import { FC, Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";


interface InitWizardDialogProps {
    getSelected: () => boolean,
    setIsSelected: (isSelected: boolean) => void,
}


const InitWizardDialog: FC<InitWizardDialogProps> = ({getSelected, setIsSelected}) => {
    const navigate = useNavigate(); 
    const [selected, setSelected] = useState<int>(1);
    const [disabled, setDisabled] = useState<Record<int, boolean>>({1: false, 2: true});
    const [departmentForm, setDepartmentForm] = useState<DepartmentDTO>(defualtDepartmentDTO)
    const [positionForm, setPositionForm] = useState<PositionDTO>(defaultPositionDTO)
    const [departmentFormState, setDepartmentFormState] = useState<DepartmentFormState>(defaultDepartmentInsertFormState);
    const [positionFormState, setPositionFormState] = useState<PositionFormState>(defualtInsertPositionFormState);

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
        setIsSelected(false)
        navigate("/")
    }

    const handleStepChange = (e: Ui5CustomEvent<WizardDomRef, WizardStepChangeEventDetail>) => {
        const newSelected = Number(e.detail.step.dataset.step)
        setSelected(Number(newSelected));
    };

    const submitForms = async (): Promise<void> => {
        const isFilledDepartmentForm = isFilledForm(departmentFormState);
        const isFilledPositionForm = isFilledForm(positionFormState);
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
            setErrorInputStates(departmentFormState, setDepartmentFormState)
            setErrorInputStates(positionFormState, setPositionFormState)
        }
    }


    //department input change event listener
    const handleInputChange = (event: Ui5CustomEvent<InputDomRef, never>) => {
        const target = event.target
        handleInputChangeFunc(target, departmentForm, setDepartmentForm, departmentFormState, setDepartmentFormState);
    }

    //department input change event listener
    const positionHandleInputChange = (event: Ui5CustomEvent<InputDomRef, never>) => {
        const target = event.target
        handleInputChangeFunc(target, positionForm, setPositionForm, positionFormState, setPositionFormState);
    }

    return (
        <Dialog open={getSelected()} stretch>
            <Wizard onStepChange={handleStepChange} contentLayout={WizardContentLayout.SingleStep}>
                <WizardStep titleText="Отдел" icon="company-view" selected={selected == 1} data-step={1} disabled={disabled[1]} style={{height:"30rem"}}>
                    <Title>Нов Отдел</Title>
                    <CreateDepartment
                        getFormState={() => {return departmentFormState}}
                        getFormData={() => {return departmentForm}}
                        handleInputChange={handleInputChange}
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
                        handleInputChange={positionHandleInputChange}
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
        </Dialog>
    )
}

export default InitWizardDialog
