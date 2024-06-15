import { Dispatch, FC, SetStateAction, useState } from "react";
import { useAppDispatch } from "@store/storeHooks";
import { Bar, Button, FCLLayout, FlexBox, FlexBoxAlignItems, FlexBoxDirection, Form, Option, Page, Select, SelectDomRef, Title, TitleLevel, Ui5CustomEvent } from "@ui5/webcomponents-react";
import { createEmployeeContract } from "@pages/Contracts/models/EmployeeContract";
import { SelectChangeEventDetail } from "@ui5/webcomponents/dist/Select.js";
import ContractType from "@app-types/enums/ContractType";
import { formContainerCSS } from "@utils/css";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnnexInsertDTO, defaultAnnexInsert } from "@pages/Contracts/models/Annex";
import { useForm } from "react-hook-form";
import { AnnexInsertSchema } from "@pages/Contracts/models/AnnexSchemas";
import { Contract, ContractInsertDTO, defaultContractInsert } from "@pages/Contracts/models/Contract";
import AnnexCreateForm from "@pages/Contracts/components/Forms/AnnexCreateForm";
import CreateContractForm from "@pages/Contracts/components/Forms/CreateContractForm";
import { EmployeeView } from "@pages/Employees/models/EmployeeView";
import { EndColumnEnum } from "@pages/Employees/models/EndColumnEnum";
import { ContractInsertSchema } from "@/pages/Contracts/models/ContractSchema";
import { formToggle } from "@/store/slices/formToggleSlice";
import { getUpdateData, submitPostForm } from "@/utils/requests";


interface Props {
    setLayout: Dispatch<SetStateAction<FCLLayout>>,
    layout: FCLLayout
    selectedRow: EmployeeView
    setEndColumnOption: Dispatch<SetStateAction<EndColumnEnum>>
}


const CreateContractEndColumn: FC<Props> = ({setLayout, layout, selectedRow, setEndColumnOption}) => {
    const [contract, setContract] = useState<string>("");
    const dispatchIsSuccess = useAppDispatch()
    const tableURL = "/api/hr/contracts"
    const annexForm = useForm<AnnexInsertDTO>({
        defaultValues: defaultAnnexInsert,
        mode: "onChange",
        resolver: zodResolver(AnnexInsertSchema),
    });
    const contractForm = useForm<ContractInsertDTO>({
        defaultValues: defaultContractInsert,
        mode: "onChange",
        resolver: zodResolver(ContractInsertSchema),
    });


    const setDefaultState = () => {
        setLayout(FCLLayout.TwoColumnsMidExpanded)
        setContract("")
        setEndColumnOption(EndColumnEnum.None)
    }

    const successCalback = () => {
        setDefaultState()
        dispatchIsSuccess(formToggle())
    }


    const onSubmitContract = (data: ContractInsertDTO) => {
        try {
            const employeeId = selectedRow.employeeId
            const employeeContract = createEmployeeContract(employeeId, data)
            const formData = JSON.stringify(employeeContract, null, 2)
            submitPostForm(`${tableURL}/create`, formData, successCalback)
            contractForm.reset(defaultContractInsert)            
        }
        catch (error) {
            console.error(error)
        }
    };


    const onSubmitAnnex = (data: AnnexInsertDTO) => {
        try {
            const formData = JSON.stringify(data, null, 2)
            submitPostForm(`${tableURL}/create-annex`, formData, successCalback)
            annexForm.reset(defaultAnnexInsert)            
        }
        catch (error) {
            console.error(error)
        }
    };


    const handleSelectChange = async (event: Ui5CustomEvent<SelectDomRef, SelectChangeEventDetail>) => {
        try {
            const selectedItem = event.detail.selectedOption.textContent
            if(selectedItem) {
                setContract(selectedItem)

                if (selectedItem === ContractType.Annex) {
                    const currEmployeeId = selectedRow.employeeId
                    const result = await getUpdateData<Contract, number>(currEmployeeId, `${tableURL}/find-by-employee-id`)

                    annexForm.setValue("contractId", result.id)
                    contractForm.reset(defaultContractInsert) //set to default value contract form
                }
                else if (selectedItem === ContractType.Contract) {
                    annexForm.reset(defaultAnnexInsert)  //set to default value annex form          
                }
            }
        }
        catch (error) {
            console.error(error)
        }
    }

    const onClickFullscreen = () => {
        if (layout === FCLLayout.ThreeColumnsMidExpanded) {
            setLayout(FCLLayout.EndColumnFullScreen)
        }
        else {
            setLayout(FCLLayout.ThreeColumnsMidExpanded)
        }
    }


    return (
        <Page
            header={
                <Bar
                    startContent={
                        <Button design="Transparent" icon="nav-back" onClick={setDefaultState}/>
                    }
                    endContent={
                        <Button 
                            icon={layout == FCLLayout.TwoColumnsMidExpanded ? "full-screen" : "exit-full-screen"}
                            onClick={onClickFullscreen}
                        />
                    }
                />
            }

            footer={
                <Bar
                    endContent={
                        <>
                            {
                                contract === ContractType.Contract && 
                                <Button onClick={contractForm.handleSubmit(onSubmitContract)}>Запази</Button>
                            }
                            {
                                contract === ContractType.Annex && 
                                <Button onClick={annexForm.handleSubmit(onSubmitAnnex)}>Запази</Button>
                            }
                        </>

                    }
                />
            }
        >
            

            <FlexBox direction={FlexBoxDirection.Column} style={formContainerCSS}>
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                        <Title level={TitleLevel.H4}>Договор/Анекс</Title>
                        <Select onChange={handleSelectChange}>
                            <Option></Option>
                            <Option>{ContractType.Contract}</Option>
                            <Option>{ContractType.Annex}</Option>
                        </Select>
                    </FlexBox>

                {
                    contract === ContractType.Contract &&
                    <FlexBox direction={FlexBoxDirection.Column} style={{gap:"1rem"}}>
                        <Form
                            labelSpanM={4}
                            titleText="Нов Договор"
                        >
                            <CreateContractForm
                                control={contractForm.control}
                                formState={contractForm.formState}
                            />
                        </Form>
                    </FlexBox>
                }


                {
                    contract === ContractType.Annex &&
                    <FlexBox direction={FlexBoxDirection.Column} style={{gap:"1rem"}}>
                        <Form
                            labelSpanM={4}
                            titleText="Нов Анекс"
                        >
                            <AnnexCreateForm
                                control={annexForm.control}
                                formState={annexForm.formState}
                            />
                        </Form>
                    </FlexBox>
                }
            </FlexBox>
        </Page>
    );
};

export default CreateContractEndColumn;
