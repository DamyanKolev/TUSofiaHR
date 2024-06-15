import { Option, Label, Select, ValueState, FormItem } from "@ui5/webcomponents-react"
import { CSSProperties, FC, useEffect, useState } from "react"
import { SysInsuranceType } from "@/pages/Employees/models/System/SysInsuranceType"
import SmallTableSelect from "@components/Selects/TableSelect/SmallTableSelect"
import { EmployeeDataInsert } from "@/pages/Employees/models/EmployeeData"
import { Control, FieldPath, FormState, UseFormGetValues, UseFormSetValue } from "react-hook-form"
import { insuranceJoinTableInfo } from "@/pages/Employees/models/JoinTableInfo/InsuranceJoinTableInfo"


const selectStyle: CSSProperties = {
    width: "6rem"
}

interface InsuranceFormProps {
    control: Control<EmployeeDataInsert>
    formState: FormState<EmployeeDataInsert>
    setValue: UseFormSetValue<EmployeeDataInsert>
    getValues: UseFormGetValues<EmployeeDataInsert>
}

const CreateInsuranceForm: FC<InsuranceFormProps> = ({control, formState, setValue, getValues }) => {
    const [isInuranceCode, setIsInsuranceCode] = useState<boolean>(false)
    const [selectedRow, setSelectedRow] = useState<SysInsuranceType>({} as SysInsuranceType)
    const { errors } = formState

    const setDefaultValues = () => {
        for (const [key, value] of Object.entries(selectedRow)) {
            if (Array.isArray(value)) {
                if (value.length == 1) {
                    const name = `insurance.${key}` as FieldPath<EmployeeDataInsert>
                    setValue(name, `${value}`)
                }
            }
        }
    }

    useEffect(() => { 
        setDefaultValues()
        const value = getValues("insurance.insuranceTypeId")
        if (!isInuranceCode && value > 0) {
            setIsInsuranceCode(true)
        }
    },[selectedRow])

    return (
        <>
            <FormItem label={<Label required>Вид осигурен</Label>}>
                <SmallTableSelect
                    name="insurance.insuranceTypeId"
                    control={control}
                    joinInfo={insuranceJoinTableInfo}
                    setSelectedRow={setSelectedRow}
                />
            </FormItem>
            {
            isInuranceCode &&

            <>
                {
                    selectedRow.dooWithouthTzpbInsurer.length > 1 &&
                    <FormItem label={<Label required>ДОО без ТЗПБ осигуровки за сметка на осигурителя</Label>}>
                        <Select
                            style={selectStyle}
                            {...control.register("insurance.dooWithouthTzpbInsurer", { required: true })}
                            valueState={errors.insurance?.dooWithouthTzpbInsurer ? ValueState.Error : ValueState.None}
                            valueStateMessage={<span>{errors.insurance?.dooWithouthTzpbInsurer?.message}</span>}
                        >
                            {
                                selectedRow.dooWithouthTzpbInsurer.map((item, key)=> {
                                    return <Option key={key}>{item}</Option>
                                })
                            }
                        </Select>
                    </FormItem>
                }
                {
                    selectedRow.dooWithouthTzpbEmployee.length > 1 &&
                    <FormItem label={<Label required>ДОО без ТЗПБ осигуровки за сметка на осигуреното лице</Label>}>
                        <Select
                            style={selectStyle}
                            {...control.register("insurance.dooWithouthTzpbEmployee", { required: true })}
                            valueState={errors.insurance?.dooWithouthTzpbEmployee ? ValueState.Error : ValueState.None}
                            valueStateMessage={<span>{errors.insurance?.dooWithouthTzpbEmployee?.message}</span>}
                        >
                            {
                                selectedRow.dooWithouthTzpbEmployee.map((item, key)=> {
                                    return <Option key={key}>{item}</Option>
                                })
                            }
                        </Select>
                    </FormItem>
                }
                {
                    selectedRow.healthInsurance.length > 1 &&
                    <FormItem label={<Label required>Здравни осигуровки</Label>}>
                        <Select
                            style={selectStyle}
                            {...control.register("insurance.healthInsurance", { required: true })}
                            valueState={errors.insurance?.healthInsurance ? ValueState.Error : ValueState.None}
                            valueStateMessage={<span>{errors.insurance?.healthInsurance?.message}</span>}
                        >
                            {
                                selectedRow.healthInsurance.map((item, key)=> {
                                    return <Option key={key}>{item}</Option>
                                })
                            }
                        </Select>
                    </FormItem>
                }
                {
                    selectedRow.healthInsuranceArticle40.length > 1 &&
                    <FormItem label={<Label required>Здравни осигуровки само по чл. 40</Label>}>
                        <Select
                            style={selectStyle}
                            {...control.register("insurance.healthInsuranceArticle40", { required: true })}
                            valueState={errors.insurance?.healthInsuranceArticle40 ? ValueState.Error : ValueState.None}
                            valueStateMessage={<span>{errors.insurance?.healthInsuranceArticle40?.message}</span>}
                        >
                            {
                                selectedRow.healthInsuranceArticle40.map((item, key)=> {
                                    return <Option key={key}>{item}</Option>
                                })
                            }
                        </Select>
                    </FormItem>
                }
                {
                    selectedRow.healthInsuranceInsurer.length > 1 &&
                    <FormItem label={<Label required>Всички здрани осигуровки за сметка на осигурителя</Label>}>
                        <Select
                            style={selectStyle}
                            {...control.register("insurance.healthInsuranceInsurer", { required: true })}
                            valueState={errors.insurance?.healthInsuranceInsurer ? ValueState.Error : ValueState.None}
                            valueStateMessage={<span>{errors.insurance?.healthInsuranceInsurer?.message}</span>}
                        >
                            {
                                selectedRow.healthInsuranceInsurer.map((item, key)=> {
                                    return <Option key={key}>{item}</Option>
                                })
                            }
                        </Select>
                    </FormItem>
                }
                {
                    selectedRow.healthInsuranceEmployee.length > 1 &&
                    <FormItem label={<Label required>Всички здрани осигуровки за сметка на осигуреното лице</Label>}>
                        <Select
                            style={selectStyle}
                            {...control.register("insurance.healthInsuranceEmployee", { required: true })}
                            valueState={errors.insurance?.healthInsuranceEmployee ? ValueState.Error : ValueState.None}
                            valueStateMessage={<span>{errors.insurance?.healthInsuranceEmployee?.message}</span>}
                        >
                            {
                                selectedRow.healthInsuranceEmployee.map((item, key)=> {
                                    return <Option key={key}>{item}</Option>
                                })
                            }
                        </Select>
                    </FormItem>
                }
                {
                    selectedRow.teacherPensionFund.length > 1 &&
                    <FormItem label={<Label required>Учителски пенсионен фонд</Label>}>
                        <Select
                            style={selectStyle}
                            {...control.register("insurance.teacherPensionFund", { required: true })}
                            valueState={errors.insurance?.teacherPensionFund ? ValueState.Error : ValueState.None}
                            valueStateMessage={<span>{errors.insurance?.teacherPensionFund?.message}</span>}
                        >
                            {
                                selectedRow.teacherPensionFund.map((item, key)=> {
                                    return <Option key={key}>{item}</Option>
                                })
                            }
                        </Select>
                    </FormItem>
                }
                {
                    selectedRow.professionalPensionFund.length > 1 &&
                    <FormItem label={<Label required>Професионален пенсионен фонд</Label>}>
                        <Select
                            style={selectStyle}
                            {...control.register("insurance.professionalPensionFund", { required: true })}
                            valueState={errors.insurance?.professionalPensionFund ? ValueState.Error : ValueState.None}
                            valueStateMessage={<span>{errors.insurance?.professionalPensionFund?.message}</span>}
                        >
                            {
                                selectedRow.professionalPensionFund.map((item, key)=> {
                                    return <Option key={key}>{item}</Option>
                                })
                            }
                        </Select>
                    </FormItem>
                }
                {
                    selectedRow.universalPensionInsurer.length > 1 &&
                    <FormItem label={<Label required>Универсален пенсионен фонд за сметка на осигурителя</Label>}>
                        <Select
                            style={selectStyle}
                            {...control.register("insurance.universalPensionInsurer", { required: true })}
                            valueState={errors.insurance?.universalPensionInsurer ? ValueState.Error : ValueState.None}
                            valueStateMessage={<span>{errors.insurance?.universalPensionInsurer?.message}</span>}
                        >
                            {
                                selectedRow.universalPensionInsurer.map((item, key)=> {
                                    return <Option key={key}>{item}</Option>
                                })
                            }
                        </Select>
                    </FormItem>
                }
                {
                    selectedRow.universalPensionEmployee.length > 1 &&
                    <FormItem label={<Label required>Универсален пенсионен фонд за сметка на осигуреното лице</Label>}>
                        <Select
                            style={selectStyle}
                            {...control.register("insurance.universalPensionEmployee", { required: true })}
                            valueState={errors.insurance?.universalPensionEmployee ? ValueState.Error : ValueState.None}
                            valueStateMessage={<span>{errors.insurance?.universalPensionEmployee?.message}</span>}
                        >
                            {
                                selectedRow.universalPensionEmployee.map((item, key)=> {
                                    return <Option key={key}>{item}</Option>
                                })
                            }
                        </Select>
                    </FormItem>
                }
            </>
            }
        </>
    )
}


export default CreateInsuranceForm