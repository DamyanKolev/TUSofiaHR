import { AnalyticalTableColumnDefinition, FlexBox, FlexBoxJustifyContent, Icon, IconDesign} from "@ui5/webcomponents-react";
import "@ui5/webcomponents-icons/message-success"
import "@ui5/webcomponents-icons/message-error"


const contractColumns: AnalyticalTableColumnDefinition[] = [
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
        accessor: "ekatte",
        Header: "ЕКАТТЕ код",
    },
    {
        accessor: "nkpd",
        Header: "Код позиция",
    },
    {
        accessor: "nkid",
        Header: "Код икономическа активност",
    },
    {
        accessor: "isTerminate",
        Header: "Терминиран",
        width: 110,
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
        accessor: "article62Flag",
        Header: "Декларация 62",
        width: 125,
        // filter: (filterValue, rows) => {
        //     if (filterValue.length > 0) {
        //         return true
        //       }
        //       return rows;
        // },
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
    }
];

export default contractColumns