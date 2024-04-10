import DataType from "@app-types/enums/DataType"
import { FlexBox, Option, FlexBoxAlignItems, FlexBoxDirection, Label, Select, SelectDomRef, StandardListItemDomRef, Ui5CustomEvent, Title, TitleLevel } from "@ui5/webcomponents-react"
import { CSSProperties, FC, useEffect, useState } from "react"
import { ChangeData } from "@models/EventData/ChangeData"
import { InsuranceDTO } from "@models/HR/Insurance"
import { InsuranceFormState } from "@models/States/insurance/InsuranceFormState"
import { insuranceJoinTableInfo } from "@models/JoinTableInfo/InsuranceJoinTableInfo"
import { isFilledCertainField } from "@utils/validation"
import { SysInsuranceType } from "@models/System/SysInsuranceType"
import { SelectChangeEventDetail } from "@ui5/webcomponents/dist/Select.js"
import SmallTableSelect from "@components/Selects/TableSelect/SmallTableSelect"


const selectStyle: CSSProperties = {
    width: "6rem"
}

interface InsuranceFormProps {
    getFormState: () => InsuranceFormState,
    getFormData: () => InsuranceDTO,
    setFormStates: (changeData: ChangeData) => void,
    setFormData: (newData: InsuranceDTO) => void
    handleConfirm: (selectedItem: StandardListItemDomRef, name: string) => void,
}

const CreateInsuranceForm: FC<InsuranceFormProps> = ({getFormState, getFormData, setFormStates, setFormData, handleConfirm }) => {
    const [isInuranceCode, setIsInsuranceCode] = useState<boolean>(false)
    const [selectedRow, setSelectedRow] = useState<SysInsuranceType>({} as SysInsuranceType)

    const setDefaultValues = () => {
        let formData = getFormData()
        for (const [key, value] of Object.entries(selectedRow)) {
            if (Array.isArray(value)) {
                if (value.length == 1) {
                    formData = {...formData, [key]: value[0]}
                }
            }
        }
        setFormData(formData)
    }

    const handleSelectChange = (event: Ui5CustomEvent<SelectDomRef, SelectChangeEventDetail>) => {
        const value = event.detail.selectedOption.textContent
        if (value) {
            const changeData: ChangeData = {
                value: value,
                valueType: event.target.dataset.type,
                name: event.target.name,
            }
            setFormStates(changeData)
        }
    }

    useEffect(() => {
        if(!isInuranceCode) {
            const result = isFilledCertainField(getFormState(), "sysInsuranceTypeId")
            setIsInsuranceCode(result)
        }
    }, [getFormState()])


    useEffect(() => { 
        setDefaultValues()
    },[selectedRow])

    return (
        <FlexBox alignItems={FlexBoxAlignItems.Start} direction={FlexBoxDirection.Column} style={{width: "fit-content", gap:"4rem", padding:".5rem 2rem"}}>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"2rem"}}>
                <Title level={TitleLevel.H4}>Вид осигурен</Title>
                <SmallTableSelect
                    name="sysInsuranceTypeId"
                    joinInfo={insuranceJoinTableInfo}
                    formDataSetter={handleConfirm}
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
                        onChange={handleSelectChange}
                        name="dooWithouthTzpbInsurer"
                        valueState={getFormState().dooWithouthTzpbInsurer.valueState}
                        data-type={DataType.String}
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
                        onChange={handleSelectChange}
                        name="dooWithouthTzpbEmployee"
                        valueState={getFormState().dooWithouthTzpbEmployee.valueState}
                        data-type={DataType.String}
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
                        onChange={handleSelectChange}
                        name="healthInsurance"
                        valueState={getFormState().healthInsurance.valueState}
                        data-type={DataType.String}
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
                        onChange={handleSelectChange}
                        name="healthInsuranceArticle40"
                        valueState={getFormState().healthInsuranceArticle40.valueState}
                        data-type={DataType.String}
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
                        onChange={handleSelectChange}
                        name="healthInsuranceInsurer"
                        valueState={getFormState().healthInsuranceInsurer.valueState}
                        data-type={DataType.String}
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
                        onChange={handleSelectChange}
                        name="healthInsuranceEmployee"
                        valueState={getFormState().healthInsuranceEmployee.valueState}
                        data-type={DataType.String}
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
                        onChange={handleSelectChange}
                        name="teacherPensionFund"
                        valueState={getFormState().teacherPensionFund.valueState}
                        data-type={DataType.String}
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
                        onChange={handleSelectChange}
                        name="professionalPensionFund"
                        valueState={getFormState().professionalPensionFund.valueState}
                        data-type={DataType.String}
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
                        onChange={handleSelectChange}
                        name="universalPensionInsurer"
                        valueState={getFormState().universalPensionInsurer.valueState}
                        data-type={DataType.String}
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
                        onChange={handleSelectChange}
                        name="universalPensionEmployee"
                        valueState={getFormState().universalPensionEmployee.valueState}
                        data-type={DataType.String}
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