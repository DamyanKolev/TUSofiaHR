import { FC, createContext, useState } from "react";
import contractColumns from "@models/TableColumns/ContractColumns";
import { FCLLayout, FlexibleColumnLayout } from "@ui5/webcomponents-react";
import ContractStartColumn from "@components/FlexibleColumns/contract/ContractStartColumn";
import ContractMidColumn from "@components/FlexibleColumns/contract/ContractMidColumn";
import ContractEndColumn from "@components/FlexibleColumns/contract/ContractEndColumn";


export const ContractPageContext = createContext<any>(null);


const ContractPage: FC = () => {
    const tableTitle = "Contracts";
    const tableURL = "/api/contracts";
    const [layout, setLayout] = useState<FCLLayout>(FCLLayout.OneColumn);
    const [selectedRow, setSelectedRow] = useState<any>(null);


    const handleLayoutState = (layout: FCLLayout) => {
        setLayout(layout)
    }

    const onRowClick = (event: any) => {
        const row = event.detail.row.original
        setLayout(FCLLayout.MidColumnFullScreen)
        setSelectedRow(row);
    };

    return (
        <ContractPageContext.Provider value={selectedRow}>
            <FlexibleColumnLayout
                className="flexible-columns ui5-content-density-compact"
                style={{backgroundColor:"white"}}
                layout={layout}
                startColumn={
                    <div>
                        <ContractStartColumn
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