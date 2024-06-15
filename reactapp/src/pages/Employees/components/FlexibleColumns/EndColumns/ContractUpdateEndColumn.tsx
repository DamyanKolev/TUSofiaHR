import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { 
    FCLLayout, Form, FormItem, Button, Bar, Page, ButtonDesign, Label
} from "@ui5/webcomponents-react";
import { useAppDispatch, useAppSelector } from '@store/storeHooks';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Contract, ContractUpdateData, createContractUpdateData, defaultContractUpdateDTO } from '@pages/Contracts/models/Contract';
import { contractJoinTablesInfo } from '@pages/Contracts/models/TableJoins/ContractJoinTablesInfo';
import { StandartListSelectField } from '@components/Forms/StandartFields/StandartListSelectField';
import { StandardDateField, StandardInputField, StandardLargeTableSelectField, StandardSmallTableSelectField } from '@components/Forms/StandartFields/StandartFieldsBundle';
import { clearContractView } from '@store/slices/contractSlice';
import { EndColumnEnum } from '@pages/Employees/models/EndColumnEnum';
import { getUpdateData, submitPutForm } from '@/utils/requests';
import { ContractUpdateSchema } from '@/pages/Contracts/models/ContractSchema';
import { formToggle } from '@/store/slices/formToggleSlice';



interface Props {
    setLayout: Dispatch<SetStateAction<FCLLayout>>,
    layout: FCLLayout
    setEndColumnOption: Dispatch<SetStateAction<EndColumnEnum>>
}


