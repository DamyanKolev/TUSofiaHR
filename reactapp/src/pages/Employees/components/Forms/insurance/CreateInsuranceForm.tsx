import { FlexBox, Option, FlexBoxAlignItems, FlexBoxDirection, Label, Select, Title, TitleLevel, ValueState } from "@ui5/webcomponents-react"
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
        const value = getValues("insurance.sysInsuranceTypeId")
        if (!isInuranceCode && value > 0) {
            setIsInsuranceCode(true)
        }
    },[selectedRow])

    return (
        <FlexBox alignItems={FlexBoxAlignItems.Start} direction={FlexBoxDirection.Column} style={{width: "fit-content", gap:"4rem", padding:".5rem 2rem"}}>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"2rem"}}>
                <Title level={TitleLevel.H4}>Вид осигурен</Title>
                <SmallTableSelect
                    name="insurance.sysInsuranceTypeId"
                    control={control}
                    joinInfo={insuranceJoinTableInfo}
                    setSelectedRow={setSelectedRow}
                />
            </FlexBox>
            {
            isInuranceCode &&
            <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column} style={{marginLeft:"3rem"}}>
            {
                selectedRow.dooWithouthTzpbInsurer.length > 1 &&
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label>ДОО без ТЗПБ осигуровки за сметка на осигурителя</Label>
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
                </FlexBox>
            }
            {
                selectedRow.dooWithouthTzpbEmployee.length > 1 &&
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label>ДОО без ТЗПБ осигуровки за сметка на осигуреното лице</Label>
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
                </FlexBox>
            }
            {
                selectedRow.healthInsurance.length > 1 &&
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label>Здравни осигуровки</Label>
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
                </FlexBox>
            }
            {
                selectedRow.healthInsuranceArticle40.length > 1 &&
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label>Здравни осигуровки само по чл. 40</Label>
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
                </FlexBox>
            }
            {
                selectedRow.healthInsuranceInsurer.length > 1 &&
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label>Всички здрани осигуровки за сметка на осигурителя</Label>
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
                </FlexBox>
            }
            {
                selectedRow.healthInsuranceEmployee.length > 1 &&
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label>Всички здрани осигуровки за сметка на осигуреното лице</Label>
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
                </FlexBox>
            }
            {
                selectedRow.teacherPensionFund.length > 1 &&
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label>Учителски пенсионен фонд</Label>
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
                </FlexBox>
            }
            {
                selectedRow.professionalPensionFund.length > 1 &&
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label>Професионален пенсионен фонд</Label>
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
                </FlexBox>
            }
            {
                selectedRow.universalPensionInsurer.length > 1 &&
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label>Универсален пенсионен фонд за сметка на осигурителя</Label>
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
                </FlexBox>
            }
            {
                selectedRow.universalPensionEmployee.length > 1 &&
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label>Универсален пенсионен фонд за сметка на осигуреното лице</Label>
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
                </FlexBox>
            }
            </FlexBox>
            }
        </FlexBox>
    )
}


export default CreateInsuranceForm