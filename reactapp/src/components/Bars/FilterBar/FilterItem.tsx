import DataType from "@app-types/DataType";
import { DateRangePicker, Input, InputType } from "@ui5/webcomponents-react";
import { FC } from "react";

interface FilterItemProps {
    dataType: DataType;
    name: string;
}

const FilterItem: FC<FilterItemProps> = ({ dataType, name }) => {
    if (dataType === DataType.Date) {
        return (
            <DateRangePicker name={name} />
        );
    } else if (dataType === DataType.String) {
        return (
            <Input name={name} type={InputType.Text} />
        );
    }
};

export default FilterItem;