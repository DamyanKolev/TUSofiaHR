import {
    CustomListItem, FlexBox, FlexBoxAlignItems, FlexBoxDirection, IconDomRef, Input, InputDomRef, ListDomRef, SelectDialog, StandardListItemDomRef, Ui5CustomEvent
} from "@ui5/webcomponents-react"
import { Dispatch, FC, Fragment, SetStateAction, useEffect, useState } from "react"
import { JoinTableInfo } from "@models/JoinTableInfo/JoinTableInfo";
import { useAppDispatch, useAppSelector } from "@store/storeHooks";
import { formToggle } from "@store/slices/formToggleSlice";
import { createPortal } from "react-dom";
import { largeFormItem } from "@/utils/css";


interface SmallTableSelectProps {
    joinInfo: JoinTableInfo,
    value?: string,
    name: string,
    formDataSetter: (selectedItem: StandardListItemDomRef, name: string) => void
    setSelectedRow?: Dispatch<SetStateAction<any>>
}


const SmallTableSelect: FC<SmallTableSelectProps> = ({ joinInfo, value = "", name, formDataSetter, setSelectedRow}) => {
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
        const currentValue = selectedItem.children[0].children[1].textContent
        if (currentValue) {
            formDataSetter(selectedItem, name)
            setInputValue(currentValue)

            if (setSelectedRow != undefined) {
                const row: any = data.find((element) => element.id === Number(selectedItem.id));
                setSelectedRow(row)
            }
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
        const token = sessionStorage.getItem("accessToken")

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
                    onConfirm={onConfirmHandler }
                >
                    {
                        data.map((item) => (
                            <CustomListItem key={item["id"]} id={item["id"]}>
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


export default SmallTableSelect