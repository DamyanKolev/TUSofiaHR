import { FC, useContext, useState, useReducer, useEffect, Fragment } from 'react';
import { Bar, Button, FCLLayout } from '@ui5/webcomponents-react';
import { ContractUpdateDTO, defaultContractUpdate } from '@models/HR/Contract';
import DataType from '@app-types/DataType';
import { toggle } from '@store/slices/toggleSlice';
import { useAppDispatch } from '@store/storeHooks';
import { formatDate } from '@utils/formaters';
import { parseObjectToUpdateDate, parseValueByType } from '@utils/parsers';
import { ContractView } from '@models/TableViews/ContractView';
import { getRecordById } from '@utils/forms/getRecordById';
import { ContractPageContext } from '@pages/hr/ContractPage';
import UpdateContractForm from '@components/Forms/contract/UpdateContractForm';



interface ContractMidColumnProps {
    handleLayoutState: (layout: FCLLayout) => void,
    tableURL: string
}



const ContractMidColumn: FC<ContractMidColumnProps> = ({tableURL, handleLayoutState}) => {
    const selectedRow = useContext<ContractView>(ContractPageContext)
    const [formData, setFormData] = useState<ContractUpdateDTO>(defaultContractUpdate)
    const [editMode, toggleEditMode] = useReducer((prev) => !prev, false, undefined);
    const [isSelected, setIsSelected] = useState<boolean>(false)
    const dispatchIsSuccess = useAppDispatch()
    

    const formDataSetter = (formData: ContractUpdateDTO) => {
        setFormData(formData)
    }
    
    const setFormDataById = (rowId: string, name: string) => {
        const newFormData = parseValueByType<ContractUpdateDTO>(formData, name, rowId, DataType.Int);
        setFormData(newFormData);
    }

    const navBackClick = () => {
        handleLayoutState(FCLLayout.OneColumn)
        setFormData(defaultContractUpdate)
        setIsSelected(false)
    }


    const submitForm = async () => {
        const response = await fetch(`${tableURL}/update`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(
                {
                    id: selectedRow.contract_id,
                    update_data: {
                        ...parseObjectToUpdateDate(formData),
                        change_date: formatDate(new Date())
                    }
                }),
        });
        if (response.ok) {
            setIsSelected(false)
            setFormData(defaultContractUpdate)
            dispatchIsSuccess(toggle())
            handleLayoutState(FCLLayout.OneColumn)
        }
    };

    useEffect(() => {
        if (selectedRow) {
            setIsSelected(true)
            getRecordById<ContractUpdateDTO>(selectedRow.contract_id, tableURL, setFormData)
        }
    }, [selectedRow]);


    return (
        <Fragment>
            <Bar startContent={
                    <Button design="Transparent" icon="nav-back" onClick={navBackClick}/>
                }
                endContent={
                    <Button onClick={toggleEditMode}>{editMode ? 'Display-Only Mode' : 'Edit Mode'}</Button>
                }
            />
            {isSelected &&
                    <UpdateContractForm
                        getEditMode={() => {return editMode}}
                        getFormData={() => {return formData}}
                        setFormData={formDataSetter}
                        setFormDataById={setFormDataById}
                    />
                }
            
            <Bar design="Footer">
                <Button slot="endContent" onClick={submitForm} disabled={!editMode}>Update</Button>
            </Bar>
        </Fragment>
    );
};

export default ContractMidColumn;