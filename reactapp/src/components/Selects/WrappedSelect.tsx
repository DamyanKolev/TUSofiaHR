import { formToggle } from "@/store/slices/formToggleSlice";
import { getRequest } from "@/utils/requests";
import { useAppDispatch, useAppSelector } from "@store/storeHooks";
import { Select, Option, SelectDomRef, Ui5CustomEvent, ValueState } from "@ui5/webcomponents-react";
import { SelectChangeEventDetail } from "@ui5/webcomponents/dist/Select.js";
import {CSSProperties, useEffect, useLayoutEffect, useState } from "react";
import { Control, FieldPath, FieldValues, RegisterOptions, useController } from "react-hook-form";


interface Props<T extends FieldValues> {
    style?: CSSProperties 
    tableURL: string,
    contentField: string,
    control: Control<T>
    name: FieldPath<T>;
    value?: string
    rules?: Omit<RegisterOptions<T, FieldPath<T>>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>
}


function WrappedSelect<T extends FieldValues>({ style, tableURL, contentField, control, name, value = "", rules }: Props<T>) {
    const { field, formState } = useController({control, name, rules});
    const [records, setRecords] = useState<Array<any>>([])
    const [selectKey, setSelectKey] = useState<number>(1)
    const [isSelected, setIsSelected] = useState<boolean>(false)
    const isSuccess = useAppSelector((state) => state.isSuccessForm.value)
    const dispatchIsSuccess = useAppDispatch()
    const errorMessage = formState.errors?.[field.name]?.message;

    const initData = async () => {
        try {
            const data = await getRequest<any>(tableURL)
            setRecords(data)
        }
        catch (error) {
            console.error(error)
        }
    }

    const handleOnChange = (event: Ui5CustomEvent<SelectDomRef, SelectChangeEventDetail>) => {
        const id = event.detail.selectedOption.id
        field.onChange(Number(id))
        setIsSelected(true)
    }

    useLayoutEffect(() => {
        initData()
    }, [])

    useEffect(() => {
        if (isSuccess) {
            dispatchIsSuccess(formToggle())
            setIsSelected(false)
            setSelectKey(selectKey + 1)
        }
    }, [isSuccess])

    return (
        <Select
            style={style}
            key={`${name}_${selectKey}`}
            onChange={handleOnChange}
            valueState={errorMessage ? ValueState.Error : ValueState.None}
            valueStateMessage={<span>{errorMessage? "" : errorMessage}</span>}
        >
            {
                !isSelected && value == "" &&
                <Option></Option>
            }
            {
                records.map((record, key) => {
                    let selected = false
                    if (value === record[contentField]) {
                        selected = true
                    }
                    
                    return (
                        <Option selected={selected} key={`${contentField}-${key}`} id={`${record.id}`}>
                            {record[contentField]}
                        </Option>
                    )
                } )
            }
        </Select>
    )
}


export default WrappedSelect