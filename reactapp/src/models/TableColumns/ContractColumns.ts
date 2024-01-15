import { AnalyticalTableColumnDefinition } from "@ui5/webcomponents-react";

const contractColumns: AnalyticalTableColumnDefinition[] = [
    {
        accessor: "working_wage",
        Header: "Заплата",
    },
    {
        accessor: "work_time",
        Header: "Часове на седмица",
    },
    {
        accessor: "annual_leave",
        Header: "Отпуска",
    },
    {
        accessor: "company_name",
        Header: "Фирма",
    },
    {
        accessor: "company_eic",
        Header: "Фирмено ID",
    },
    {
        accessor: "conclusion_date",
        Header: "Дата на сключване",
    },
    {
        accessor: "execution_date",
        Header: "Дата на изпълнение",
    },
    {
        accessor: "contract_term",
        Header: "Срок на договора",
    },
    {
        accessor: "additional_agreement_date",
        Header: "Дата на допълнително споразумение",
    },
    {
        accessor: "termination_date",
        Header: "Дата на терминиране",
    },
    {
        accessor: "change_date",
        Header: "Дата на промяна",
    },
    {
        accessor: "state_position_name",
        Header: "Позиция",
    },
    {
        accessor: "activity_name",
        Header: "Дейност",
    },
    {
        accessor: "contract_type",
        Header: "Тип договор",
    },
    {
        accessor: "code_corection",
        Header: "Код корекция",
    },
    {
        accessor: "document_type",
        Header: "Тип документ",
    },
    {
        accessor: "ekatte",
        Header: "ЕКАТТЕ код",
    },
    {
        accessor: "article62_flag",
        Header: "Изпратен"
    },
];

export default contractColumns