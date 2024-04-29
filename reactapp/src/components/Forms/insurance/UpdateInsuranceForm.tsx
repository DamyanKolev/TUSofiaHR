import { FlexBox, FlexBoxAlignItems, FlexBoxDirection, Label, SelectDomRef, StandardListItemDomRef, Title, TitleLevel, Ui5CustomEvent } from "@ui5/webcomponents-react"
import { CSSProperties, FC, useEffect, useState } from "react"
import DataType from "@app-types/enums/DataType"
import { ChangeData } from "@models/EventData/ChangeData"
import { Insurance } from "@models/HR/Insurance"
import { InsuranceFormState, InsuranceUpdateData } from "@models/States/insurance/InsuranceFormState"
import { insuranceJoinTableInfo } from "@models/JoinTableInfo/InsuranceJoinTableInfo"
import StandardTableSelectField from "../StandartFields/StandartTableSelectField"
import { SelectChangeEventDetail } from "@ui5/webcomponents/dist/Select.js"
import { SysInsuranceType } from "@models/System/SysInsuranceType"
import StandardSelectField from "../StandartFields/StandartSelectField"

const textFieldWidth: string = "2.5rem"

const selectStyle: CSSProperties = {
    width:"6rem"
}


interface UpdateInsuranceFormProps {
    getEditMode: () => boolean,
    getFormData: () => Insurance,
    getFormState: () => InsuranceFormState,
    getUpdateData: () => InsuranceUpdateData,
    setFormStates: (changeData: ChangeData) => void,
    setFormData: (newData: Insurance) => void
    handleConfirm: (selectedItem: StandardListItemDomRef, name: string) => void,
}


