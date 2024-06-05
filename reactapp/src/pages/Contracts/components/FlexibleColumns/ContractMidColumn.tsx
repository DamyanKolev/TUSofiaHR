import { FC, useContext, useState, useEffect, Fragment } from 'react';
import { Bar, Button, ButtonDesign, ButtonType, FCLLayout, FlexBox, FlexBoxDirection, Form, FormItem, Option, Select, SelectDomRef, Title, Ui5CustomEvent } from '@ui5/webcomponents-react';
import { Contract, ContractUpdateData, createContractUpdateData, defaultContractUpdateDTO } from '@/pages/Contracts/models/Contract';
import { toggle } from '@store/slices/toggleSlice';
import { useAppDispatch } from '@store/storeHooks';
import { ContractView } from '@/pages/Contracts/models/ContractView';
import { getUpdateData } from '@utils/getData';
import { submitPutForm } from '@utils/forms/submitForm';
import { TableRowState } from '@app-types/TableRowState';
import ContractOperation from '@app-types/enums/ContractOperation';
import { SelectChangeEventDetail } from '@ui5/webcomponents/dist/Select.js';
import { formContainerCSS } from '@utils/css';
import { AnnexView } from '@/pages/Contracts/models/Views/AnnexView';
import { ContractUpdateSchema } from '../../models/ContractSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import TerminateCreateForm from '../Forms/TerminateCreateForm';
import UpdateContractForm from '../Forms/UpdateContractForm';
import { ContractPageContext } from '../../ContractPage';



interface ContractMidColumnProps {
    handleLayoutState: (layout: FCLLayout) => void,
    tableURL: string
}



const ContractMidColumn: FC<ContractMidColumnProps> = ({tableURL, handleLayoutState}) => {
    const rowState = useContext<TableRowState<ContractView> | undefined>(ContractPageContext)
    const [updateData, setUpdateData] = useState<ContractUpdateData>({} as ContractUpdateData)
    const [contractOperation, setContractOperation] = useState<string>("")
    const [editMode, setEditMode] = useState<boolean>(false)
    const [annex, setAnnex] = useState<Array<AnnexView>>([])
    const dispatchIsSuccess = useAppDispatch()

    const contractForm = useForm<Contract>({
        defaultValues: defaultContractUpdateDTO,
        mode: "onChange",
        resolver: zodResolver(ContractUpdateSchema),
    });
    
    const init = async () => {
        if(rowState) {
            const tableRow = await getUpdateData<Contract, number>(rowState.selectedRow.contractId, `${tableURL}/find-by-id`)
            const employeeAnnex = await getUpdateData<Array<AnnexView>, number>(rowState.selectedRow.employeeId, `${tableURL}/employee-annex`)
            if (tableRow != null) {
                contractForm.reset(tableRow)
                setUpdateData(createContractUpdateData(rowState.selectedRow))
            }
            if (employeeAnnex != null) (
                setAnnex(employeeAnnex)
            )
        }
    }

    const setDefaultValues = () => {
        setContractOperation("")
        handleLayoutState(FCLLayout.OneColumn)
        setEditMode(false)
    }


    const successCalback = ():void => {
        dispatchIsSuccess(toggle())
        setDefaultValues()
    }
    
    const navBackClick = () => {
        setDefaultValues()
    }

    const onSubmit = (data: Contract) => {
        try {
            const jsonData = JSON.stringify(data, null, 2)
            submitPutForm(tableURL, jsonData, successCalback)
            contractForm.reset()
        }
        catch (error) {
            console.error(error)
        }
    };

    useEffect(() => {
        if (rowState) {
            if (Object.keys(rowState.selectedRow).length > 0) {
                init()
            }
        }
    }, [rowState]);


    


    const handleSelectChange = (event: Ui5CustomEvent<SelectDomRef, SelectChangeEventDetail>) => {
        const selectedItem = event.detail.selectedOption.textContent
        if(selectedItem) {
            setContractOperation(selectedItem)
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
                            contractForm.getValues("terminationTypeId") == null && 
                            <Option>{ContractOperation.Termination}</Option>
                        }
                        <Option>{ContractOperation.Corection}</Option>
                        <Option>{ContractOperation.Deletion}</Option>
                    </Select>
                }


                {
                    contractOperation == ContractOperation.Termination && 
                    <Form 
                        onSubmit={contractForm.handleSubmit(onSubmit)} 
                        labelSpanM={4}
                        style={{padding: "1rem 2rem"}}
                    >
                        <TerminateCreateForm
                            control={contractForm.control}
                            formState={contractForm.formState}
                        />

                        <FormItem>
                            <Button type={ButtonType.Submit}>Запази</Button>
                        </FormItem>
                    </Form>
                }


                {
                    contractOperation == ContractOperation.Corection &&
                    <Form 
                        onSubmit={contractForm.handleSubmit(onSubmit)} 
                        labelSpanM={4}
                        style={{padding: "1rem 2rem"}}
                    >
                        <UpdateContractForm
                            getEditMode={() => {return editMode}}
                            getUpdateData={() => {return updateData}}
                            control={contractForm.control}
                        />

                        <FormItem>
                            <Button type={ButtonType.Submit}>Запази</Button>
                        </FormItem>
                    </Form>
                }
            </FlexBox>
            
            <Bar design="Footer">
                <Button slot="endContent" design={ButtonDesign.Transparent} onClick={navBackClick}>Отказ</Button>
            </Bar>
        </Fragment>
    );
};

export default ContractMidColumn;