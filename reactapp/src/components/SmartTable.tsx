import { AnalyticalTable } from "@ui5/webcomponents-react";

interface TableProps {
    data: [],
    columns: [],
    tableTitle: string,
}


export default function SmartTable({ props }: TableProps) {
    const { data, tableTitle } = props;

    return (
        <AnalyticalTable
            columns={[
                {
                    Header: 'Name',
                    accessor: 'name',
                    headerTooltip: 'Full Name'
                },
                {
                    Header: 'Age',
                    accessor: 'age',
                    className: 'superCustomClass',
                    disableFilters: false,
                    disableGroupBy: true,
                    disableSortBy: false,
                    hAlign: 'End'
                },
                {
                    Header: 'Friend Name',
                    accessor: 'friend.name'
                },
                {
                    Filter: function Ta() { },
                    Header: function Ta() { },
                    accessor: 'friend.age',
                    filter: function Ta() { },
                    hAlign: 'End',
                    headerLabel: 'Friend Age'
                },
                {
                    Cell: function Ta() { },
                    Header: 'Actions',
                    accessor: '.',
                    disableFilters: true,
                    disableGroupBy: true,
                    disableResizing: true,
                    disableSortBy: true,
                    id: 'actions',
                    minWidth: 100,
                    width: 100
                }
            ]}
            data={data}
            filterable
            header={tableTitle}
            infiniteScroll
            //onColumnsReorder={function Ta() { }}
            //onGroup={function Ta() { }}
            //onLoadMore={function Ta() { }}
            //onRowClick={function Ta() { }}
            //onRowExpandChange={function Ta() { }}
            //onRowSelect={function Ta() { }}
            //onSort={function Ta() { }}
            //onTableScroll={function Ta() { }}
            //selectedRowIds={{
            //    '3': true
            //}}
            //selectionMode="SingleSelect"
            //tableHooks={[]}
            withRowHighlight
        />
    )
}