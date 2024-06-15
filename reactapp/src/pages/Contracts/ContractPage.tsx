import { FC, createContext, useState } from "react";
import { FCLLayout, FlexibleColumnLayout } from "@ui5/webcomponents-react";
import { TableRowState } from "@app-types/TableRowState";
import StartColumn from "./components/FlexibleColumns/StartColumn";
import { EmployeeView } from "../Employees/models/EmployeeView";
import { EndColumnEnum } from "../Employees/models/EndColumnEnum";
import ContractMidColumn from "./components/FlexibleColumns/ContractMidColumn";
import ContractCreateEndColumn from "./components/FlexibleColumns/ContractCreateEndColumn";
import ContractUpdateEndColumn from "./components/FlexibleColumns/ContractUpdateEndColumn";
import { employeeColumns } from "../Employees/models/EmployeeColumns";


export const ContractPageContext = createContext<TableRowState<EmployeeView> | undefined>(undefined);


const ContractPage: FC = () => {
    const tableTitle = "Договори";
    const tableURL = "/api/hr/employees";
    const [layout, setLayout] = useState<FCLLayout>(FCLLayout.OneColumn);
    const [selectedRow, setSelectedRow] = useState<EmployeeView>({} as EmployeeView);
    const [endColumnOption, setEndColumnOption] = useState<EndColumnEnum>(EndColumnEnum.None)


    const onRowClick = (event: any) => {
        const row = event.detail.row.original
        setLayout(FCLLayout.TwoColumnsMidExpanded)
        setSelectedRow(row);
    };

    return (
        <ContractPageContext.Provider value={{selectedRow, setSelectedRow}}>
            <FlexibleColumnLayout
                className="flexible-columns ui5-content-density-compact"
                style={{backgroundColor:"var(--sapBackgroundColor)"}}
                layout={layout}
                startColumn={
                    <div>
                        <StartColumn
                            tableURL={tableURL}
                            columns={employeeColumns}
                            tableTitle={tableTitle}
                            onRowClick={onRowClick}
                        />  
                    </div>
                }
                midColumn={
                    <div>
                        <ContractMidColumn
                            setLayout={setLayout} 
                            layout={layout} 
                            setEndColumnOption={setEndColumnOption}
                            tableURL={tableURL}
                        />
                    </div>
                }
                endColumn={
                    <div style={{height:"100%"}}>
                        {
                            endColumnOption === EndColumnEnum.InsertContract &&
                            <ContractCreateEndColumn 
                                setLayout={setLayout}
                                layout={layout}
                                selectedRow={selectedRow} 
                                setEndColumnOption={setEndColumnOption}
                            />
                        }

                        {
                            endColumnOption === EndColumnEnum.UpdateContract &&
                            <ContractUpdateEndColumn 
                                setLayout={setLayout}
                                layout={layout}
                                setEndColumnOption={setEndColumnOption}
                            />
                        }
                    </div>
                }
            />
        </ContractPageContext.Provider>
    );
};

export default ContractPage;