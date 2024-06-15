import { AnalyticalTableColumnDefinition, FlexBox, FlexBoxJustifyContent, Icon, IconDesign } from "@ui5/webcomponents-react";

export const employeeColumns: AnalyticalTableColumnDefinition[] = [
    {
        accessor: "employeeName",
        Header: "Име на Служителя",
    },
    {
        accessor: "workЕmail",
        Header: "Служебен E-mail",
    },
    {
        accessor: "phoneNumber",
        Header: "Телефонен номер",
    },
    {
        accessor: "managerName",
        Header: "Име на Мениджър",
    },
    {
        accessor: "departmentName",
        Header: "Отдел",
    },
    {
        accessor: "positionName",
        Header: "Фирмена позиция",
    },
]


export const employeeEndMonthColumns: AnalyticalTableColumnDefinition[] = [
    {
        accessor: "endMonthStatus",
        Header: "Статус",
        width: 70,
        Cell: ({ value }:any) => {
            if (value) {
                return (
                    <FlexBox justifyContent={FlexBoxJustifyContent.Center} style={{width:"100%"}}>
                        <Icon name="accept" design={IconDesign.Positive}/>
                    </FlexBox>
                )
            }
            else {
                return (
                    <FlexBox justifyContent={FlexBoxJustifyContent.Center} style={{width:"100%"}}>
                        <Icon name="message-error" design={IconDesign.Negative}/>
                    </FlexBox>
                )
            }
        }
    },
    {
        accessor: "employeeName",
        Header: "Име на Служителя",
    },
    {
        accessor: "workЕmail",
        Header: "Служебен E-mail",
    },
    {
        accessor: "phoneNumber",
        Header: "Телефонен номер",
    },
    {
        accessor: "managerName",
        Header: "Име на Мениджър",
    },
    {
        accessor: "departmentName",
        Header: "Отдел",
    },
    {
        accessor: "positionName",
        Header: "Фирмена позиция",
    },
]