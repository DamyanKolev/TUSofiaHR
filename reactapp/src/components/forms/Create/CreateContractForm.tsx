import { FC, useEffect, useState, useContext, Fragment } from "react";
import {
    DatePicker, DatePickerDomRef, FlexBox, FlexBoxAlignItems, FlexBoxDirection, Input,
    InputDomRef, Label, Ui5CustomEvent, ValueState
} from "@ui5/webcomponents-react";
import { ContractDTO } from "@models/HR/Contract";
import { ContractFormState, contractFormState } from "@models/FormStates/ContractFormState";
import { EndColumnContext } from "../../FlexibleColumn/EndColumn";
import { isFilledForm, parseValueByType } from "../Utils";
import DataType from "@app-types/DataType";
import { useAppDispatch } from "@store/storeHooks";
import { toggle } from "@store/slices/toggleSlice";
import { DatePickerChangeEventDetail } from "@ui5/webcomponents/dist/DatePicker.js";
import LargeTableSelect from "../LargeTableSelect";
import { contractJoinTablesInfo } from "../../../models/JoinTableInfo/ContractJoinTablesInfo";



const CreateContractForm: FC = () => {
    const defaultFormData = {} as ContractDTO
    const [formData, setFormData] = useState<ContractDTO>(defaultFormData);
    const [formState, setFormState] = useState<ContractFormState>(contractFormState);
    const isClicked = useContext(EndColumnContext)
    const dispatchIsSuccess = useAppDispatch()



    const formDataSetter = (rowId: string, name: string) => {
        const newFormData = parseValueByType<ContractDTO>(formData, name, rowId, DataType.Number);
        setFormData(newFormData);
    }

    const submitForm = async () => {
        const isFilled = isFilledForm<ContractDTO>(formData, setFormData)

        if (isFilled) {
            const response = await fetch("/api/contracts/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                dispatchIsSuccess(toggle())
            }
        }
    };

    //reset create form after nav back
    useEffect(() => {
        setFormData(defaultFormData);
    }, [isClicked]);


    const handleInputChange = (event: Ui5CustomEvent<InputDomRef, never>) => {
        const target = event.target
        const value = target.value;
        const valueType = target.type ? target.type : target.dataset.type
        const name = target.name ? target.name : target.dataset.name

        if (name && valueType && value) {
            const newFormData = parseValueByType<ContractDTO>(formData, name, value, valueType);
            if (value) {
                setFormState({ ...formState, [name]: { isFilled: true, valueState: ValueState.None } })
            }

            setFormData(newFormData);
        }
    };

    const handleDatePickerChange = (event: Ui5CustomEvent<DatePickerDomRef, DatePickerChangeEventDetail>) => {
        const target = event.target
        const { name, value } = target
        const valueType = target.dataset.type

        if (name && valueType && value) {
            const newFormData = parseValueByType<ContractDTO>(formData, name, value, valueType);
            if (value) {
                setFormState({ ...formState, [name]: { isFilled: true, valueState: ValueState.None } })
            }

            setFormData(newFormData);
        }
    }

    return (
        <Fragment>
            <FlexBox >
                <FlexBox alignItems={FlexBoxAlignItems.Start} direction={FlexBoxDirection.Column}>
                    <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column}>
                        <Label>Работна заплата</Label>
                        <Input
                            name="workingWage"
                            value={formData.workingWage ? formData.workingWage.toString() : ""}
                            onChange={handleInputChange}
                            valueState={formState.workingWage.valueState}
                            data-type={DataType.Float}
                        />
                    </FlexBox>

                    <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column}>
                        <Label>Седмични часове</Label>
                        <Input
                            name="workTime"
                            value={formData.workTime ? formData.workTime.toString() : ""}
                            onChange={handleInputChange}
                            valueState={formState.workTime.valueState}
                            data-type={DataType.Float}
                        />
                    </FlexBox>

                    <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column}>
                        <Label>Дата на сключване</Label>
                        <DatePicker
                            name="conclusionDate"
                            value={formData.conclusionDate ? formData.conclusionDate.toString() : ""}
                            onChange={handleDatePickerChange}
                            valueState={formState.conclusionDate.valueState}
                            data-type={DataType.Date}
                        />
                    </FlexBox>

                    <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column}>
                        <Label>Дата на започване</Label>
                        <DatePicker
                            name="executionDate"
                            value={formData.executionDate ? formData.executionDate.toString() : ""}
                            onChange={handleDatePickerChange}
                            valueState={formState.executionDate.valueState}
                            data-type={DataType.Date}
                        />
                    </FlexBox>

                    <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column}>
                        <Label>Дата на започване</Label>
                        <DatePicker
                            name="contractTerm"
                            value={formData.contractTerm ? formData.contractTerm.toString() : ""}
                            onChange={handleDatePickerChange}
                            valueState={formState.contractTerm.valueState}
                            data-type={DataType.Date}
                        />
                    </FlexBox>

                    <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column}>
                        <Label>Дата на Допълнително споразумение</Label>
                        <DatePicker
                            name="additionalAgreementDate"
                            value={formData.additionalAgreementDate ? formData.additionalAgreementDate.toString() : ""}
                            onChange={handleDatePickerChange}
                            valueState={formState.additionalAgreementDate.valueState}
                            data-type={DataType.Date}
                        />
                    </FlexBox>
                </FlexBox>

                <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column} >
                    <FlexBox direction={FlexBoxDirection.Column} alignItems={FlexBoxAlignItems.End}>
                        <Label>Тип Договор</Label>
                        <LargeTableSelect
                            isLargeTable={false }
                            joinInfo={contractJoinTablesInfo.contractTypeId }
                            formDataSetter={formDataSetter}
                        />
                    </FlexBox>
                    <FlexBox direction={FlexBoxDirection.Column} alignItems={FlexBoxAlignItems.End}>
                        <Label>Позиция</Label>
                        <LargeTableSelect
                            joinInfo={contractJoinTablesInfo.positionId}
                            formDataSetter={formDataSetter}
                        />
                    </FlexBox>
                    <FlexBox direction={FlexBoxDirection.Column} alignItems={FlexBoxAlignItems.End}>
                        <Label>Икономическа активност</Label>
                        <LargeTableSelect
                            joinInfo={contractJoinTablesInfo.iconomicActivityId}
                            formDataSetter={formDataSetter}
                        />
                    </FlexBox>
                    <FlexBox direction={FlexBoxDirection.Column} alignItems={FlexBoxAlignItems.End}>
                        <Label>Тип документ</Label>
                        <LargeTableSelect
                            isLargeTable={false}
                            joinInfo={contractJoinTablesInfo.documentTypeId}
                            formDataSetter={formDataSetter}
                        />
                    </FlexBox>
                    <FlexBox direction={FlexBoxDirection.Column} alignItems={FlexBoxAlignItems.End}>
                        <Label>Код Административна територия</Label>
                        <LargeTableSelect
                            joinInfo={contractJoinTablesInfo.administrativeTerritoryId}
                            formDataSetter={formDataSetter}
                        />
                    </FlexBox>
                </FlexBox>
            </FlexBox>
        </Fragment>
    );
};

export default CreateContractForm;