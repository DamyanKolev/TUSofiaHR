import { toggle } from "@/store/slices/toggleSlice";
import { useAppDispatch } from "@/store/storeHooks";
import { setDateToInputDefaultValue } from "@/utils/forms/setInputDefaultValue";
import { submitPutForm } from "@/utils/forms/submitForm";
import DataType from "@app-types/DataType";
import SmallTableSelect from "@components/TableSelect/SmallTableSelect";
import { Contract, defaultContract } from "@models/HR/Contract";
import { contractJoinTablesInfo } from "@models/JoinTableInfo/ContractJoinTablesInfo";
import { ContractView } from "@models/TableViews/ContractView";
import { ContractPageContext } from "@pages/hr/ContractPage";
import { Bar, BarDesign, Button, ButtonDesign, DatePicker, DatePickerDomRef, Dialog, FlexBox, FlexBoxAlignItems, FlexBoxDirection, Label, StandardListItemDomRef, Ui5CustomEvent } from "@ui5/webcomponents-react";
import { DatePickerChangeEventDetail } from "@ui5/webcomponents/dist/DatePicker.js";
import { getRecordById } from "@utils/forms/getRecordById";
import { parseValueByType } from "@utils/parsers";
import { FC, Fragment, useContext, useEffect, useState } from "react";

interface TerminateContractProps {
    getIsOpen: () => boolean
    tableURL: string
    setDisabledSetter: (disabled: boolean) => void
    setOpenSetter: (open: boolean) => void
}

const TerminateContract: FC<TerminateContractProps> = ({getIsOpen, tableURL, setDisabledSetter, setOpenSetter}) => {
    const selectedRow = useContext<ContractView>(ContractPageContext)
    const [formData, setFormData] = useState<Contract>(defaultContract)
    const dispatchIsSuccess = useAppDispatch()

    const setFormDataById= (selectedItem: StandardListItemDomRef, name: string) => {
        const rowId = selectedItem.id
        const newFormData = parseValueByType<Contract>(formData, name, rowId, DataType.Int);
        setFormData(newFormData);
    }

    const handleDateChange = (event: Ui5CustomEvent<DatePickerDomRef, DatePickerChangeEventDetail>) => {
        const target = event.target
        const value = target.value? target.value : "";
        const name = target.name
        const valueType = target.dataset.type

        if (name && valueType) {
            const newFormData = parseValueByType<Contract>(formData, name, value, valueType);
            setFormData(newFormData)
        }
    }

    const cancelOnClick = () => {
        setFormData(defaultContract)
        setOpenSetter(false)
    }

    const successCalback = () => {
        setFormData(defaultContract)
        setOpenSetter(false)
        dispatchIsSuccess(toggle())
    }

    const submitForm = async () => {
        submitPutForm(tableURL, JSON.stringify(formData), successCalback)
    };

    useEffect(() => {
        if (selectedRow) {
            getRecordById<Contract>(selectedRow.contractId, tableURL, setFormData)
            setDisabledSetter(false)
        }
    }, [selectedRow]);


    return (
        <Dialog 
                open={getIsOpen()}
                headerText="Терминиране на договор"
                footer={
                    <Bar
                        design={BarDesign.Footer}
                        endContent={
                            <Fragment>
                                <Button design={ButtonDesign.Transparent} onClick={cancelOnClick}>Cancel</Button>
                                <Button design={ButtonDesign.Emphasized} onClick={submitForm}>Ok</Button>
                            </Fragment>
                        }
                    />
                }
            >
                <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column} style={{width: "25rem", height: "6rem"}}>
                    <FlexBox alignItems={FlexBoxAlignItems.Center}>
                        <Label required>Тип Терминиране</Label>
                        <SmallTableSelect
                            name="terminationTypeId"
                            joinInfo={contractJoinTablesInfo.terminationTypeId}
                            formDataSetter={setFormDataById}
                        />
                    </FlexBox>
                    <FlexBox alignItems={FlexBoxAlignItems.Center}>
                        <Label>Дата на терминиране</Label>
                        <DatePicker
                            name="terminationDate"
                            value={setDateToInputDefaultValue(formData.terminationDate)}
                            onChange={handleDateChange}
                            data-type={DataType.Date}
                        />
                    </FlexBox>
                </FlexBox>
            </Dialog>
    )
}


export default TerminateContract