import { FC, useContext, useState, useEffect, Fragment } from 'react';
import { Bar, Button, ButtonDesign, DatePickerDomRef, FCLLayout, InputDomRef, StandardListItemDomRef, Ui5CustomEvent, ValueState } from '@ui5/webcomponents-react';
import { Contract, defaultContract } from '@models/HR/Contract';
import { toggle } from '@store/slices/toggleSlice';
import { useAppDispatch } from '@store/storeHooks';
import { ContractView } from '@models/TableViews/ContractView';
import {getUpdateData } from '@/utils/getData';
import { ContractPageContext } from '@pages/hr/ContractPage';
import UpdateContractForm from '@components/Forms/contract/UpdateContractForm';
import { ContractUpdateData, UpdateContractFormState, createContractUpdateData, defaultUpdateContractFormState } from '@/models/FormStates/contract/UpdateContractFormState';
import { submitPutForm } from '@/utils/forms/submitForm';
import { TableRowState } from '@/types/TableRowState';
import { isFilledForm } from '@/utils/validation';
import { setErrorInputStates } from '@/utils/forms/formState';
import { handleDateChangeFunc, handleInputChangeFunc } from '@/utils/handlers/onChangeHandlers';
import { DatePickerChangeEventDetail } from '@ui5/webcomponents/dist/DatePicker.js';
import { parseValueByType } from '@/utils/parsers';
import DataType from '@/types/DataType';



interface ContractMidColumnProps {
    handleLayoutState: (layout: FCLLayout) => void,
    tableURL: string
}



const ContractMidColumn: FC<ContractMidColumnProps> = ({tableURL, handleLayoutState}) => {
    const rowState = useContext<TableRowState<ContractView> | undefined>(ContractPageContext)
    const [formState, setFormState] = useState<UpdateContractFormState>(defaultUpdateContractFormState)
    const [formData, setFormData] = useState<Contract>(defaultContract)
    const [updateData, setUpdateData] = useState<ContractUpdateData>({} as ContractUpdateData)
    const [editMode, setEditMode] = useState<boolean>(false)
    const [disabled, setDisabled] = useState<boolean>(true)
    const dispatchIsSuccess = useAppDispatch()


    const init = async () => {
        if(rowState) {
            const tableRow = await getUpdateData<Contract, number>(rowState.selectedRow.contractId, `${tableURL}/find-by-id`)
            if (tableRow != null) {
                setFormData(tableRow)
                setUpdateData(createContractUpdateData(rowState.selectedRow))
            }
        }
    }

    const setDefaultValues = () => {
        setFormState(defaultUpdateContractFormState)
        setFormData(defaultContract)
        handleLayoutState(FCLLayout.OneColumn)
        setDisabled(true)
        setEditMode(false)
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

    //input change event listener 
    const handleInputChange = (event: Ui5CustomEvent<InputDomRef, never>) => {
        const target = event.target
        handleInputChangeFunc(target, formData, setFormData, formState, setFormState);
        if (disabled) {setDisabled(false)}
    };
    
    //date input change event listener 
    const handleDateChange = (event: Ui5CustomEvent<DatePickerDomRef, DatePickerChangeEventDetail>) => {
        const target = event.target
        handleDateChangeFunc(target, formData, setFormData, formState, setFormState);
        if (disabled) {setDisabled(false)}
    }

    const handleConfirm = (selectedItem: StandardListItemDomRef, name: string) => {
        const rowId = selectedItem.id
        const newFormData = parseValueByType(formData, name, rowId, DataType.Int);
        setFormData(newFormData);

        if (formState.hasOwnProperty(name)) {
            const newFormState = {...formState, [name]: { isFilled: true, isChanged: false, valueState: ValueState.None}}
            setFormState(newFormState)
        }
        if (disabled) {setDisabled(false)}
    }

    return (
        <Fragment>
            <Bar startContent={
                    <Button design="Transparent" icon="nav-back" onClick={navBackClick}/>
                }
                endContent={
                    <Button onClick={() => setEditMode(!editMode)}>{editMode ? 'Display-Only Mode' : 'Edit Mode'}</Button>
                }
            />
            <UpdateContractForm
                getEditMode={() => {return editMode}}
                getFormData={() => {return formData}}
                getFormState={() => {return formState}}
                getUpdateData={() => {return updateData}}
                handleInputChange={handleInputChange}
                handleDateChange={handleDateChange}
                handleConfirm={handleConfirm}
            />
            
            <Bar design="Footer">
                <Button slot="endContent" design={ButtonDesign.Transparent} onClick={navBackClick}>Отказ</Button>
                <Button slot="endContent" design={ButtonDesign.Emphasized} disabled={disabled} onClick={submitForm}>Запази</Button>
            </Bar>
        </Fragment>
    );
};

export default ContractMidColumn;