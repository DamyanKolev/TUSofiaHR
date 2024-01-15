import { AnalyticalTableColumnDefinition } from "@ui5/webcomponents-react";
import FlexibleColumn from "@/components/FlexibleColumn/FlexibleColumn";
import { FC } from "react";
import CreateContractForm from "@components/Forms/Create/CreateContractForm1";
import UpdateContractForm from "@components/Forms/Update/UpdateContractForm";


const columns: AnalyticalTableColumnDefinition[] = [
    {
        accessor: "workingWage",
        Header: "Заплата",
    },
    {
        accessor: "workTime",
        Header: "Часове на седмица",
    },
    {
        accessor: "conclusionDate",
        Header: "Дата на сключване",
    },
];


const ContractPage: FC = () => {
    const tableTitle = "Contracts";
    const dataURL = "/api/contracts";

    return (
        <FlexibleColumn
            tableTitle={tableTitle}
            dataURL={dataURL}
            columns={columns}
            createForm={<><CreateContractForm/></>}
            updateForm={<><UpdateContractForm/></>}
        />
    );
};

export default ContractPage;