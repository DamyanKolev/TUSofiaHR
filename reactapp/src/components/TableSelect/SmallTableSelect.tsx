import {
    Button, FlexBox, FlexBoxAlignItems, IconDomRef, Input, InputDomRef, ListDomRef, SelectDialog, StandardListItem, StandardListItemDomRef, Ui5CustomEvent
} from "@ui5/webcomponents-react"
import { FC, Fragment, useEffect, useState } from "react"
import { JoinTableInfo } from "@models/JoinTableInfo/JoinTableInfo";
import { useAppDispatch, useAppSelector } from "@store/storeHooks";
import { formTogle } from "@store/slices/formTogleSlice";
import { createPortal } from "react-dom";


interface SmallTableSelectProps {
    joinInfo: JoinTableInfo,
    value?: string,
    name: string,
    formDataSetter: (selectedItem: StandardListItemDomRef, name: string) => void
}


const SmallTableSelect: FC<SmallTableSelectProps> = ({ joinInfo, value = "", name, formDataSetter }) => {
    const { filterField, description, contentFields, headerText, tableURL } = joinInfo
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [data, setData] = useState<Array<any>>([])
    const [filterValue, setFilterValue] = useState<string>("")
    const [inputValue, setInputValue] = useState<string>(value)
    const isSuccess = useAppSelector((state) => state.isSuccessForm.value)
    const dispatchIsSuccess = useAppDispatch()

    const onClickHandler = () => {
        initData()
            .then((res) => setData(res.data))
            .catch(console.error);
        setIsOpen(true)
    }

    const onAfterCloseHandler = () => {
        setIsOpen(false)
        setFilterValue("")
    }

    const onConfirmHandler = (event: Ui5CustomEvent<ListDomRef, { selectedItems: StandardListItemDomRef[]; }>) => {
        const selectedItem = event.detail.selectedItems[0]
        const currentValue = selectedItem.description
        if (currentValue) {
            formDataSetter(selectedItem, name)
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

    const initData = () => {
        const token = localStorage.getItem("token")

        return fetch(`${tableURL}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
        }).then((response) => response.json())
    }

    useEffect(() => {
        const filteredObjects = data.filter((item) => item[filterField] === filterValue);
        setData(filteredObjects);

    }, [filterValue])

    useEffect(() => {
        if (isSuccess) {
            dispatchIsSuccess(formTogle())
            setInputValue("")
        }
    }, [isSuccess])



    return (
        <Fragment>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:".5rem"}}>
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
                    onConfirm={onConfirmHandler }
                >
                    {
                        data.map((item) => (
                            <StandardListItem
                                description={item[description]}
                                key={item["id"]}
                                id={item["id"]}
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


export default SmallTableSelect