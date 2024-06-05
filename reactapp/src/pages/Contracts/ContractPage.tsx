import { FC, createContext, useState } from "react";
import contractColumns from "@/pages/Contracts/models/ContractColumns";
import { FCLLayout, FlexibleColumnLayout } from "@ui5/webcomponents-react";
import { ContractView } from "@/pages/Contracts/models/ContractView";
import StartColumn from "@components/FlexibleColumns/StartColumn";
import { TableRowState } from "@app-types/TableRowState";
import ContractMidColumn from "./components/FlexibleColumns/ContractMidColumn";
import ContractEndColumn from "./components/FlexibleColumns/ContractEndColumn";


export const ContractPageContext = createContext<TableRowState<ContractView> | undefined>(undefined);


const ContractPage: FC = () => {
    const tableTitle = "Договори";
    const tableURL = "/api/hr/contracts";
    const [layout, setLayout] = useState<FCLLayout>(FCLLayout.OneColumn);
    const [selectedRow, setSelectedRow] = useState<ContractView>({} as ContractView);


    const handleLayoutState = (layout: FCLLayout) => {
        setLayout(layout)
    }

    const onRowClick = (event: any) => {
        const row = event.detail.row.original
        setLayout(FCLLayout.MidColumnFullScreen)
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
                            columns={contractColumns}
                            tableTitle={tableTitle}
                            handleLayoutState={handleLayoutState}
                            onRowClick={onRowClick}
                        />  
                    </div>
                }
                midColumn={
                    <div><ContractMidColumn tableURL={tableURL} handleLayoutState={handleLayoutState}/></div>
                }
                endColumn={
                    <div><ContractEndColumn tableURL={tableURL} handleLayoutState={handleLayoutState}/></div>
                }
            />
        </ContractPageContext.Provider>
    );
};

export default ContractPage;