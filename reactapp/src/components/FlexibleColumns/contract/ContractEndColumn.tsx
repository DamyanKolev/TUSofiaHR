import { FC, useState, Fragment, CSSProperties } from "react";
import { ContractInsertDTO, defaultContractInsert } from "@models/HR/Contract";
import { InsertContractFormState, defaultInsertContractFormState } from "@models/FormStates/contract/InsertContractFormState";
import { toggle } from "@store/slices/toggleSlice";
import { useAppDispatch } from "@store/storeHooks";
import { isFilledForm } from "@utils/validation";
import { Bar, BarDesign, Button, FCLLayout, FlexBox, FlexBoxAlignItems, FlexBoxDirection, Label, Title, TitleLevel } from "@ui5/webcomponents-react";
import EmployeeTableSelect from "@components/TableSelect/EmployeeTableSelect";
import { formTogle } from "@store/slices/formTogleSlice";
import CreateContractForm from "@components/Forms/contract/CreateContractForm";
import { submitPostForm } from "@/utils/forms/submitForm";
import { setErrorInputStates } from "@/utils/forms/formInputState";
import { createEmployeeContract } from "@/models/HR/EmployeeContract";


const formContainerCSS: CSSProperties = {
    padding: "1.5rem 2rem",
    height: "calc(100vh - 14.53rem)",
    maxHeight: "calc(100vh - 14.53rem)",
    gap: "3rem"
}

interface CreateEndColumnProps {
    handleLayoutState: (layout: FCLLayout) => void,
    tableURL: string
}


const CreateEndColumn: FC<CreateEndColumnProps> = ({tableURL, handleLayoutState}) => {
    const [formData, setFormData] = useState<ContractInsertDTO>(defaultContractInsert);
    const [formState, setFormState] = useState<InsertContractFormState>(defaultInsertContractFormState);
    const [employeeId, setEmployeeId] = useState<int>(0);
    const [isSelected, setIsSelected] = useState<boolean>(false)
    const dispatchIsSuccess = useAppDispatch()

    const employeeFormDataSetter = (rowId: int) => {
        setEmployeeId(rowId)
        setIsSelected(true)
    }

    const setDefaultState = () => {
        handleLayoutState(FCLLayout.OneColumn)
        setFormData(defaultContractInsert)
        setFormState(defaultInsertContractFormState)
        setIsSelected(false)
        dispatchIsSuccess(formTogle())
    }

    const successCalback = () => {
        dispatchIsSuccess(toggle())
        setDefaultState()
    }

    const navBackClick = () => {
        setDefaultState()
    }

    const onSubmitForm = async () => {
        const isFilled = isFilledForm<InsertContractFormState>(formState)

        if (isFilled) {
            const formObject = createEmployeeContract(employeeId, formData) 
            submitPostForm(`${tableURL}/create`, JSON.stringify(formObject), successCalback)
        }
        else {
            setErrorInputStates(formState, setFormState)
        }
    };


    return (
        <Fragment>
            <Bar design={BarDesign.Subheader} 
                startContent={<Button design="Transparent" icon="nav-back" onClick={navBackClick}/>}
            />

            <FlexBox direction={FlexBoxDirection.Column} style={formContainerCSS}>
                <FlexBox direction={FlexBoxDirection.Column}>
                    <Title level={TitleLevel.H3} >Служител</Title>
                    <FlexBox direction={FlexBoxDirection.Column} alignItems={FlexBoxAlignItems.End} style={{maxWidth: "fit-content", paddingLeft:"2rem"}}>
                        <Label>Служител</Label>
                        <EmployeeTableSelect formDataSetter={employeeFormDataSetter}/>
                    </FlexBox>
                </FlexBox>
                {
                    isSelected &&
                    <FlexBox direction={FlexBoxDirection.Column} style={{gap:"1rem"}}>
                        <Title level={TitleLevel.H3}>Договор</Title>
                        <CreateContractForm
                            style={{paddingLeft:"3rem", gap:"10rem"}}
                            getFormState={()=> {return formState}}
                            getFormData={() => {return formData}}
                            setFormData={setFormData}
                            setFormState={setFormState}
                        />
                    </FlexBox>
                }
            </FlexBox>

            
            <Bar
                design={BarDesign.Footer}
                endContent={
                    <Button onClick={onSubmitForm}>Create</Button>
                }
            />
        </Fragment>
    );
};

export default CreateEndColumn;