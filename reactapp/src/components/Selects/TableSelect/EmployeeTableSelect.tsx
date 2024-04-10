import { createFilter, defaultFilter, Filter } from "@/models/Filter";
import { createPageFilterInfo } from "@/models/Page/Page";
import { employeeContractJoinTablesInfo } from "@models/JoinTableInfo/EmployeeContractJoinTableInfo";
import PageResponse, { defaultPageResponse } from "@models/Page/PageResponse";
import { formToggle } from "@store/slices/formToggleSlice";
import { useAppDispatch, useAppSelector } from "@store/storeHooks";
import { Button, FlexBox, FlexBoxAlignItems, IconDomRef, Input, InputDomRef, ListDomRef, ListGrowingMode, SelectDialog, StandardListItem, StandardListItemDomRef, Ui5CustomEvent } from "@ui5/webcomponents-react";
import { FC, Fragment, useEffect, useState } from "react";
import { createPortal } from "react-dom";


interface EmployeeTableSelectProps {
    formDataSetter: (employeeId: int) => void
}


const EmployeeTableSelect: FC<EmployeeTableSelectProps> = ({formDataSetter}) => {
    const { filterField, description, contentFields, headerText, tableURL } = employeeContractJoinTablesInfo
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [data, setData] = useState<PageResponse>(defaultPageResponse)
    const [filterObject, setFilterObject] = useState<Filter>(defaultFilter)
    const [currentPage, setCurrentPage] = useState<int>(1)
    const [inputValue, setInputValue] = useState<string>("")
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
        setFilterObject(defaultFilter)
        setData(defaultPageResponse)
        setCurrentPage(1)
    }

    const onConfirmHandler = (event: Ui5CustomEvent<ListDomRef, { selectedItems: StandardListItemDomRef[]; }>) => {
        const selectedItem = event.detail.selectedItems[0]
        const rowId = Number(selectedItem.id)
        const currentValue = selectedItem.textContent
        if (currentValue) {
            formDataSetter(rowId)
            setInputValue(currentValue)
        }
    }

    //fired when typed any character in input
    const onSearchInputHandler = (event: Ui5CustomEvent<InputDomRef, { value: string; }>) => {
        const value = event.detail.value
        const newObject = createFilter(filterField, `${value}%`)
        setFilterObject(newObject)
    }

    //fired when click icon of the input
    const onSearchHandler = (event: Ui5CustomEvent<IconDomRef, { value: string; }>) => {
        const value = event.detail.value
        const newObject = createFilter(filterField, `${value}%`)
        setFilterObject(newObject)
    }

    const onLoadMoreHandler = () => {
        setCurrentPage(currentPage + 1)
    }

    const initData = (page: int) => {
        const token = sessionStorage.getItem("accessToken")
        // const pageDTO = createPageInfo([filterObject], [], page, 100);
        const pageDTO = createPageFilterInfo(page, 100, filterObject)

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
            dispatchIsSuccess(formToggle())
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
                    open={isOpen}
                    onAfterClose={onAfterCloseHandler}
                    headerText={headerText}
                    onSearchInput={onSearchInputHandler}
                    onSearch={onSearchHandler}
                    onLoadMore={onLoadMoreHandler}
                    onConfirm={onConfirmHandler}
                    growing={currentPage >= data.pages? ListGrowingMode.None: ListGrowingMode.Button}
                >
                    {
                        data.records.map((item, key) => (
                            <StandardListItem
                                description={item[description]}
                                key={key}
                                id={item["employeeId"]}
                            >
                                {contentFields.map((field) => {
                                    return `${item[field]} `
                                })}
                            </StandardListItem>
                        ))
                    }
                </SelectDialog>,
                document.body
            )}
        </Fragment>
    )
}

export default EmployeeTableSelect