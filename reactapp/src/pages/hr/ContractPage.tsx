import { AnalyticalTableColumnDefinition } from "@ui5/webcomponents-react";
import FlexibleColumn from "@/components/FlexibleColumn/FlexibleColumn";
import { FC, useState } from "react";
import CreateContractForm from "@components/Forms/Create/CreateContractForm";
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
    const [isSuccess, setIsSuccess] = useState<boolean>(false);

    const isSuccessGetter = () => {
        return isSuccess
    }

    const isSuccessSetter = (value: boolean) => {
        setIsSuccess(value)
    }

    return (
        <FlexibleColumn
            tableTitle={tableTitle}
            dataURL={dataURL}
            columns={columns}
            isSuccessGetter={isSuccessGetter }
            isSuccessSetter={isSuccessSetter }
            createForm={<><CreateContractForm isSuccessSetter={isSuccessSetter } /></>}
            updateForm={<><UpdateContractForm isSuccessSetter={isSuccessSetter} /></>}
        />
    );
};

export default ContractPage;