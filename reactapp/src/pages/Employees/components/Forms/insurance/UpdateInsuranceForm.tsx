import { FlexBox, FlexBoxAlignItems, FlexBoxDirection, Label, Title, TitleLevel } from "@ui5/webcomponents-react"
import { CSSProperties, FC, useEffect, useState } from "react"
import { SysInsuranceType } from "@/pages/Employees/models/System/SysInsuranceType"
import { EmployeeDataUpdateDTO } from "@/pages/Employees/models/EmployeeData"
import { Control, FieldPath, UseFormGetValues, UseFormSetValue } from "react-hook-form"
import { insuranceJoinTableInfo } from "@/pages/Employees/models/JoinTableInfo/InsuranceJoinTableInfo"
import { StandardSelectField, StandardSmallTableSelectField } from "@/components/Forms/StandartFields/StandartFieldsBundle"
import { InsuranceUpdateData } from "@/pages/Employees/models/Insurance"


const textFieldWidth: string = "2.5rem"

const selectStyle: CSSProperties = {
    width:"6rem"
}


interface Props {
    getEditMode: () => boolean,
    getUpdateData: () => InsuranceUpdateData,
    control: Control<EmployeeDataUpdateDTO>
    setValue: UseFormSetValue<EmployeeDataUpdateDTO>
    getValues: UseFormGetValues<EmployeeDataUpdateDTO>
}


