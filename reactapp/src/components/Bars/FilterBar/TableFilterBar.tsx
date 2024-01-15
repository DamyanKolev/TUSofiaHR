import BionaField from "@models/BionaField"
import { FilterBar, FilterGroupItem} from "@ui5/webcomponents-react"
import { FC } from "react"
import FilterItem from "./FilterItem"
import DataType from "@app-types/DataType"


const tableFilterStyles = {
    maxWidth: "calc(100vw - 9.063rem)",
    flex: "1"
}


interface TableFilterBarProps {
    fields: Array<BionaField>
}

const TableFilterBar: FC<TableFilterBarProps> = ({fields}: TableFilterBarProps) => {

    return (
        <FilterBar
            filterContainerWidth="13.125rem"
            showGoOnFB={true}
            showResetButton={true}
            filterBarCollapsed={true}
            style={tableFilterStyles}
            >
        
        {
            fields.map((field: BionaField, key: number) => {
                if (field.filterable) {
                    return (
                        <FilterGroupItem 
                            key={key}
                            label={field.display_name}
                        >
                            <FilterItem 
                                dataType={DataType.String} 
                                name={field.name}
                            />
                        </FilterGroupItem>
                    )
                }
            })
        }

        </FilterBar>
    )
}

export default TableFilterBar
