import DataType from "@app-types/DataType";
import { DateRangePicker, Input, InputType } from "@ui5/webcomponents-react";
import { Component, } from "react";

interface FilterItemProps {
  dataType: DataType;
  name: string;
}

class FilterItem extends Component<FilterItemProps> {
  render() {
    if (this.props.dataType === DataType.Date) {
      return (
        <DateRangePicker name={this.props.name} />
      );
    } 
    else if (this.props.dataType === DataType.String) {
      return (
        <Input name={this.props.name} type={InputType.Text} />
      );
    }
  }
}

export default FilterItem;