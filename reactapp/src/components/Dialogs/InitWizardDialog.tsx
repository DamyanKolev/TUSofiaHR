import { WizardStepChangeEventDetail } from "@ui5/webcomponents-fiori/dist/Wizard.js";
import { Bar, BarDesign, Button, ButtonDesign, ButtonType, Dialog, FlexBox, FlexBoxDirection, Title, Ui5CustomEvent, Wizard, WizardContentLayout, WizardDomRef, WizardStep } from "@ui5/webcomponents-react";
import { submitPostForm } from "@utils/forms/submitForm";
import { FC, Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InitAppData, defaultInitAppData } from "@models/HR/InitAppData";
import { InitAppDataSchema } from "@/models/schemas/InitAppDataSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InitPositionForm from "@/pages/Positions/components/InitPositionForm";
import InitDepartmentForm from "@/pages/Departments/components/InitDepartmentForm";



interface InitWizardDialogProps {
    open: boolean,
}


const InitWizardDialog: FC<InitWizardDialogProps> = ({open}) => {
    const [disabled, setDisabled] = useState<Record<int, boolean>>({1: false, 2: true, 3: true});
    const [selected, setSelected] = useState<int>(1);
    const navigate = useNavigate();
    const {
        handleSubmit,
        reset,
        control,
        formState,
    } = useForm<InitAppData>({
        defaultValues: defaultInitAppData,
        mode: "onChange",
        resolver: zodResolver(InitAppDataSchema),
    });

    
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


    const onSubmit = (data: InitAppData) => {
        try {
            const postURL = `api/hr/init-hr`
            const formData = JSON.stringify(data, null, 2)
            submitPostForm(postURL, formData, successCalback)
            reset()            
        }
        catch (error) {
            console.error(error)
        }
    };


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
                                <Button design={ButtonDesign.Transparent}>Запази</Button>
                            }
                        </Fragment>
                    }
                /> 
            }
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Wizard onStepChange={handleStepChange} contentLayout={WizardContentLayout.SingleStep}>
                    <WizardStep titleText="Позиция" icon="sap-icon://suitcase"  selected={selected == 1} data-step={1} disabled={disabled[1]}>
                        <FlexBox direction={FlexBoxDirection.Column} style={{padding:"1rem 2rem"}}>
                            <Title>Нова Позиция</Title>
                            <InitPositionForm
                                control={control}
                                formState={formState}
                            />
                        </FlexBox>
                    </WizardStep>


                    <WizardStep titleText="Отдел" icon="sap-icon://company-view" selected={selected == 2} data-step={2} disabled={disabled[2]}>
                        <FlexBox direction={FlexBoxDirection.Column} style={{padding:"1rem 2rem"}}>
                            <Title>Нов Отдел</Title>
                            <InitDepartmentForm
                                control={control}
                                formState={formState}
                            />
                        </FlexBox>

                        <Button design={ButtonDesign.Transparent} type={ButtonType.Submit}>Запази</Button>
                    </WizardStep>
                </Wizard>
            </form>
        </Dialog>
    )
}

export default InitWizardDialog
