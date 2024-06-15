import { AnalyticalTable, AnalyticalTableColumnDefinition, AnalyticalTableScaleWidthMode, AnalyticalTableSelectionBehavior, AnalyticalTableSelectionMode, Bar, Button } from "@ui5/webcomponents-react";
import { CSSProperties, FC, useContext, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@store/storeHooks";
import { TableRowState } from "@app-types/TableRowState";
import { EmployeeView } from "@pages/Employees/models/EmployeeView";
import { ContractPageContext } from "../ContractPage";
import { ContractView } from "../models/Views/ContractView";
import { formToggle } from "@/store/slices/formToggleSlice";





interface Props {
    employeeId: int,
    columns: AnalyticalTableColumnDefinition[],
    style?: CSSProperties,
    onRowClick: (event: any) => void,
    onCreateClick: () => void
}


const ContractSmartTable: FC<Props> = ({ employeeId, columns, style, onRowClick, onCreateClick }) => {
    const rowState = useContext<TableRowState<EmployeeView> | undefined>(ContractPageContext)
    const [data, setData] = useState<Array<ContractView>>([]);
    const isFormSuccess = useAppSelector((state) => state.isSuccessForm.value)
    const dispatchIsSuccess = useAppDispatch()

    
    const initTable = async () => {
        const response = await fetch(`/api/hr/contracts/all-by-employee-id`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
            },
            body: JSON.stringify(employeeId),
        })
        const json = await response.json()

        if (response.ok) {
            let result = json.data
            setData(result)
            if (isFormSuccess) {
                dispatchIsSuccess(formToggle())
            }
        }
        else {
            console.error(json.message)
        }
    }

    //chage the data after success update or insert into database
    useEffect(() => {
        const isClickedRow = rowState && Object.keys(rowState.selectedRow).length > 0
        if (isClickedRow) {
            initTable()
        }
        }, [rowState, isFormSuccess])


    return (
        <AnalyticalTable
            style={style}
            columns={columns}
            data={data}
            scaleWidthMode={AnalyticalTableScaleWidthMode.Grow}
            filterable
            selectionMode={AnalyticalTableSelectionMode.SingleSelect}
            selectionBehavior={AnalyticalTableSelectionBehavior.RowOnly}
            loading={isFormSuccess}
            infiniteScroll
            onRowClick={onRowClick}
            isTreeTable={true}
            subRowsKey="annexes"
            header={
                <Bar
                    endContent={
                        <Button onClick={onCreateClick}>Добави</Button>
                    }
                />
            }
        />
    )
}

export default ContractSmartTable