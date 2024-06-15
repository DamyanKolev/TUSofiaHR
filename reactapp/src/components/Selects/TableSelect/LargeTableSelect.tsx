import {
    CustomListItem, FlexBox, FlexBoxDirection, IconDomRef, Input, InputDomRef, ListDomRef, ListGrowingMode, SelectDialog, StandardListItemDomRef, Ui5CustomEvent,
    ValueState
} from "@ui5/webcomponents-react"
import { Fragment, useEffect, useState } from "react"
import { JoinTableInfo } from "@models/JoinTableInfo/JoinTableInfo";
import PageResponse, { defaultPageResponse } from "@models/Page/PageResponse";
import { useAppDispatch, useAppSelector } from "@store/storeHooks";
import { formToggle } from "@store/slices/formToggleSlice";
import { createPortal } from "react-dom";
import { createFilter, defaultFilter, Filter } from "@/models/Filter";
import { createPageFilterInfo } from "@/models/Page/Page";
import { largeFormItem } from "@/utils/css";
import { Control, FieldPath, FieldValues, RegisterOptions, useController } from "react-hook-form";
import { postGetRequest } from "@/utils/requests";




interface Props<T extends FieldValues> {
    joinInfo: JoinTableInfo,
    value?: string,
    tableId?: string
    control: Control<T>
    name: FieldPath<T>;
    rules?: Omit<RegisterOptions<T, FieldPath<T>>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>
}

function LargeTableSelect<T extends FieldValues>({ joinInfo, value = "", tableId="id", control, name, rules }: Props<T>) {
    const { filterField, description, contentFields, headerText, tableURL } = joinInfo
    const { field, fieldState } = useController({control, name, rules});
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [pageReponse, setPageResponse] = useState<PageResponse>(defaultPageResponse)
    const [filterObject, setFilterObject] = useState<Filter>(defaultFilter)
    const [currentPage, setCurrentPage] = useState<int>(1)
    const [inputValue, setInputValue] = useState<string>(value)
    const isSuccess = useAppSelector((state) => state.isSuccessForm.value)
    const dispatchIsSuccess = useAppDispatch()


    const pageRequest = async (page: int, isNextPage: boolean) => {
        try {
            const pageDTO = createPageFilterInfo(page, 100, filterObject)
            const jsonData = JSON.stringify(pageDTO)
            const data = await postGetRequest(tableURL, jsonData, () => {})

            if (isNextPage) {
                const newData = {...pageReponse, records: [...pageReponse.records, ...data.records]}
                setPageResponse(newData)
            }
            else {
                setPageResponse(data)
                setCurrentPage(1)
            }
        }
        catch (error){
            console.error(error)
        }
    }

    
    const onClickHandler = () => {
        initData(1)
            .then((res) => {setPageResponse(res.data)})
            .catch(console.error);
        setIsOpen(true)
    }

    const onAfterCloseHandler = () => {
        setIsOpen(false)
        setFilterObject(defaultFilter)
        setPageResponse(defaultPageResponse)
        setCurrentPage(1)
    }

    const onConfirmHandler = (event: Ui5CustomEvent<ListDomRef, { selectedItems: StandardListItemDomRef[]; }>) => {
        const selectedItem = event.detail.selectedItems[0]
        const currentValue = selectedItem.children[0].children[1].textContent
        if (currentValue) {
            field.onChange(Number(selectedItem.id))
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
            pageRequest(currentPage, true)
        }
    }, [currentPage])

    useEffect(() => {
        if (isOpen) {
            pageRequest(1, false)
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
            <Input 
                value={inputValue} 
                onClick={onClickHandler} 
                style={largeFormItem}
                valueState={fieldState.error ? ValueState.Error : ValueState.None}
                valueStateMessage={<span>{fieldState.error?.message}</span>}
            />
            {createPortal(
                <SelectDialog
                    preventFocusRestore={true}
                    resizable
                    open={isOpen}
                    onAfterClose={onAfterCloseHandler}
                    headerText={headerText}
                    onSearchInput={onSearchInputHandler}
                    onSearch={onSearchHandler}
                    onLoadMore={onLoadMoreHandler}
                    onConfirm={onConfirmHandler }
                    growing={currentPage >= pageReponse.pages? ListGrowingMode.None: ListGrowingMode.Button}
                >
                    {
                        pageReponse.records.map((item, key) => (
                            <CustomListItem key={key} id={item[tableId]}>
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