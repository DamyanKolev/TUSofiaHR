import CreateDepartment from "@components/Forms/department/CreateDepartment";
import CreatePosition from "@components/Forms/position/CreatePosition";
import { WizardStepChangeEventDetail } from "@ui5/webcomponents-fiori/dist/Wizard.js";
import { Bar, BarDesign, Button, ButtonDesign, Dialog, Title, Ui5CustomEvent, Wizard, WizardContentLayout, WizardDomRef, WizardStep } from "@ui5/webcomponents-react";
import { setErrorInputStates } from "@utils/forms/formState";
import { submitPostForm } from "@utils/forms/submitForm";
import { updateFormInfo } from "@utils/forms/updateFormInfo";
import { isFilledForm } from "@utils/validation";
import { FC, Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PositionDepartment, defaultPositionDepartment } from "@models/HR/PositionDepartment";
import { PositionDepartmentState, defaultPositionDepartmentState } from "@models/States/PositionDepartmentState";
import { ChangeData } from "@models/EventData/ChangeData";


interface InitWizardDialogProps {
    getSelected: () => boolean,
    setIsSelected: (isSelected: boolean) => void,
}


const InitWizardDialog: FC<InitWizardDialogProps> = ({getSelected, setIsSelected}) => {
    const [formData, setFormData] = useState<PositionDepartment>(defaultPositionDepartment)
    const [formState, setFormState] = useState<PositionDepartmentState>(defaultPositionDepartmentState)
    const [disabled, setDisabled] = useState<Record<int, boolean>>({1: false, 2: true});
    const [selected, setSelected] = useState<int>(1);
    const navigate = useNavigate();

    const setFormStates = (changeData: ChangeData) => {
        updateFormInfo(changeData, formData, setFormData, formState, setFormState)
    }

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
            const postURL = `api/hr/init-hr`
            submitPostForm(postURL, formData, successCalback)
        }
        else {
            Object.entries(formState).forEach(([key, value]) => {
                setErrorInputStates(value, (newState): void => {setFormState({...formState, [key]: newState})})
            })
        }
    }


    return (
        <Dialog open={getSelected()} stretch>
            <Wizard onStepChange={handleStepChange} contentLayout={WizardContentLayout.SingleStep}>
                <WizardStep titleText="Отдел" icon="company-view" selected={selected == 1} data-step={1} disabled={disabled[1]} style={{height:"30rem"}}>
                    <Title>Нов Отдел</Title>
                    <CreateDepartment
                        getFormState={() => {return formState.departmentInsert}}
                        getFormData={() => {return formData.departmentInsert}}
                        setFormStates={setFormStates}
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
                        getFormState={() => {return formState.positionInsert}}
                        getFormData={() => {return formData.positionInsert}}
                        setFormStates={setFormStates}
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
