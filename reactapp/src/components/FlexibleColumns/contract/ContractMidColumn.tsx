import { FC, useContext, useState, useEffect, Fragment } from 'react';
import { Bar, Button, ButtonDesign, FCLLayout, FlexBox, FlexBoxDirection, Option, Select, SelectDomRef, StandardListItemDomRef, Title, Ui5CustomEvent } from '@ui5/webcomponents-react';
import { Contract, defaultContractUpdateDTO } from '@models/HR/Contract';
import { toggle } from '@store/slices/toggleSlice';
import { useAppDispatch } from '@store/storeHooks';
import { ContractView } from '@models/TableViews/ContractView';
import { getUpdateData } from '@utils/getData';
import { ContractPageContext } from '@pages/hr/ContractPage';
import UpdateContractForm from '@components/Forms/contract/UpdateContractForm';
import { submitPutForm } from '@utils/forms/submitForm';
import { ContractUpdateData, ContractUpdateFormState, createContractUpdateData, defaultContractUpdateFormState, defaultTerminationFormState } from '@models/States/contract/ContractUpdateFormState';
import { updateFormInfo } from '@utils/forms/updateFormInfo';
import DataType from '@app-types/enums/DataType';
import { isFilledForm } from '@utils/validation';
import { setErrorInputStates } from '@utils/forms/formState';
import { TableRowState } from '@app-types/TableRowState';
import { ChangeData } from '@models/EventData/ChangeData';
import ContractOperation from '@app-types/enums/ContractOperation';
import { SelectChangeEventDetail } from '@ui5/webcomponents/dist/Select.js';
import TerminateCreateForm from '@components/Forms/contract/TerminateCreateForm';
import { formContainerCSS } from '@utils/css';
import { AnnexView } from '@models/TableViews/AnnexView';



interface ContractMidColumnProps {
    handleLayoutState: (layout: FCLLayout) => void,
    tableURL: string
}



const ContractMidColumn: FC<ContractMidColumnProps> = ({tableURL, handleLayoutState}) => {
    const rowState = useContext<TableRowState<ContractView> | undefined>(ContractPageContext)
    const [formState, setFormState] = useState<ContractUpdateFormState>(defaultContractUpdateFormState)
    const [formData, setFormData] = useState<Contract>(defaultContractUpdateDTO)
    const [updateData, setUpdateData] = useState<ContractUpdateData>({} as ContractUpdateData)
    const [contractOperation, setContractOperation] = useState<string>("")
    const [editMode, setEditMode] = useState<boolean>(false)
    const [disabled, setDisabled] = useState<boolean>(true)
    const [annex, setAnnex] = useState<Array<AnnexView>>([])

    const dispatchIsSuccess = useAppDispatch()
    
    const init = async () => {
        if(rowState) {
            const tableRow = await getUpdateData<Contract, number>(rowState.selectedRow.contractId, `${tableURL}/find-by-id`)
            const employeeAnnex = await getUpdateData<Array<AnnexView>, number>(rowState.selectedRow.employeeId, `${tableURL}/employee-annex`)
            if (tableRow != null && employeeAnnex != null) {
                setFormData(tableRow)
                setUpdateData(createContractUpdateData(rowState.selectedRow))
                setAnnex(employeeAnnex)
            }
        }
    }

    const setDefaultValues = () => {
        setContractOperation("")
        setFormState(defaultContractUpdateFormState)
        setFormData(defaultContractUpdateDTO)
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

    const submitForm = () => {
        if (isFilledForm(formState)) {
            submitPutForm(tableURL, formData, successCalback) 
        }
        else {
            setErrorInputStates(formState, setFormState)
        }
    };

    useEffect(() => {
        if (rowState) {
            if (Object.keys(rowState.selectedRow).length > 0) {
                init()
            }
        }
    }, [rowState]);


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
            setContractOperation(selectedItem)
            if (selectedItem == ContractOperation.Termination) {
                setFormState(defaultTerminationFormState)
            }
        }
    }

    return (
        <Fragment>
            <Bar startContent={
                    <Button design="Transparent" icon="nav-back" onClick={navBackClick}/>
                }
                endContent={
                    contractOperation == ContractOperation.Corection &&
                    <Button onClick={() => setEditMode(!editMode)}>{editMode ? 'Display-Only Mode' : 'Edit Mode'}</Button>
                }
            />
            

            <FlexBox style={formContainerCSS} direction={FlexBoxDirection.Column}>
                { annex.length > 0 &&
                    <FlexBox>
                        <Title></Title>
                        <Select>

                        </Select>
                    </FlexBox>
                }


                {
                    contractOperation == "" &&
                    <Select style={{width: "15rem"}} onChange={handleSelectChange}>
                        <Option></Option>
                        {
                            formData.terminationTypeId == "" && 
                            <Option>{ContractOperation.Termination}</Option>
                        }
                        <Option>{ContractOperation.Corection}</Option>
                        <Option>{ContractOperation.Deletion}</Option>
                    </Select>
                }


                {
                    contractOperation == ContractOperation.Termination && 
                    <TerminateCreateForm
                        getFormData={() => {return formData}}
                        getFormState={() => {return formState}}
                        setFormStates={setFormStates}
                        handleConfirm={handleConfirm}
                    />
                }


                {
                    contractOperation == ContractOperation.Corection &&
                    <UpdateContractForm
                        getEditMode={() => {return editMode}}
                        getFormData={() => {return formData}}
                        getFormState={() => {return formState}}
                        getUpdateData={() => {return updateData}}
                        setFormStates={setFormStates}
                        handleConfirm={handleConfirm}
                    />
                }
            </FlexBox>
            
            <Bar design="Footer">
                <Button slot="endContent" design={ButtonDesign.Transparent} onClick={navBackClick}>Отказ</Button>
                <Button slot="endContent" design={ButtonDesign.Emphasized} disabled={disabled} onClick={submitForm}>Запази</Button>
            </Bar>
        </Fragment>
    );
};

export default ContractMidColumn;