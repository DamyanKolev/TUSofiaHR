import { AnalyticalTable, AnalyticalTableColumnDefinition} from "@ui5/webcomponents-react";
import { FC, useEffect, useState } from "react";

//export function createAnalyticalTableColumnDefinition(
//    options: Partial<AnalyticalTableColumnDefinition>
//): AnalyticalTableColumnDefinition {
//    const columnDefinition: AnalyticalTableColumnDefinition = {};

//    // Ignore deprecated properties
//    const deprecatedProperties = [
//        "canReorder",
//    ];

//    for (const [key, value] of Object.entries(options)) {
//        if (deprecatedProperties.includes(key)) {
//            continue;
//        }

//        if (typeof value === "undefined" || value === null) {
//            continue;
//        }

//        columnDefinition[key] = value;
//    }

//    return columnDefinition;
//}


const data = [
    {
        WorkingWage: 1500.00,
        WorkTime: 32,
        ConclusionDate: new Date(2023, 11, 12),
    },
    {
        WorkingWage: 2000.00,
        WorkTime: 32,
        ConclusionDate: new Date(2023, 11, 12),
    }
]

export interface TableProps {
    dataURL: string,
    columns: AnalyticalTableColumnDefinition[],
    tableTitle: string,
}

export function createTableProps(dataURL: string, columns: AnalyticalTableColumnDefinition[], tableTitle: string): TableProps {
    return {
        dataURL,
        columns,
        tableTitle
    }
}

export const SmartTable: FC<{ tableProps: TableProps }> = ({ tableProps }) => {
    const { dataURL, columns, tableTitle } = tableProps
    //const [data, setData] = useState([]);

    //useEffect(() => {
    //    fetch(dataURL, {
    //        method: "POST",
    //        headers: {
    //            "Content-Type": "application/json",
    //        },
    //        body: JSON.stringify({
    //            data: {
    //            },
    //        }),
    //    })
    //        .then((response) => response.json())
    //        .then((data) => {
    //            setData(data);
    //        });
    //}, []);

    //useEffect(() => {
    //    fetch(dataURL)
    //        .then((response) => response.json())
    //        .then((data) => {
    //            setData(data);
    //        });
    //}, []);

    return (
        <AnalyticalTable
            className="table"
            columns={columns}
            data={data}
            filterable
            header={tableTitle}
            infiniteScroll
            withRowHighlight
        >
        </AnalyticalTable>
    )
}