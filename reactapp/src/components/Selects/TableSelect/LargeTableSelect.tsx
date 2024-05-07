import {
    CustomListItem, FlexBox, FlexBoxAlignItems, FlexBoxDirection, IconDomRef, Input, InputDomRef, ListDomRef, ListGrowingMode, SelectDialog, StandardListItemDomRef, Ui5CustomEvent
} from "@ui5/webcomponents-react"
import { FC, Fragment, useEffect, useState } from "react"
import { JoinTableInfo } from "@models/JoinTableInfo/JoinTableInfo";
import PageResponse, { defaultPageResponse } from "@models/Page/PageResponse";
import { useAppDispatch, useAppSelector } from "@store/storeHooks";
import { formToggle } from "@store/slices/formToggleSlice";
import { createPortal } from "react-dom";
import { createFilter, defaultFilter, Filter } from "@/models/Filter";
import { createPageFilterInfo } from "@/models/Page/Page";
import { largeFormItem } from "@/utils/css";




interface LargeTableSelectProps {
    joinInfo: JoinTableInfo,
    value?: string,
    tableId?: string
    name: string,
    formDataSetter: (selectedItem: StandardListItemDomRef, name: string) => void
}


const LargeTableSelect: FC<LargeTableSelectProps> = ({ joinInfo, value = "", tableId="id", name, formDataSetter }) => {
    const { filterField, description, contentFields, headerText, tableURL } = joinInfo
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [data, setData] = useState<PageResponse>(defaultPageResponse)
    const [filterObject, setFilterObject] = useState<Filter>(defaultFilter)
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
        setFilterObject(defaultFilter)
        setData(defaultPageResponse)
        setCurrentPage(1)
    }

    const onConfirmHandler = (event: Ui5CustomEvent<ListDomRef, { selectedItems: StandardListItemDomRef[]; }>) => {
        const selectedItem = event.detail.selectedItems[0]
        const currentValue = selectedItem.children[0].children[1].textContent
        if (currentValue) {
            formDataSetter(selectedItem, name)
            setInputValue(currentValue)
        }
    }

    //fired when typed any character in input
    const onSearchInputHandler = (event: Ui5CustomEvent<InputDomRef, { value: string; }>) => {
        const value = event.detail.value
        const newObject = createFilter(filterField, `${value}`)
        setFilterObject(newObject)
    }

    //fired when click icon of the input
    const onSearchHandler = (event: Ui5CustomEvent<IconDomRef, { value: string; }>) => {
        const value = event.detail.value
        const newObject = createFilter(filterField, `${value}`)
        setFilterObject(newObject)
    }

    const onLoadMoreHandler = () => {
        setCurrentPage(currentPage + 1)
    }

    const initData = (page: int) => {
        const token = sessionStorage.getItem("accessToken")
        const pageDTO = createPageFilterInfo(page, 100, filterObject)

        console.log(pageDTO)
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
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:".5rem"}}>
                <Input value={inputValue} onClick={onClickHandler} readonly style={largeFormItem}/>
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
                        data.records.map((item) => (
                            <CustomListItem key={`large.${item[tableId]}`} id={item[tableId]}>
                                <FlexBox direction={FlexBoxDirection.Column} style={{margin: ".8rem 0 .8rem 0", gap: "1rem"}}>
                                    <div>{item[description]}</div>
                                    <div style={{color: "var(--sapContent_LabelColor)", fontSize: "var(--sapFontSize)"}}>
                                        {contentFields.map((field) => {
                                            return `${item[field]} `
                                        })}
                                    </div>
                                </FlexBox>
                            </CustomListItem>
                        ))
                    }
                </SelectDialog>, document.body
            )}
        </Fragment>
    )
}


export default LargeTableSelect