﻿import {
    Button, FlexBox, FlexBoxAlignItems, IconDomRef, Input, InputDomRef, ListDomRef, ListGrowingMode, SelectDialog, StandardListItem, StandardListItemDomRef, Ui5CustomEvent
} from "@ui5/webcomponents-react"
import { FC, Fragment, useEffect, useState } from "react"
import { Filter, createFilterObject, createPageInfo, initialFilterState } from "@models/Page/Page";
import { JoinTableInfo } from "@models/JoinTableInfo/JoinTableInfo";
import PageResponse, { defaultPageResponse } from "@models/Page/PageResponse";
import { useAppDispatch, useAppSelector } from "@store/storeHooks";
import { formTogle } from "@store/slices/formTogleSlice";
import { createPortal } from "react-dom";




interface LargeTableSelectProps {
    joinInfo: JoinTableInfo,
    value?: string,
    tableId?: string
    name: string,
    formDataSetter: (rowId: string, fieldName: string) => void
}


const LargeTableSelect: FC<LargeTableSelectProps> = ({ joinInfo, value = "", tableId="id", name, formDataSetter }) => {
    const { filterField, description, contentFields, headerText, tableURL } = joinInfo
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [data, setData] = useState<PageResponse>(defaultPageResponse)
    const [filterObject, setFilterObject] = useState<Filter>(initialFilterState)
    const [currentPage, setCurrentPage] = useState<int>(1)
    const [inputValue, setInputValue] = useState<string>(value)
    const isSuccess = useAppSelector((state) => state.isSuccessForm.value)
    const dispatchIsSuccess = useAppDispatch()

    
    const onClickHandler = () => {
        initData(1)
            .then((res) => {setData(res.data)})
            .catch(console.error);
        setIsOpen(true)
    }

    const onAfterCloseHandler = () => {
        setIsOpen(false)
        setFilterObject(initialFilterState)
        setData(defaultPageResponse)
        setCurrentPage(1)
    }

    const onConfirmHandler = (event: Ui5CustomEvent<ListDomRef, { selectedItems: StandardListItemDomRef[]; }>) => {
        const selectedItem = event.detail.selectedItems[0]
        const rowId = selectedItem.id
        const currentValue = selectedItem.textContent
        console.log(rowId)
        if (currentValue) {
            formDataSetter(rowId, name)
            setInputValue(currentValue)
        }
    }

    //fired when typed any character in input
    const onSearchInputHandler = (event: Ui5CustomEvent<InputDomRef, { value: string; }>) => {
        const value = event.detail.value
        const newObject = createFilterObject(filterField, "like", `${value}%`, false)
        setFilterObject(newObject)
    }

    //fired when click icon of the input
    const onSearchHandler = (event: Ui5CustomEvent<IconDomRef, { value: string; }>) => {
        const value = event.detail.value
        const newObject = createFilterObject(filterField, "like", `${value}%`, false)
        setFilterObject(newObject)
    }

    const onLoadMoreHandler = () => {
        setCurrentPage(currentPage + 1)
    }

    const initData = (page: int) => {
        const token = localStorage.getItem("token")
        const pageDTO = createPageInfo([filterObject], [], page, 100);

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
        if (isOpen) {
            initData(currentPage)
                .then((res) => setData({...data, records: [...data.records, ...res.data.records]}))
                .catch(console.error);
        }
    }, [currentPage])

    useEffect(() => {
        if (isOpen) {
            initData(1)
                .then((res) => {setData(res.data)})
                .catch(console.error);
        }
    }, [filterObject])

    
    useEffect(() => {
        if (isSuccess) {
            dispatchIsSuccess(formTogle())
            setInputValue("")
        }
    }, [isSuccess])


    return (
        <Fragment>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:".3rem"}}>
                <Input value={inputValue} readonly/>
                <Button onClick={onClickHandler}>Избор</Button>
            </FlexBox>
            {createPortal(
                <SelectDialog
                    resizable
                    open={isOpen}
                    onAfterClose={onAfterCloseHandler}
                    headerText={headerText}
                    onSearchInput={onSearchInputHandler}
                    onSearch={onSearchHandler}
                    onLoadMore={onLoadMoreHandler}
                    onConfirm={onConfirmHandler }
                    growing={currentPage >= data.pages? ListGrowingMode.None: ListGrowingMode.Button}
                >
                    {
                        data.records.map((item, key) => (
                            <StandardListItem
                                description={item[description]}
                                key={key}
                                id={item[tableId]}
                            >
                                {contentFields.map((field) => {
                                    return `${item[field]} `
                                })}
                            </StandardListItem>
                        ))
                    }
                </SelectDialog>, document.body
            )}
        </Fragment>
    )
}


export default LargeTableSelect