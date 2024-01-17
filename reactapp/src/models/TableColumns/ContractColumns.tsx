import { AnalyticalTableColumnDefinition, Icon, IconDesign } from "@ui5/webcomponents-react";
import "@ui5/webcomponents-icons/message-success"
import "@ui5/webcomponents-icons/message-error"

const contractColumns: AnalyticalTableColumnDefinition[] = [
    {
        accessor: "employeeName",
        Header: "Име на служителя",
    },
    {
        accessor: "conclusionDate",
        Header: "Дата на сключване",
    },
    {
        accessor: "executionDate",
        Header: "Дата на изпълнение",
    },
    {
        accessor: "contractTerm",
        Header: "Срок на договора",
    },
    {
        accessor: "additionalAgreementDate",
        Header: "Дата на допълнително споразумение",
    },
    {
        accessor: "terminationDate",
        Header: "Дата на терминиране",
    },
    {
        accessor: "positionName",
        Header: "Позиция",
    },
    {
        accessor: "activityName",
        Header: "Дейност",
    },
    {
        accessor: "contractType",
        Header: "Тип договор",
    },
    {
        accessor: "documentType",
        Header: "Тип документ",
    },
    {
        accessor: "ekatte",
        Header: "ЕКАТТЕ код",
    },
    {
        accessor: "isTerminate",
        Header: "Терминиран",
        width: 110,
        Cell: ({ value }:any) => {
            if (value) {
                return <Icon name="message-error" design={IconDesign.Positive}/>
            }
            else {
                return <Icon name="message-error" design={IconDesign.Negative}/>
            }
        }
    },
    {
        accessor: "article62_flag",
        Header: "Декларация 62",
        width: 125,
        Cell: ({ value }:any) => {
            if (value) {
                return <Icon name="message-error" design={IconDesign.Positive}/>
            }
            else {
                return <Icon name="message-error" design={IconDesign.Negative}/>
            }
        }
    }
];

export default contractColumns