import { FC, useState, Fragment } from "react";
import { Contract, ContractInsertDTO, defaultContractInsert } from "@models/HR/Contract";
import { AnnexInsertFormState, ContractInsertFormState, defaultAnnexInsertFormState, defaultContractInsertFormState } from "@models/States/contract/ContractInsertFormState";
import { toggle } from "@store/slices/toggleSlice";
import { useAppDispatch } from "@store/storeHooks";
import { isFilledForm } from "@utils/validation";
import { Bar, BarDesign, Button, ButtonDesign, FCLLayout, FlexBox, FlexBoxAlignItems, FlexBoxDirection, Option, Select, SelectDomRef, StandardListItemDomRef, Title, TitleLevel, Ui5CustomEvent } from "@ui5/webcomponents-react";
import { formToggle } from "@store/slices/formToggleSlice";
import { setErrorInputStates } from "@utils/forms/formState";
import { submitPostForm } from "@utils/forms/submitForm";
import { createEmployeeContract } from "@models/HR/EmployeeContract";
import { updateFormInfo } from "@utils/forms/updateFormInfo";
import DataType from "@app-types/enums/DataType";
import { ChangeData } from "@models/EventData/ChangeData";
import { SelectChangeEventDetail } from "@ui5/webcomponents/dist/Select.js";
import ContractType from "@app-types/enums/ContractType";
import { formContainerCSS } from "@utils/css";
import EmployeeTableSelect from "@components/Selects/TableSelect/EmployeeTableSelect";
import CreateContractForm from "@components/Forms/contract/CreateContractForm";
import AnnexCreateForm from "@components/Forms/contract/AnnexCreateForm";
import { getUpdateData } from "@utils/getData";


interface CreateEndColumnProps {
    handleLayoutState: (layout: FCLLayout) => void,
    tableURL: string
}


