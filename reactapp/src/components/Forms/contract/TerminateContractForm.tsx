import DataType from "@app-types/DataType";
import SmallTableSelect from "@components/TableSelect/SmallTableSelect";
import { ContractUpdateDTO, defaultContractUpdate } from "@models/HR/Contract";
import { contractJoinTablesInfo } from "@models/JoinTableInfo/ContractJoinTablesInfo";
import { ContractView } from "@models/TableViews/ContractView";
import { ContractPageContext } from "@pages/hr/ContractPage";
import { Bar, BarDesign, Button, ButtonDesign, DatePicker, DatePickerDomRef, Dialog, FlexBox, FlexBoxAlignItems, FlexBoxDirection, Label, Ui5CustomEvent } from "@ui5/webcomponents-react";
import { DatePickerChangeEventDetail } from "@ui5/webcomponents/dist/DatePicker.js";
import { formatDate } from "@utils/formaters";
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
    const [formData, setFormData] = useState<ContractUpdateDTO>(defaultContractUpdate)

    const formDataSetterById = (rowId: string, name: string) => {
        const newFormData = parseValueByType<ContractUpdateDTO>(formData, name, rowId, DataType.Int);
        setFormData(newFormData);
    }

    const handleDateChange = (event: Ui5CustomEvent<DatePickerDomRef, DatePickerChangeEventDetail>) => {
        const target = event.target
        const value = target.value? target.value : "";
        const name = target.name
        const valueType = target.dataset.type

        if (name && valueType) {
            const newFormData = parseValueByType<ContractUpdateDTO>(formData, name, value, valueType);
            setFormData(newFormData)
        }
    }

    const cancelOnClick = () => {
        setFormData(defaultContractUpdate)
        setOpenSetter(false)
    }

    const submitForm = async () => {
        const response = await fetch(`${tableURL}/update`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(
                {
                    id: selectedRow.contract_id,
                    update_data: {
                        ...formData,
                        article62_flag: false,
                        change_date: formatDate(new Date())
                    }
                }),
        });
        if (!response.ok) {
            setFormData(defaultContractUpdate)
            setOpenSetter(false)
        }
    };

    useEffect(() => {
        if (selectedRow) {
            getRecordById<ContractUpdateDTO>(selectedRow.contract_id, tableURL, setFormData)
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
                            name="termination_type_id"
                            joinInfo={contractJoinTablesInfo.terminationTypeId}
                            formDataSetter={formDataSetterById}
                        />
                    </FlexBox>
                    <FlexBox alignItems={FlexBoxAlignItems.Center}>
                        <Label>Дата на терминиране</Label>
                        <DatePicker
                            name="termination_date"
                            value={formData.termination_date.toString()}
                            onChange={handleDateChange}
                            data-type={DataType.Date}
                        />
                    </FlexBox>
                </FlexBox>
            </Dialog>
    )
}


export default TerminateContract