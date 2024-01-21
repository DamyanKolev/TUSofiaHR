import { FC, useContext, useState, useEffect, Fragment } from 'react';
import { Bar, Button, FCLLayout } from '@ui5/webcomponents-react';
import { Contract, defaultContract } from '@models/HR/Contract';
import { toggle } from '@store/slices/toggleSlice';
import { useAppDispatch } from '@store/storeHooks';
import { ContractView } from '@models/TableViews/ContractView';
import { getRecordById } from '@utils/forms/getRecordById';
import { ContractPageContext } from '@pages/hr/ContractPage';
import UpdateContractForm from '@components/Forms/contract/UpdateContractForm';
import { ContractUpdateFormData, createContractUpdateFormData } from '@/models/FormStates/contract/UpdateContractFormState';
import { submitPutForm } from '@/utils/forms/submitForm';



interface ContractMidColumnProps {
    handleLayoutState: (layout: FCLLayout) => void,
    tableURL: string
}



const ContractMidColumn: FC<ContractMidColumnProps> = ({tableURL, handleLayoutState}) => {
    const selectedRow = useContext<ContractView>(ContractPageContext)
    const [formData, setFormData] = useState<Contract>(defaultContract)
    const [updateData, setUpdateData] = useState<ContractUpdateFormData>({} as ContractUpdateFormData)
    const [editMode, setEditMode] = useState<boolean>(false)
    const [isSelected, setIsSelected] = useState<boolean>(false)
    const dispatchIsSuccess = useAppDispatch()


    const setDefaultValues = () => {
        setFormData(defaultContract)
        handleLayoutState(FCLLayout.OneColumn)
        setIsSelected(false)
        setEditMode(false)
    }

    const successCalback = ():void => {
        dispatchIsSuccess(toggle())
        setDefaultValues()
    }
    
    const navBackClick = () => {
        setDefaultValues()
    }


    const submitForm = async () => {
        submitPutForm(tableURL, JSON.stringify(formData), successCalback)
    };

    useEffect(() => {
        if (selectedRow) {
            setUpdateData(createContractUpdateFormData(selectedRow))
            setIsSelected(true)
            getRecordById<Contract>(selectedRow.contractId, tableURL, setFormData)
        }
    }, [selectedRow]);


    return (
        <Fragment>
            <Bar startContent={
                    <Button design="Transparent" icon="nav-back" onClick={navBackClick}/>
                }
                endContent={
                    <Button onClick={() => setEditMode(!editMode)}>{editMode ? 'Display-Only Mode' : 'Edit Mode'}</Button>
                }
            />
            {isSelected &&
                    <UpdateContractForm
                        getEditMode={() => {return editMode}}
                        getFormData={() => {return formData}}
                        setFormData={setFormData}
                        getUpdateData={() => {return updateData}}
                        setUpdateData={setUpdateData}
                    />
                }
            
            <Bar design="Footer">
                <Button slot="endContent" onClick={submitForm} disabled={!editMode}>Update</Button>
            </Bar>
        </Fragment>
    );
};

export default ContractMidColumn;