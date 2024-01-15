import {
    Button, IconDomRef, Input, InputDomRef, ListDomRef, ListGrowingMode, SelectDialog, StandardListItem, StandardListItemDomRef, Ui5CustomEvent
} from "@ui5/webcomponents-react"
import { FC, Fragment, useEffect, useState } from "react"
import { PageFilterInfo } from "@models/Page";
import { JoinTableInfo } from "../../models/JoinTableInfo/JoinTableInfo";


interface LargeTableSelectProps {
    isLargeTable?: boolean,
    joinInfo: JoinTableInfo,
    formDataSetter: (rowId: string, fieldName: string) => void
}


const LargeTableSelect: FC<LargeTableSelectProps> = ({ isLargeTable = true, joinInfo, formDataSetter }) => {
    const { filterField, contentField, headerText, tableURL } = joinInfo
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [data, setData] = useState<Array<any>>([])
    const [filterValue, setFilterValue] = useState<string>("")
    const [inputValue, setInputValue] = useState<string>("")
    const [pageDTO, setPageDTO] = useState<PageFilterInfo>(
        {
            pageNumber: 1,
            pageSize: 100,
            filterValue: filterValue,
        }
    )

    const onClickHandler = () => {
        setIsOpen(true)
    }

    const onAfterCloseHandler = () => {
        setIsOpen(false)
        setFilterValue("")
    }

    const onConfirmHandler = (event: Ui5CustomEvent<ListDomRef, { selectedItems: StandardListItemDomRef[]; }>) => {
        const selectedItem = event.detail.selectedItems[0]
        const rowId = selectedItem.id
        const currentValue = selectedItem.description
        if (currentValue) {
            formDataSetter(rowId, filterField)
            setInputValue(currentValue)
        }
    }

    //fired when typed any character in input
    const onSearchInputHandler = (event: Ui5CustomEvent<InputDomRef, { value: string; }>) => {
        const value = event.detail.value
        setFilterValue(value)
    }

    //fired when click icon of the input
    const onSearchHandler = (event: Ui5CustomEvent<IconDomRef, { value: string; }>) => {
        const value = event.detail.value
        setFilterValue(value)
    }

    const onLoadMoreHandler = () => {
        const currentPage = pageDTO.pageNumber
        const nextPage = currentPage + 1
        setPageDTO({ ...pageDTO, ["pageNumber"]: nextPage })
    }

    const initData = () => {
        const token = localStorage.getItem("token")

        return fetch(`${tableURL}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(pageDTO),
        }).then((response) => response.json())

    }

    useEffect(() => {
        if (isLargeTable) {
            console.log("IS LARGE TABLE")
            //initData()
            //    .then((res) => setData(res.data))
            //    .catch(console.error);
        }
        else {
            const filteredObjects = data.filter((item) => item[filterField] === filterValue);
            setData(filteredObjects);
        }

    }, [filterValue])


    if (isLargeTable) {
        useEffect(() => {
            //initData()
            //    .then((res) => setData([...data, ...res.data]))
            //    .catch(console.error);
            console.log("IS LARGE TABLE113232131232")
        }, [pageDTO])
    }

    return (
        <Fragment>
            <Button onClick={onClickHandler}>Избор</Button>
            <Input value={inputValue} />
            {isOpen &&
                <SelectDialog
                    open={isOpen}
                    onAfterClose={onAfterCloseHandler}
                    headerText={headerText}
                    onSearchInput={onSearchInputHandler}
                    onSearch={onSearchHandler}
                    onLoadMore={onLoadMoreHandler}
                    onConfirm={onConfirmHandler }
                    growing={ListGrowingMode.Button}
                >
                    {
                        data.map((item) => (
                            <StandardListItem
                                description={item[contentField] }
                                id={item[filterField]}
                            >
                                {item[filterField]}
                            </StandardListItem>
                        ))
                    }
                </SelectDialog>
            }
        </Fragment>
    )
}


export default LargeTableSelect