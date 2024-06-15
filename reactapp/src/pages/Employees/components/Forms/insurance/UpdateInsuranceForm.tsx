import { FormItem, Label } from "@ui5/webcomponents-react"
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

    const insuranceRequest = async () => {
        const postURL = "/api/sys/insurance-type/by-code"
        const token = sessionStorage.getItem("accessToken")
        const response = await fetch(postURL, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(getUpdateData().insuranceTypeId),
        });
        const json = await response.json()

        if (response.ok) {
            setSelectedRow(json.data)
            setInitialization(true)
        }
        else {
            throw Error(json.errors)
        }
    }

    const initValues = async () => {
        try {
            insuranceRequest()
        }
        catch (error) {
            console.error(error)
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
        const value = getValues("insurance.insuranceTypeId")
        if(!initialization && value > 0) {
            initValues()
        }
        else {
            setDefaultValues()
        }
    }, [getValues("insurance.insuranceTypeId")]);

    return (
        <>
            <FormItem label={<Label>Вид осигурен</Label>}>
                <StandardSmallTableSelectField
                    textFieldWidth={textFieldWidth}
                    editMode={getEditMode()}
                    control={control}
                    rules={{ required: true }}
                    joinInfo={insuranceJoinTableInfo}
                    displayValue={getUpdateData().insuranceTypeId ? `${getUpdateData().insuranceTypeId}` : ""}
                    name='insurance.insuranceTypeId'
                    setSelectedRow={setSelectedRow}
                />
            </FormItem>
            {
                initialization &&
                <>
                    {
                        selectedRow.dooWithouthTzpbInsurer.length > 1 &&
                        <FormItem label={<Label>ДОО без ТЗПБ осигуровки за сметка на осигурителя</Label>}>
                            <StandardSelectField
                                style={selectStyle}
                                editMode={getEditMode()}
                                control={control}
                                rules={{ required: true }}
                                values={selectedRow.dooWithouthTzpbInsurer}
                                name='insurance.dooWithouthTzpbInsurer'
                            />
                        </FormItem>
                    }
                    {
                        selectedRow.dooWithouthTzpbEmployee.length > 1 &&
                        <FormItem label={<Label>ДОО без ТЗПБ осигуровки за сметка на осигуреното лице</Label>}>
                            <StandardSelectField
                                style={selectStyle}
                                editMode={getEditMode()}
                                control={control}
                                rules={{ required: true }}
                                values={selectedRow.dooWithouthTzpbEmployee}
                                name='insurance.dooWithouthTzpbEmployee'
                            />
                        </FormItem>
                    }
                    {
                        selectedRow.healthInsurance.length > 1 &&
                        <FormItem label={<Label>Здравни осигуровки</Label>}>
                            <StandardSelectField
                                style={selectStyle}
                                editMode={getEditMode()}
                                control={control}
                                rules={{ required: true }}
                                values={selectedRow.healthInsurance}
                                name='insurance.healthInsurance'
                            />
                        </FormItem>
                    }
                    {
                        selectedRow.healthInsuranceArticle40.length > 1 &&
                        <FormItem label={<Label>Здравни осигуровки само по чл. 40</Label>}>
                            <StandardSelectField
                                style={selectStyle}
                                editMode={getEditMode()}
                                control={control}
                                rules={{ required: true }}
                                values={selectedRow.healthInsuranceArticle40}
                                name='insurance.healthInsuranceArticle40'
                            />
                        </FormItem>
                    }
                    {
                        selectedRow.healthInsuranceInsurer.length > 1 &&
                        <FormItem label={<Label>Всички здрани осигуровки за сметка на осигурителя</Label>}>
                            <StandardSelectField
                                style={selectStyle}
                                editMode={getEditMode()}
                                control={control}
                                rules={{ required: true }}
                                values={selectedRow.healthInsuranceInsurer}
                                name='insurance.healthInsuranceInsurer'
                            />
                        </FormItem>
                    }
                    {
                        selectedRow.healthInsuranceEmployee.length > 1 &&
                        <FormItem label={<Label>Всички здрани осигуровки за сметка на осигуреното лице</Label>}>
                            <StandardSelectField
                                style={selectStyle}
                                editMode={getEditMode()}
                                control={control}
                                rules={{ required: true }}
                                values={selectedRow.healthInsuranceEmployee}
                                name='insurance.healthInsuranceEmployee'
                            />
                        </FormItem>
                    }
                    {
                        selectedRow.teacherPensionFund.length > 1 &&
                        <FormItem label={<Label>Учителски пенсионен фонд</Label>}>
                            <StandardSelectField
                                style={selectStyle}
                                editMode={getEditMode()}
                                control={control}
                                rules={{ required: true }}
                                values={selectedRow.teacherPensionFund}
                                name='insurance.teacherPensionFund'
                            />
                        </FormItem>
                    }
                    {
                        selectedRow.professionalPensionFund.length > 1 &&
                        <FormItem label={<Label>Професионален пенсионен фонд</Label>}>
                            <StandardSelectField
                                style={selectStyle}
                                editMode={getEditMode()}
                                control={control}
                                rules={{ required: true }}
                                values={selectedRow.professionalPensionFund}
                                name='insurance.professionalPensionFund'
                            />
                        </FormItem>
                    }
                    {
                        selectedRow.universalPensionInsurer.length > 1 &&
                        <FormItem label={<Label>Универсален пенсионен фонд за сметка на осигурителя</Label>}>
                            <StandardSelectField
                                style={selectStyle}
                                editMode={getEditMode()}
                                control={control}
                                rules={{ required: true }}
                                values={selectedRow.universalPensionInsurer}
                                name='insurance.universalPensionInsurer'
                            />
                        </FormItem>
                    }
                    
                    {
                        selectedRow.universalPensionEmployee.length > 1 &&
                        <FormItem label={<Label>Универсален пенсионен фонд за сметка на осигуреното лице</Label>}>
                            <StandardSelectField
                                style={selectStyle}
                                editMode={getEditMode()}
                                control={control}
                                rules={{ required: true }}
                                values={selectedRow.universalPensionEmployee}
                                name='insurance.universalPensionEmployee'
                            />
                        </FormItem>
                    }
                </>
            }
        </>
    )
}


export default UpdateInsuranceForm