const CreateEndColumn: FC<CreateEndColumnProps> = ({tableURL, handleLayoutState}) => {
    const [formData, setFormData] = useState<ContractInsertDTO>(defaultContractInsert);
    const [contractFormState, setContractFormState] = useState<ContractInsertFormState>(defaultContractInsertFormState);
    const [addAgreementformState, setAddAgreementFormState] = useState<AnnexInsertFormState>(defaultContractInsertFormState);
    const [employeeId, setEmployeeId] = useState<int>(0);
    const [contractId, setContractId] = useState<int>(0);
    const [disabled, setDisabled] = useState<boolean>(true)
    const [contract, setContract] = useState<string>("");
    const [selected, setSelected] = useState<boolean>(false)
    const dispatchIsSuccess = useAppDispatch()


    const setDefaultState = () => {
        handleLayoutState(FCLLayout.OneColumn)
        setFormData(defaultContractInsert)
        setContractFormState(defaultContractInsertFormState)
        setAddAgreementFormState(defaultAnnexInsertFormState)
        setDisabled(true)
        dispatchIsSuccess(formToggle())
        setEmployeeId(0)
        setContractId(0)
        setContract("")
    }

    const setFormStates = (changeData: ChangeData) => {
        if (contract == ContractType.Contract) {
            updateFormInfo(changeData, formData, setFormData, contractFormState, setContractFormState)
        }
        else {
            updateFormInfo(changeData, formData, setFormData, addAgreementformState, setAddAgreementFormState)
        }
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
        const isFilledContract = isFilledForm<ContractInsertFormState>(contractFormState)
        const isFilledAnnex = isFilledForm<AnnexInsertFormState>(addAgreementformState)

        if (contract == ContractType.Contract) {
            if (isFilledContract) {
                const formObject = createEmployeeContract(employeeId, formData)
                submitPostForm(`${tableURL}/create`, formObject, successCalback)
            }
            else {
                setErrorInputStates(contractFormState, setContractFormState)
            }
        }
        else if (contract == ContractType.Annex){
            if (isFilledAnnex) {
                const newData: ContractInsertDTO = {
                    ...formData, 
                    isAnnex: true, 
                    sysAdministrativeTerritoryId: 1, 
                    documentTypeId: 3, 
                    contractId: contractId
                }
                submitPostForm(`${tableURL}/create-annex`, newData, successCalback)
            }
            else {
                setErrorInputStates(addAgreementformState, setAddAgreementFormState)
            }
        }
    };


    const handleConfirm = (selectedItem: StandardListItemDomRef, name: string) => {
        const changeData: ChangeData = {
            value: selectedItem.id,
            name: name,
            valueType: DataType.Int,
        }
        setFormStates(changeData)
    }

    const handleSelectChange = (event: Ui5CustomEvent<SelectDomRef, SelectChangeEventDetail>) => {
        const selectedItem = event.detail.selectedOption.textContent
        if(selectedItem) {
            setContract(selectedItem)
        }
    }


    const employeeFormDataSetter = async (employeeId: int) => {
        setEmployeeId(employeeId)
        const result = await getUpdateData<Contract, number>(employeeId, `${tableURL}/find-by-employee-id`)

        if (result != null) {
            setContractId(result.id)
        }
        else {
            setContract(ContractType.Contract)
        }
        if (!selected) {setSelected(true)}
    }


    return (
        <Fragment>
            <Bar design={BarDesign.Subheader} 
                startContent={<Button design="Transparent" icon="nav-back" onClick={navBackClick}/>}
            />

            <FlexBox direction={FlexBoxDirection.Column} style={formContainerCSS}>
                {
                    <FlexBox direction={FlexBoxDirection.Column} style={{gap:"1em"}}>
                        <Title level={TitleLevel.H3} >Служител</Title>
                        <FlexBox direction={FlexBoxDirection.Column} alignItems={FlexBoxAlignItems.End} style={{maxWidth: "fit-content", paddingLeft:"2rem"}}>
                            <EmployeeTableSelect formDataSetter={employeeFormDataSetter}/>
                        </FlexBox>
                    </FlexBox>
                }

                {contract == "" && selected && contractId != 0 &&
                    <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                        <Title level={TitleLevel.H4}>Договор</Title>
                        <Select onChange={handleSelectChange}>
                            <Option></Option>
                            <Option>{ContractType.Contract}</Option>
                            <Option>{ContractType.Annex}</Option>
                        </Select>
                    </FlexBox>
                }

                {
                    contract == ContractType.Contract &&
                    <FlexBox direction={FlexBoxDirection.Column} style={{gap:"1rem"}}>
                        <Title level={TitleLevel.H3}>Договор</Title>
                        <CreateContractForm
                            style={{paddingLeft:"3rem", gap:"10rem"}}
                            getFormState={()=> {return contractFormState}}
                            getFormData={() => {return formData}}
                            setFormStates={setFormStates}
                            handleConfirm={handleConfirm}
                        />
                    </FlexBox>
                }


                {
                    contract == ContractType.Annex &&
                    <FlexBox direction={FlexBoxDirection.Column} style={{gap:"1rem"}}>
                        <Title level={TitleLevel.H3}>Допълнително Споразумение</Title>
                        <AnnexCreateForm
                            style={{paddingLeft:"4rem", gap:"15rem"}}
                            getFormState={()=> {return addAgreementformState}}
                            getFormData={() => {return formData}}
                            setFormStates={setFormStates}
                            handleConfirm={handleConfirm}
                        />
                    </FlexBox>
                }
            </FlexBox>

            
            <Bar
                design={BarDesign.Footer}
                endContent={
                    <Fragment>
                        <Button design={ButtonDesign.Transparent} onClick={navBackClick}>Отказ</Button>
                        <Button design={ButtonDesign.Emphasized} onClick={onSubmitForm} disabled={disabled}>Запази</Button>
                    </Fragment>
                }
            />
        </Fragment>
    );
};

export default CreateEndColumn;
