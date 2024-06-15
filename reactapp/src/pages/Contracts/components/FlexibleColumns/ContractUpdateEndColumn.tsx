import { FC, useContext, useState, useEffect, SetStateAction, Dispatch } from 'react';
import { Bar, Button, FCLLayout, FlexBox, FlexBoxDirection, Form, Option, Page, Select, SelectDomRef, Ui5CustomEvent } from '@ui5/webcomponents-react';
import { useAppDispatch, useAppSelector } from '@store/storeHooks';
import UpdateContractForm from '@pages/Contracts/components/Forms/UpdateContractForm';
import { TableRowState } from '@app-types/TableRowState';
import ContractOperation from '@app-types/enums/ContractOperation';
import { SelectChangeEventDetail } from '@ui5/webcomponents/dist/Select.js';
import TerminateCreateForm from '@pages/Contracts/components/Forms/TerminateCreateForm';
import { formContainerCSS } from '@utils/css';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Contract, ContractUpdateData, createContractUpdateData, defaultContractUpdateDTO } from '@pages/Contracts/models/Contract';
import { ContractPageContext } from '@pages/Contracts/ContractPage';
import { EmployeeView } from '@pages/Employees/models/EmployeeView';
import { EndColumnEnum } from '@/pages/Employees/models/EndColumnEnum';
import { ContractUpdateSchema } from '../../models/ContractSchema';
import { getUpdateData, submitPutForm } from '@/utils/requests';
import { formToggle } from '@/store/slices/formToggleSlice';



interface Props {
    setLayout: Dispatch<SetStateAction<FCLLayout>>,
    layout: FCLLayout
    setEndColumnOption: Dispatch<SetStateAction<EndColumnEnum>>
}



const ContractUpdateEndColumn: FC<Props> = ({setLayout, layout, setEndColumnOption}) => {
    const rowState = useContext<TableRowState<EmployeeView> | undefined>(ContractPageContext)
    const [updateData, setUpdateData] = useState<ContractUpdateData>({} as ContractUpdateData)
    const [contractOperation, setContractOperation] = useState<string>("")
    const [editMode, setEditMode] = useState<boolean>(false)
    const selectedRow = useAppSelector((state) => state.selectedContract.value)
    // const [annex, setAnnex] = useState<Array<AnnexView>>([])
    const tableURL = "/api/hr/contracts"
    const dispatchIsSuccess = useAppDispatch()

    const contractForm = useForm<Contract>({
        defaultValues: defaultContractUpdateDTO,
        mode: "onChange",
        resolver: zodResolver(ContractUpdateSchema),
    });
    
    const init = async () => {
        try {
            if(rowState && selectedRow) {
                const tableRow = await getUpdateData<Contract, number>(selectedRow.contractId, `${tableURL}/find-by-id`)
                contractForm.reset(tableRow)
                setUpdateData(createContractUpdateData(selectedRow))
            }
        }
        catch (error) {
            console.error(error)
        }
    }

    const setDefaultValues = () => {
        setContractOperation("")
        setLayout(FCLLayout.TwoColumnsMidExpanded)
        setEditMode(false)
        setEndColumnOption(EndColumnEnum.None)
    }


    const successCalback = ():void => {
        dispatchIsSuccess(formToggle())
        setDefaultValues()
    }
    
    const navBackClick = () => {
        setDefaultValues()
    }


    const onClickFullscreen = () => {
        if (layout === FCLLayout.ThreeColumnsMidExpanded) {
            setLayout(FCLLayout.EndColumnFullScreen)
        }
        else {
            setLayout(FCLLayout.ThreeColumnsMidExpanded)
        }
    }


    const onSubmit = (data: Contract) => {
        try {
            const formData:Contract = {...data, article62Flag: false}
            const jsonData = JSON.stringify(formData, null, 2)
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
        <Page
            header={
                <Bar 
                    startContent={
                        <Button design="Transparent" icon="nav-back" onClick={navBackClick}/>
                    }
                    endContent={
                        <>
                            {
                                contractOperation == ContractOperation.Corection &&
                                <Button onClick={() => setEditMode(!editMode)}>{editMode ? 'Display-Only Mode' : 'Edit Mode'}</Button>
                            }
                            <Button 
                                icon={layout == FCLLayout.TwoColumnsMidExpanded ? "full-screen" : "exit-full-screen"}
                                onClick={onClickFullscreen}
                            />
                        </>
                    }
                />
            }
            footer={
                <Bar
                    endContent={
                        <Button onClick={contractForm.handleSubmit(onSubmit)}>Запази</Button>
                    }
                />
            }
        >
           
            

            <FlexBox style={formContainerCSS} direction={FlexBoxDirection.Column}>

                <Select style={{width: "15rem"}} onChange={handleSelectChange}>
                    <Option></Option>
                    {
                        contractForm.getValues("terminationTypeId") === null && 
                        <Option>{ContractOperation.Termination}</Option>
                    }
                    <Option>{ContractOperation.Corection}</Option>
                    {/* <Option>{ContractOperation.Deletion}</Option> */}
                </Select>


                {
                    contractOperation == ContractOperation.Termination &&  
                    // contractOperation == ContractOperation.Deletion &&
                    <Form 
                        onSubmit={contractForm.handleSubmit(onSubmit)} 
                        labelSpanM={4}
                        style={{padding: "1rem 2rem"}}
                        titleText='Прекратяване на договор'
                    >
                        <TerminateCreateForm
                            control={contractForm.control}
                            formState={contractForm.formState}
                        />
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
                    </Form>
                }
            </FlexBox>
        </Page>
    );
};

export default ContractUpdateEndColumn;