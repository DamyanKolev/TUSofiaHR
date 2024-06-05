import {
    CustomListItem, FlexBox, FlexBoxAlignItems, FlexBoxDirection, IconDomRef, Input, InputDomRef, ListDomRef, SelectDialog, StandardListItemDomRef, Ui5CustomEvent,
    ValueState
} from "@ui5/webcomponents-react"
import { Dispatch, Fragment, SetStateAction, useEffect, useState } from "react"
import { JoinTableInfo } from "@models/JoinTableInfo/JoinTableInfo";
import { useAppDispatch, useAppSelector } from "@store/storeHooks";
import { formToggle } from "@store/slices/formToggleSlice";
import { createPortal } from "react-dom";
import { largeFormItem } from "@/utils/css";
import { Control, FieldPath, FieldValues, RegisterOptions, useController } from "react-hook-form";
import { getRequest } from "@/utils/forms/submitForm";


interface Props<T extends FieldValues> {
    joinInfo: JoinTableInfo,
    value?: string,
    tableId?: string
    control: Control<T>
    name: FieldPath<T>;
    rules?: Omit<RegisterOptions<T, FieldPath<T>>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>
    setSelectedRow?: Dispatch<SetStateAction<any>>
}


function SmallTableSelect<T extends FieldValues>({ joinInfo, value = "", tableId="id", control, name, rules, setSelectedRow }: Props<T>) {
    const { filterField, description, contentFields, headerText, tableURL } = joinInfo
    const { field, fieldState } = useController({control, name, rules});
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [data, setData] = useState<Array<any>>([])
    const [filterValue, setFilterValue] = useState<string>("")
    const [inputValue, setInputValue] = useState<string>(value)
    const isSuccess = useAppSelector((state) => state.isSuccessForm.value)
    const dispatchIsSuccess = useAppDispatch()


    const pageRequest = async () => {
        try {
            const data = await getRequest<Array<any>>(tableURL)
            setData(data)
        }
        catch (error){
            console.log(error)
        }
    }

    const onClickHandler = () => {
        pageRequest()
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
            field.onChange(Number(selectedItem.id))
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
                <Input 
                    value={inputValue} 
                    onClick={onClickHandler} 
                    readonly 
                    style={largeFormItem}
                    valueState={fieldState.error ? ValueState.Error : ValueState.None}
                    valueStateMessage={<span>{fieldState.error?.message}</span>}
                />
            </FlexBox>
            {createPortal(
                <SelectDialog
                    preventFocusRestore={true}
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
                            <CustomListItem key={item["id"]} id={item[tableId]}>
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