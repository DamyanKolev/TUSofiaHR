import { Button, ButtonDesign, FilterBar, FilterGroupItem, FlexBox, FlexBoxAlignItems, Input, Title, TitleLevel} from "@ui5/webcomponents-react"
import { FC } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import FilterItem from "./FilterItem"
import DataType from "@/types/DataType"
// import FilterMultiInput from "@components/FilterFields/FilterMultiInput"


const tableFilterStyles = {
    maxWidth: "calc(100vw - 9.063rem)",
    flex: "1"
}


interface TableFilterBarProps {
    fields: Array<any>,
    title: string
}

const TableFilterBar: FC<TableFilterBarProps> = ({fields, title}) => {
    const navigate = useNavigate();
    const location = useLocation();

    const getNavBackURL = (): string => {
        const url = location.pathname;
        const lastIndex = url.lastIndexOf("/");
        const newURL = url.slice(0, lastIndex)

        if (newURL) {
            return newURL;
        }
        return "/"
    }

    const onGo = (event: CustomEvent<{ elements: Record<string, HTMLElement>; filters: HTMLElement[]; search: HTMLElement; }>) => {
        console.log(event.detail.filters[0].childNodes)
        console.log(event.detail.elements[0].childNodes)
    }

    return (
        <FilterBar
            filterContainerWidth="13.125rem"
            header={
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Button
                        design={ButtonDesign.Transparent}
                        icon="nav-back"
                        onClick={() => navigate(getNavBackURL())}
                    />
                    <Title level={TitleLevel.H3}>{title}</Title>
                </FlexBox>
            }
            showGoOnFB={true}
            showResetButton={true}
            filterBarCollapsed={true}
            style={tableFilterStyles}
            onGo={onGo}
            >
        
        {
            fields.map((field: any, key: number) => {
                if (field.filterable) {
                    return (
                        <FilterGroupItem 
                            key={key}
                            label={field.display_name}
                        >
                            <Input name={field}></Input>
                        </FilterGroupItem>
                    )
                }
            })
        }

            <FilterGroupItem 
                label={"Test"}
            >
            <FilterItem name="test" dataType={DataType.String}></FilterItem>
            </FilterGroupItem>

        </FilterBar>
    )
}

export default TableFilterBar