const ContractUpdateEndColumn: FC<Props> = ({setLayout, layout, setEndColumnOption}) => {
    const [updateData, setUpdateData] = useState<ContractUpdateData>({} as ContractUpdateData)
    const [editMode, setEditMode] = useState<boolean>(false)
    const selectedRow = useAppSelector((state) => state.selectedContract.value)
    const dispatch = useAppDispatch()
    const tableURL = "/api/hr/contracts"
    const {
        handleSubmit,
        reset,
        control,
    } = useForm<Contract>({
        defaultValues: defaultContractUpdateDTO,
        mode: "onChange",
        resolver: zodResolver(ContractUpdateSchema),
    });

    const init = async () => {
        try {
            if(selectedRow) {
                const tableRow = await getUpdateData<Contract, number>(selectedRow.contractId, `${tableURL}/find-by-id`)
                reset(tableRow)
                setUpdateData(createContractUpdateData(selectedRow))
            }
        }
        catch (error) {
            console.error(error)
        }
    }

    const setDefaultValues = () => {
        setLayout(FCLLayout.TwoColumnsMidExpanded)
        setEditMode(false)
        setEndColumnOption(EndColumnEnum.None)
    }

    const successCalback = ():void => {
        dispatch(clearContractView())
        dispatch(formToggle())
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
            const formData = JSON.stringify(data, null, 2)
            submitPutForm(tableURL, formData, successCalback)
            reset(defaultContractUpdateDTO)            
        }
        catch (error) {
            console.error(error)
        }
    };

    useEffect(() => {
        if (selectedRow) {
            init()
        }
    }, [selectedRow]);


    useEffect(() => {
        if (layout !== FCLLayout.ThreeColumnsMidExpanded && layout !== FCLLayout.EndColumnFullScreen) {
            if (editMode) {setEditMode(false)}
        }
    }, [layout]);


    return ( 
        <Page
            header={
                <Bar
                    startContent={
                        <Button icon="nav-back" design={ButtonDesign.Transparent} onClick={setDefaultValues}/>
                    }
                    endContent={
                        <>
                            <Button onClick={() => setEditMode(!editMode)}>{editMode ? 'Display-Only Mode' : 'Edit Mode'}</Button>
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
                        <Button onClick={handleSubmit(onSubmit)}>Запази</Button>
                    }
                />
            }
        >
                <Form
                    labelSpanM={4}
                    titleText="Промяна на договор"
                >
                    <FormItem label={<Label>Код корекция</Label>}>
                        <StandartListSelectField
                            values={[
                                {textContent: "Редовни данни", additionalText: "0"}, 
                                {textContent: "Коригиране", additionalText: "1"},
                                {textContent: "Заличаване", additionalText: "2"}
                            ]}
                            isLabel={false}
                            editMode={editMode}
                            name="codeCorection"
                            control={control}
                            rules={{ required: true }}
                            displayValue={""}
                        />
                        </FormItem>
                    <FormItem label={<Label>Работна заплата</Label>}>
                        <StandardInputField
                            editMode={editMode}
                            control={control}
                            rules={{ required: true }}
                            name='workingWage'
                        />  
                    </FormItem>
                    <FormItem label={<Label>Седмични часове</Label>}>
                        <StandardInputField
                            editMode={editMode}
                            control={control}
                            rules={{ required: true }}
                            name='workTime'
                        />  
                    </FormItem>
                    <FormItem label={<Label>Годишен отпуск</Label>}>
                        <StandardInputField
                            editMode={editMode}
                            rules={{ required: true }}
                            control={control}
                            name='annualLeave'
                        />  
                    </FormItem>
                    <FormItem label={<Label>Дата на сключване</Label>}>
                        <StandardDateField
                            editMode={editMode}
                            control={control}
                            name='conclusionDate'
                        />
                    </FormItem>
                        

                    <FormItem label={<Label>Дата на започване</Label>}>
                        <StandardDateField
                            editMode={editMode}
                            control={control}
                            name='executionDate'
                        />
                    </FormItem>


                    <FormItem label={<Label>Дата на започване</Label>}>
                        <StandardDateField
                            editMode={editMode}
                            control={control}
                            name='contractTerm'
                        />
                    </FormItem>


                    <FormItem label={<Label>Дата на Допълнително споразумение</Label>}>
                        <StandardDateField
                            editMode={editMode}
                            control={control}
                            name='additionalAgreementDate'
                        />
                    </FormItem>


                    <FormItem label={<Label>Дата на терминиране</Label>}>
                        <StandardDateField
                            editMode={editMode}
                            control={control}
                            name='terminationDate'
                        />
                    </FormItem>


                    <FormItem label={<Label>Тип Договор</Label>}>
                        <StandardSmallTableSelectField
                            editMode={editMode}
                            control={control}
                            rules={{ required: true }}
                            joinInfo={contractJoinTablesInfo.contractTypeId}
                            displayValue={updateData.contractTypeId}
                            name='contractTypeId'
                        />
                    </FormItem>


                    <FormItem label={<Label>Код на позицията</Label>}>
                        <StandardLargeTableSelectField
                            editMode={editMode}
                            joinInfo={contractJoinTablesInfo.positionId}
                            control={control}
                            name="sysPositionId"
                            displayValue={updateData.sysPositionId}
                        />
                    </FormItem>


                    <FormItem label={<Label>Код на икономическа активност</Label>}>
                    <StandardLargeTableSelectField
                            editMode={editMode}
                            joinInfo={contractJoinTablesInfo.iconomicActivityId}
                            control={control}
                            name="sysIconomicActivityId"
                            displayValue={updateData.sysIconomicActivityId}
                        />
                    </FormItem>


                    <FormItem label={<Label>Тип документ</Label>}>
                        <StandardSmallTableSelectField
                            editMode={editMode}
                            control={control}
                            rules={{ required: true }}
                            joinInfo={contractJoinTablesInfo.documentTypeId}
                            displayValue={updateData.documentTypeId}
                            name='documentTypeId'
                        />
                    </FormItem>

            

                    <FormItem label={<Label>Тип на терминиране</Label>}>
                        <StandardSmallTableSelectField
                            editMode={editMode}
                            control={control}
                            joinInfo={contractJoinTablesInfo.terminationTypeId}
                            displayValue={updateData.terminationTypeId}
                            name='terminationTypeId'
                        />
                    </FormItem>



                    <FormItem label={<Label>Код на икономическа активност</Label>}>
                        <StandardLargeTableSelectField
                            editMode={editMode}
                            joinInfo={contractJoinTablesInfo.administrativeTerritoryId}
                            control={control}
                            name="sysAdministrativeTerritoryId"
                            displayValue={updateData.sysAdministrativeTerritoryId}
                        />
                    </FormItem>
                </Form>
            </Page>
    )
}

export default ContractUpdateEndColumn;