import { AnalyticalTableColumnDefinition, Icon, IconDesign } from "@ui5/webcomponents-react";
import "@ui5/webcomponents-icons/message-success"
import "@ui5/webcomponents-icons/message-error"

const article62Columns: AnalyticalTableColumnDefinition[] = [
    {
        accessor: "employeeName",
        Header: "Име на служителя",
    },
    {
        accessor: "identityText",
        Header: "ЕГН",
    },
    {
        accessor: "workingWage",
        Header: "Заплата",
    },
    {
        accessor: "companyEic",
        Header: "Фирмено ID",
    },
    {
        accessor: "conclusionDate",
        Header: "Дата на сключване",
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
        accessor: "nkpd",
        Header: "Код позиция",
    },
    {
        accessor: "nkid",
        Header: "Код ",
    },
    {
        accessor: "contractTypeCode",
        Header: "Код договор",
    },
    {
        accessor: "terminationCode",
        Header: "Код терминиране",
    },
    {
        accessor: "ekatte",
        Header: "ЕКАТТЕ код",
    },
    {
        accessor: "codeCorection",
        Header: "Код корекции",
    },
    {
        accessor: "article62Flag",
        Header: "Подаден в НАП",
        width: 125,
        Cell: ({ value }:any) => {
            if (value) {
                return <Icon name="message-error" design={IconDesign.Positive}/>
            }
            else {
                return <Icon name="message-error" design={IconDesign.Negative}/>
            }
        }
    },
];

export default article62Columns