const UpdateInsuranceForm: FC<UpdateInsuranceFormProps> = ({getEditMode, getFormData, getFormState, getUpdateData, setFormStates, setFormData, handleConfirm}) => {
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
            setSelectedRow(json.data)
            setInitialization(true)
        }
        else {
            console.log(await response.json())
        }
    }

    const setDefaultValues = () => {
        let formData = getFormData()
        for (const [key, value] of Object.entries(selectedRow)) {
            if (Array.isArray(value)) {
                if (value.length == 1) {
                    formData = {...formData, [key]: value[0]}
                }
                else {
                    formData = {...formData, [key]: "0.00"}
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
        if(!initialization) {
            if(getUpdateData().sysInsuranceTypeId != "") {
                initValues()
            }
        }
        else {
            setDefaultValues()
        }
    }, [getUpdateData().sysInsuranceTypeId]);

    return (
        <FlexBox alignItems={FlexBoxAlignItems.Start} direction={FlexBoxDirection.Column} style={{width: "fit-content", gap:"4rem", padding:".5rem 2rem"}}>
            <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"2rem"}}>
                <Title level={TitleLevel.H4}>Вид осигурен</Title>
                <StandardTableSelectField
                    isLargeTable={false}
                    name="sysInsuranceTypeId"
                    editMode={getEditMode()}
                    value={getUpdateData().sysInsuranceTypeId}
                    joinInfo={insuranceJoinTableInfo}
                    formDataSetter={handleConfirm}
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
                            textFieldWidth={textFieldWidth}
                            selectStyle={selectStyle}
                            editMode={getEditMode()}
                            displayValue={getFormData().dooWithouthTzpbInsurer}
                            onChange={handleSelectChange}
                            name="dooWithouthTzpbInsurer"
                            dataType={DataType.Float}
                            valueState={getFormState().dooWithouthTzpbInsurer.valueState}
                            values={selectedRow.dooWithouthTzpbInsurer}
                        />
                    </FlexBox>
                }
                {
                    selectedRow.dooWithouthTzpbEmployee.length > 1 &&
                    <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                        <Label>ДОО без ТЗПБ осигуровки за сметка на осигуреното лице</Label>
                        <StandardSelectField
                            textFieldWidth={textFieldWidth}
                            selectStyle={selectStyle}
                            editMode={getEditMode()}
                            displayValue={getFormData().dooWithouthTzpbEmployee}
                            onChange={handleSelectChange}
                            name="dooWithouthTzpbEmployee"
                            dataType={DataType.Float}
                            valueState={getFormState().dooWithouthTzpbEmployee.valueState}
                            values={selectedRow.dooWithouthTzpbEmployee}
                        />
                    </FlexBox>
                }
                {
                    selectedRow.healthInsurance.length > 1 &&
                    <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                        <Label>Здравни осигуровки</Label>
                        <StandardSelectField
                            textFieldWidth={textFieldWidth}
                            selectStyle={selectStyle}
                            editMode={getEditMode()}
                            displayValue={getFormData().healthInsurance}
                            onChange={handleSelectChange}
                            name="healthInsurance"
                            dataType={DataType.Float}
                            valueState={getFormState().healthInsurance.valueState}
                            values={selectedRow.healthInsurance}
                        />
                    </FlexBox>
                }
                {
                    selectedRow.healthInsuranceArticle40.length > 1 &&
                    <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                        <Label>Здравни осигуровки само по чл. 40</Label>
                        <StandardSelectField
                            textFieldWidth={textFieldWidth}
                            selectStyle={selectStyle}
                            editMode={getEditMode()}
                            displayValue={getFormData().healthInsuranceArticle40}
                            onChange={handleSelectChange}
                            name="healthInsuranceArticle40"
                            dataType={DataType.Float}
                            valueState={getFormState().healthInsuranceArticle40.valueState}
                            values={selectedRow.healthInsuranceArticle40}
                        />
                    </FlexBox>
                }
                {
                    selectedRow.healthInsuranceInsurer.length > 1 &&
                    <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                        <Label>Всички здрани осигуровки за сметка на осигурителя</Label>
                        <StandardSelectField
                            textFieldWidth={textFieldWidth}
                            selectStyle={selectStyle}
                            editMode={getEditMode()}
                            displayValue={getFormData().healthInsuranceInsurer}
                            onChange={handleSelectChange}
                            name="healthInsuranceInsurer"
                            dataType={DataType.Float}
                            valueState={getFormState().healthInsuranceInsurer.valueState}
                            values={selectedRow.healthInsuranceInsurer}
                        />
                    </FlexBox>
                }
                {
                    selectedRow.healthInsuranceEmployee.length > 1 &&
                    <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                        <Label>Всички здрани осигуровки за сметка на осигуреното лице</Label>
                        <StandardSelectField
                            textFieldWidth={textFieldWidth}
                            selectStyle={selectStyle}
                            editMode={getEditMode()}
                            displayValue={getFormData().healthInsuranceEmployee}
                            onChange={handleSelectChange}
                            name="healthInsuranceEmployee"
                            dataType={DataType.Float}
                            valueState={getFormState().healthInsuranceEmployee.valueState}
                            values={selectedRow.healthInsuranceEmployee}
                        />
                    </FlexBox>
                }
                {
                    selectedRow.teacherPensionFund.length > 1 &&
                    <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                        <Label>Учителски пенсионен фонд</Label>
                        <StandardSelectField
                            textFieldWidth={textFieldWidth}
                            selectStyle={selectStyle}
                            editMode={getEditMode()}
                            displayValue={getFormData().teacherPensionFund}
                            onChange={handleSelectChange}
                            name="teacherPensionFund"
                            dataType={DataType.Float}
                            valueState={getFormState().teacherPensionFund.valueState}
                            values={selectedRow.teacherPensionFund}
                        />
                    </FlexBox>
                }
                {
                    selectedRow.professionalPensionFund.length > 1 &&
                    <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                        <Label>Професионален пенсионен фонд</Label>
                        <StandardSelectField
                            textFieldWidth={textFieldWidth}
                            selectStyle={selectStyle}
                            editMode={getEditMode()}
                            displayValue={getFormData().professionalPensionFund}
                            onChange={handleSelectChange}
                            name="professionalPensionFund"
                            dataType={DataType.Float}
                            valueState={getFormState().professionalPensionFund.valueState}
                            values={selectedRow.professionalPensionFund}
                        />
                    </FlexBox>
                }
                {
                    selectedRow.universalPensionInsurer.length > 1 &&
                    <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                        <Label>Универсален пенсионен фонд за сметка на осигурителя</Label>
                        <StandardSelectField
                            textFieldWidth={textFieldWidth}
                            selectStyle={selectStyle}
                            editMode={getEditMode()}
                            displayValue={getFormData().universalPensionInsurer}
                            onChange={handleSelectChange}
                            name="universalPensionInsurer"
                            dataType={DataType.Float}
                            valueState={getFormState().universalPensionInsurer.valueState}
                            values={selectedRow.universalPensionInsurer}
                        />
                    </FlexBox>
                }
                {
                    selectedRow.universalPensionEmployee.length > 1 &&
                    <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                        <Label>Универсален пенсионен фонд за сметка на осигуреното лице</Label>
                        <StandardSelectField
                            textFieldWidth={textFieldWidth}
                            selectStyle={selectStyle}
                            editMode={getEditMode()}
                            displayValue={getFormData().universalPensionEmployee}
                            onChange={handleSelectChange}
                            name="universalPensionEmployee"
                            dataType={DataType.Float}
                            valueState={getFormState().universalPensionEmployee.valueState}
                            values={selectedRow.universalPensionEmployee}
                        />
                    </FlexBox>
                }
                </FlexBox>
            }
        </FlexBox>
    )
}


export default UpdateInsuranceForm