const UpdateInsuranceForm: FC<Props> = ({getEditMode, getUpdateData, control, setValue, getValues}) => {
    const [selectedRow, setSelectedRow] = useState<SysInsuranceType>({} as SysInsuranceType)
    const [initialization, setInitialization] = useState<boolean>(false)

    const initValues = async () => {
        const postURL = "/api/sys/insurance-type/by-code"
        const token = sessionStorage.getItem("accessToken")
        const response = await fetch(postURL, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(getUpdateData().sysInsuranceTypeId),
        });

        if (response.ok) {
            const json = await response.json()
            setSelectedRow(json.data[0])
            setInitialization(true)
        }
        else {
            console.log(await response.json())
        }
    }

    const setDefaultValues = () => {
        for (const [key, value] of Object.entries(selectedRow)) {
            if (Array.isArray(value)) {
                if (value.length == 1) {
                    const name = `insurance.${key}` as FieldPath<EmployeeDataUpdateDTO>
                    setValue(name, `${value}`)
                }
            }
        }
    }

    useEffect(() => {
        const value = getValues("insurance.sysInsuranceTypeId")
        if(!initialization && value > 0) {
            initValues()
        }
        else {
            setDefaultValues()
        }
    }, [getValues("insurance.sysInsuranceTypeId")]);

    return (
        <FlexBox alignItems={FlexBoxAlignItems.Start} direction={FlexBoxDirection.Column} style={{width: "fit-content", gap:"4rem", padding:".5rem 2rem"}}>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"2rem"}}>
                <Title level={TitleLevel.H4}>Вид осигурен</Title>
                <StandardSmallTableSelectField
                    textFieldWidth={textFieldWidth}
                    editMode={getEditMode()}
                    control={control}
                    rules={{ required: true }}
                    joinInfo={insuranceJoinTableInfo}
                    displayValue={getUpdateData().sysInsuranceTypeId ? `${getUpdateData().sysInsuranceTypeId}` : ""}
                    name='insurance.sysInsuranceTypeId'
                    setSelectedRow={setSelectedRow}
                />
            </FlexBox>
            {
                initialization &&
                <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column} style={getEditMode()? {marginLeft:"3rem"} : {marginLeft:"3rem", gap:".5rem"}}>
                {
                    selectedRow.dooWithouthTzpbInsurer.length > 1 &&
                    <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                        <Label>ДОО без ТЗПБ осигуровки за сметка на осигурителя</Label>
                        <StandardSelectField
                            style={selectStyle}
                            editMode={getEditMode()}
                            control={control}
                            rules={{ required: true }}
                            values={selectedRow.dooWithouthTzpbInsurer}
                            name='insurance.dooWithouthTzpbInsurer'
                        />
                    </FlexBox>
                }
                {
                    selectedRow.dooWithouthTzpbEmployee.length > 1 &&
                    <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                        <Label>ДОО без ТЗПБ осигуровки за сметка на осигуреното лице</Label>
                        <StandardSelectField
                            style={selectStyle}
                            editMode={getEditMode()}
                            control={control}
                            rules={{ required: true }}
                            values={selectedRow.dooWithouthTzpbEmployee}
                            name='insurance.dooWithouthTzpbEmployee'
                        />
                    </FlexBox>
                }
                {
                    selectedRow.healthInsurance.length > 1 &&
                    <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                        <Label>Здравни осигуровки</Label>
                        <StandardSelectField
                            style={selectStyle}
                            editMode={getEditMode()}
                            control={control}
                            rules={{ required: true }}
                            values={selectedRow.healthInsurance}
                            name='insurance.healthInsurance'
                        />
                    </FlexBox>
                }
                {
                    selectedRow.healthInsuranceArticle40.length > 1 &&
                    <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                        <Label>Здравни осигуровки само по чл. 40</Label>
                        <StandardSelectField
                            style={selectStyle}
                            editMode={getEditMode()}
                            control={control}
                            rules={{ required: true }}
                            values={selectedRow.healthInsuranceArticle40}
                            name='insurance.healthInsuranceArticle40'
                        />
                    </FlexBox>
                }
                {
                    selectedRow.healthInsuranceInsurer.length > 1 &&
                    <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                        <Label>Всички здрани осигуровки за сметка на осигурителя</Label>
                        <StandardSelectField
                            style={selectStyle}
                            editMode={getEditMode()}
                            control={control}
                            rules={{ required: true }}
                            values={selectedRow.healthInsuranceInsurer}
                            name='insurance.healthInsuranceInsurer'
                        />
                    </FlexBox>
                }
                {
                    selectedRow.healthInsuranceEmployee.length > 1 &&
                    <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                        <Label>Всички здрани осигуровки за сметка на осигуреното лице</Label>
                        <StandardSelectField
                            style={selectStyle}
                            editMode={getEditMode()}
                            control={control}
                            rules={{ required: true }}
                            values={selectedRow.healthInsuranceEmployee}
                            name='insurance.healthInsuranceEmployee'
                        />
                    </FlexBox>
                }
                {
                    selectedRow.teacherPensionFund.length > 1 &&
                    <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                        <Label>Учителски пенсионен фонд</Label>
                        <StandardSelectField
                            style={selectStyle}
                            editMode={getEditMode()}
                            control={control}
                            rules={{ required: true }}
                            values={selectedRow.teacherPensionFund}
                            name='insurance.teacherPensionFund'
                        />
                    </FlexBox>
                }
                {
                    selectedRow.professionalPensionFund.length > 1 &&
                    <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                        <Label>Професионален пенсионен фонд</Label>
                        <StandardSelectField
                            style={selectStyle}
                            editMode={getEditMode()}
                            control={control}
                            rules={{ required: true }}
                            values={selectedRow.professionalPensionFund}
                            name='insurance.professionalPensionFund'
                        />
                    </FlexBox>
                }
                {
                    selectedRow.universalPensionInsurer.length > 1 &&
                    <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                        <Label>Универсален пенсионен фонд за сметка на осигурителя</Label>
                        <StandardSelectField
                            style={selectStyle}
                            editMode={getEditMode()}
                            control={control}
                            rules={{ required: true }}
                            values={selectedRow.universalPensionInsurer}
                            name='insurance.universalPensionInsurer'
                        />
                    </FlexBox>
                }
                {
                    selectedRow.universalPensionEmployee.length > 1 &&
                    <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                        <Label>Универсален пенсионен фонд за сметка на осигуреното лице</Label>
                        <StandardSelectField
                            style={selectStyle}
                            editMode={getEditMode()}
                            control={control}
                            rules={{ required: true }}
                            values={selectedRow.universalPensionEmployee}
                            name='insurance.universalPensionEmployee'
                        />
                    </FlexBox>
                }
                </FlexBox>
            }
        </FlexBox>
    )
}


export default UpdateInsuranceForm