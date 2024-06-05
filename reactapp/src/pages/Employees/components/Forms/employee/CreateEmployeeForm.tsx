import { FlexBox, FlexBoxAlignItems, FlexBoxDirection, Input, Label, ValueState } from "@ui5/webcomponents-react"
import { FC } from "react"
import { largeFormItem } from "@utils/css"
import { EmployeeDataInsert } from "@/pages/Employees/models/EmployeeData"
import { Control, FormState } from "react-hook-form"
import WrappedSelect from "@/components/Selects/WrappedSelect"


interface Props {
    control: Control<EmployeeDataInsert>
    formState: FormState<EmployeeDataInsert>
}


const CreateEmployeeForm: FC<Props> = ({control, formState}) => {
    const {errors} = formState



    return (
        <FlexBox style={{gap:"4rem", padding:".3rem 2rem"}}>
            <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column} style={{gap:".5rem"}}>
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label required>Име</Label>
                    <Input
                        style={largeFormItem}
                        {...control.register("employee.firstName", { required: true })}
                        valueState={errors.employee?.firstName ? ValueState.Error : ValueState.None}
                        valueStateMessage={<span>{errors.employee?.firstName?.message}</span>}
                    />
                </FlexBox>
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label required>Презиме</Label>
                    <Input
                        style={largeFormItem}
                        {...control.register("employee.middleName", { required: true })}
                        valueState={errors.employee?.middleName ? ValueState.Error : ValueState.None}
                        valueStateMessage={<span>{errors.employee?.middleName?.message}</span>}
                    />
                </FlexBox>
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label required>Фамилия</Label>
                    <Input
                        style={largeFormItem}
                        {...control.register("employee.surname", { required: true })}
                        valueState={errors.employee?.surname ? ValueState.Error : ValueState.None}
                        valueStateMessage={<span>{errors.employee?.surname?.message}</span>}
                    />
                </FlexBox>
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label required>GSM</Label>
                    <Input
                        style={largeFormItem}
                        {...control.register("employee.phoneNumber", { required: true })}
                        valueState={errors.employee?.phoneNumber ? ValueState.Error : ValueState.None}
                        valueStateMessage={<span>{errors.employee?.phoneNumber?.message}</span>}
                    />
                </FlexBox>
            </FlexBox>

            <FlexBox alignItems={FlexBoxAlignItems.End} direction={FlexBoxDirection.Column} style={{gap:".5rem"}}>
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label required>Отдел</Label>
                    <WrappedSelect
                        style={largeFormItem}
                        tableURL={"/api/hr/departments/all"}
                        contentField={"departmentName"}
                        control={control}
                        name="employee.departmentId"
                    />
                </FlexBox>
                <FlexBox alignItems={FlexBoxAlignItems.Center} style={{gap:"1rem"}}>
                    <Label required>Позиция</Label>
                    <WrappedSelect
                        style={largeFormItem}
                        tableURL={"/api/hr/position/all"}
                        contentField={"positionName"}
                        control={control}
                        name="employee.positionId"
                    />
                </FlexBox>
            </FlexBox>
        </FlexBox>
    )
}

export default CreateEmployeeForm