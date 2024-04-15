import InitDepartmentForm from "@components/Forms/department/InitDepartmentForm";
import InitPositionForm from "@components/Forms/position/InitPositionForm";
import { WizardStepChangeEventDetail } from "@ui5/webcomponents-fiori/dist/Wizard.js";
import { Bar, BarDesign, Button, ButtonDesign, Dialog, FlexBox, FlexBoxDirection, Title, Ui5CustomEvent, Wizard, WizardContentLayout, WizardDomRef, WizardStep } from "@ui5/webcomponents-react";
import { setErrorInputStates } from "@utils/forms/formState";
import { submitPostForm } from "@utils/forms/submitForm";
import { updateFormInfo } from "@utils/forms/updateFormInfo";
import { isFilledForm } from "@utils/validation";
import { FC, Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InitAppData, defaultInitAppData } from "@models/HR/InitAppData";
import { InitAppDataFormState, defaultInitAppDataFormState } from "@models/States/InitAppDataFormState";
import { ChangeData } from "@models/EventData/ChangeData";
import InitDepTeamForm from "@components/Forms/departmentTeam/InitDepTeamForm";



interface InitWizardDialogProps {
    open: boolean,
}


const InitWizardDialog: FC<InitWizardDialogProps> = ({open}) => {
    const [formData, setFormData] = useState<InitAppData>(defaultInitAppData)
    const [formState, setFormState] = useState<InitAppDataFormState>(defaultInitAppDataFormState)
    const [disabled, setDisabled] = useState<Record<int, boolean>>({1: false, 2: true, 3: true});
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
        <Dialog 
            open={open} 
            stretch
            footer={
                <Bar
                    design={BarDesign.Footer}
                    endContent={
                        <Fragment>
                            {
                                selected > 1 &&
                                <Button design={ButtonDesign.Emphasized} onClick={previousButtonOnClick}>Назад</Button>
                            }
                            {
                                selected < 3 &&
                                <Button design={ButtonDesign.Transparent} onClick={nextButtonOnClick}>Напред</Button>
                            }
                            {
                                selected == 3 &&
                                <Button design={ButtonDesign.Transparent} onClick={submitForms}>Запази</Button>
                            }
                        </Fragment>
                    }
                /> 
            }
        >
            <Wizard onStepChange={handleStepChange} contentLayout={WizardContentLayout.SingleStep}>
            <WizardStep titleText="Позиция" icon="sap-icon://suitcase"  selected={selected == 1} data-step={1} disabled={disabled[1]}>
                    <FlexBox direction={FlexBoxDirection.Column} style={{padding:"1rem 2rem"}}>
                        <Title>Нова Позиция</Title>
                        <InitPositionForm
                            getFormState={() => {return formState.positionInsert}}
                            getFormData={() => {return formData.positionInsert}}
                            setFormStates={setFormStates}
                        />
                    </FlexBox>
                </WizardStep>


                <WizardStep titleText="Отдел" icon="sap-icon://company-view" selected={selected == 2} data-step={2} disabled={disabled[2]}>
                    <FlexBox direction={FlexBoxDirection.Column} style={{padding:"1rem 2rem"}}>
                        <Title>Нов Отдел</Title>
                        <InitDepartmentForm
                            getFormState={() => {return formState.departmentInsert}}
                            getFormData={() => {return formData.departmentInsert}}
                            setFormStates={setFormStates}
                        />
                    </FlexBox>
                </WizardStep>



                <WizardStep titleText="Екип" icon="sap-icon://group"  selected={selected == 3} data-step={3} disabled={disabled[3]}>
                    <FlexBox direction={FlexBoxDirection.Column} style={{padding:"1rem 2rem"}}>
                        <Title>Нов Екип</Title>
                        <InitDepTeamForm
                            getFormState={() => {return formState.departmentTeamInsert}}
                            getFormData={() => {return formData.departmentTeamInsert}}
                            setFormStates={setFormStates}
                        />
                    </FlexBox>
                </WizardStep>
            </Wizard>
        </Dialog>
    )
}

export default InitWizardDialog
