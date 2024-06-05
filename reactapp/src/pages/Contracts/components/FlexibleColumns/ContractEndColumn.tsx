import { FC, useState, Fragment } from "react";
import { Contract, ContractInsertDTO, defaultContractInsert } from "@/pages/Contracts/models/Contract";
import { toggle } from "@store/slices/toggleSlice";
import { useAppDispatch } from "@store/storeHooks";
import { Bar, BarDesign, Button, ButtonDesign, ButtonType, FCLLayout, FlexBox, FlexBoxAlignItems, FlexBoxDirection, Form, FormItem, Option, Select, SelectDomRef, Title, TitleLevel, Ui5CustomEvent } from "@ui5/webcomponents-react";
import { formToggle } from "@store/slices/formToggleSlice";
import { submitPostForm } from "@utils/forms/submitForm";
import { SelectChangeEventDetail } from "@ui5/webcomponents/dist/Select.js";
import ContractType from "@app-types/enums/ContractType";
import { formContainerCSS } from "@utils/css";
import EmployeeTableSelect from "@components/Selects/TableSelect/EmployeeTableSelect";
import { getUpdateData } from "@utils/getData";
import CreateContractForm from "../Forms/CreateContractForm";
import { AnnexInsertDTO, defaultAnnexInsert } from "../../models/Annex";
import { useForm } from "react-hook-form";
import { ContractInsertSchema } from "../../models/ContractSchema";
import { AnnexInsertSchema } from "../../models/AnnexSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import AnnexCreateForm from "../Forms/AnnexCreateForm";
import { createEmployeeContract } from "../../models/EmployeeContract";


interface CreateEndColumnProps {
    handleLayoutState: (layout: FCLLayout) => void,
    tableURL: string
}


const CreateEndColumn: FC<CreateEndColumnProps> = ({tableURL, handleLayoutState}) => {
    const [employeeId, setEmployeeId] = useState<int>(0);
    const [contract, setContract] = useState<string>("");
    const [selected, setSelected] = useState<boolean>(false)
    const dispatchIsSuccess = useAppDispatch()
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
        handleLayoutState(FCLLayout.OneColumn)
        dispatchIsSuccess(formToggle())
        setEmployeeId(0)
        setContract("")
    }


    const successCalback = () => {
        dispatchIsSuccess(toggle())
        setDefaultState()
    }

    const navBackClick = () => {
        setDefaultState()
    }


    const onSubmitContract = (data: ContractInsertDTO) => {
        try {
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
            console.log(formData)
        }
        catch (error) {
            console.error(error)
        }
    };



    const handleSelectChange = (event: Ui5CustomEvent<SelectDomRef, SelectChangeEventDetail>) => {
        const selectedItem = event.detail.selectedOption.textContent
        if(selectedItem) {
            setContract(selectedItem)
        }
    }


    const employeeFormDataSetter = async (currEmployeeId: int) => {
        if (currEmployeeId != employeeId) {
            setEmployeeId(currEmployeeId)
            const result = await getUpdateData<Contract, number>(currEmployeeId, `${tableURL}/find-by-employee-id`)

            if (result != null) {
                if(contract != "") {
                    setContract("")
                }
                annexForm.setValue("contractId", result.id)
            }
            else {
                setContract(ContractType.Contract)
            }
            if (!selected) {setSelected(true)}
        }
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

                {contract == "" && selected &&
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
                        <Form
                            onSubmit={contractForm.handleSubmit(onSubmitContract)} 
                            labelSpanM={4}
                            titleText="Нов Договор"
                        >
                            <CreateContractForm
                                control={contractForm.control}
                                formState={contractForm.formState}
                            />

                            <FormItem>
                                <Button design={ButtonDesign.Emphasized} type={ButtonType.Submit}>Добави</Button>
                            </FormItem>
                        </Form>
                    </FlexBox>
                }


                {
                    contract == ContractType.Annex &&
                    <FlexBox direction={FlexBoxDirection.Column} style={{gap:"1rem"}}>
                        <Form
                            onSubmit={annexForm.handleSubmit(onSubmitAnnex)} 
                            labelSpanM={4}
                            titleText="Нов Анекс"
                        >
                            <AnnexCreateForm
                                control={annexForm.control}
                                formState={annexForm.formState}
                            />

                            <FormItem>
                                <Button design={ButtonDesign.Emphasized} type={ButtonType.Submit}>Добави</Button>
                            </FormItem>
                        </Form>
                    </FlexBox>
                }
            </FlexBox>

            
            <Bar
                design={BarDesign.Footer}
                endContent={
                    <Fragment>
                        <Button design={ButtonDesign.Transparent} onClick={navBackClick}>Отказ</Button>
                    </Fragment>
                }
            />
        </Fragment>
    );
};

export default CreateEndColumn;
