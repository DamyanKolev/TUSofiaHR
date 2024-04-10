import DataType from "@app-types/enums/DataType";
import PageBar from "@components/Bars/PageBar";
import CreateIncomeForm from "@components/Forms/income/CreateIncomeForm";
import CreateScheduleForm from "@components/Forms/schedule/CreateScheduleForm";
import { ChangeData } from "@models/EventData/ChangeData";
import { createDefaultIncome } from "@models/HR/Income";
import { createDefaultSchedule } from "@models/HR/Schedule";
import { ScheduleIncome, ScheduleIncomeInsert } from "@models/HR/ScheduleIncome";
import { EmployeeView } from "@models/TableViews/EmployeeView";
import { Bar, BarDesign, Button, ButtonDesign, FlexBox, FlexBoxDirection, FlexBoxWrap, Title } from "@ui5/webcomponents-react";
import { getNewFormData } from "@utils/forms/formData";
import { getData } from "@utils/getData";
import { FC, Fragment, useState } from "react";



const InsurancePage: FC = () => {
    const [employees, setEmployees] = useState<Array<EmployeeView>>([])
    const [formData, setFormData] = useState<Map<number, ScheduleIncome>>(new Map())
    const [isClicked, setIsClicked] = useState<boolean>(false)


    const setFormStates = (changeData: ChangeData, currentKey: int) => {
        changeData.valueType = changeData.valueType? changeData.valueType : DataType.String
        const {name, value, valueType} = changeData
        const currentData = formData.get(currentKey)

        if (name && value && currentData) {
            const newFormData = getNewFormData(currentData, name, value, valueType)
            const currentFormData = new Map()
            formData.forEach((value, key) => {
                if (key == currentKey) {
                    currentFormData.set(currentKey, newFormData)
                }
                else {
                    currentFormData.set(key, value)
                }
            })
            setFormData(currentFormData)
        }
    }

    const successCalback = () => {
        setFormData(new Map())
    }

    const onSubmitForm = async () => {
        const array1 = new Array()
        const array2 = new Array()

        formData.forEach((value) => {
            array1.push(value.income)
            array2.push(value.schedule)
        })

        const newObject:ScheduleIncomeInsert = {
            incomes: array1,
            schedules: array2
        }
        const token = sessionStorage.getItem("accessToken")
        const response = await fetch(`/api/hr/employee/income`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(newObject),
        });
        if (response.ok) {
            successCalback()
        }
        else {
            console.log(response.json())
        }
    };


    const onClickSalaryBtn = async () => {
        const result = await getData<Array<EmployeeView>>("/api/hr/employee/all")
        if (result != null) {
            setEmployees(result)
            let newMap = new Map<number, ScheduleIncome>();
            result.forEach(employee => {
                const income = createDefaultIncome(employee.employeeId)
                const schedule = createDefaultSchedule(employee.employeeId)
                const incomeSchedule: ScheduleIncome = {income: income, schedule: schedule}
                newMap.set(employee.employeeId, incomeSchedule)
            })

            setIsClicked(true)
            setFormData(newMap)
        }
    }

    return (
        <div className="flexible-columns ui5-content-density-compact">
            <PageBar
                children={
                    <Button onClick={onClickSalaryBtn} design={ButtonDesign.Transparent} slot="endContent">Заплати</Button>
                }
            />
            {
                isClicked &&
                <div>
                    {
                        <FlexBox direction={FlexBoxDirection.Column} style={
                            {gap:"5rem", height:"calc(100vh - 12.78rem)", overflowY:"scroll", padding:"2rem"}
                        }>
                            {
                                Array.from(formData.values()).map((element, key) => {
                                return <Fragment key={key}>
                                        <Title>{
                                            employees.map((item) => {
                                                if(item.employeeId == element.income.employeeId){
                                                    return item.employeeName
                                                }
                                                else {
                                                    return ""
                                                }
                                            })
                                        }</Title>
                                        <FlexBox key={key} style={{gap:"4rem"}} wrap={FlexBoxWrap.Wrap}>
                                            <CreateScheduleForm
                                                getFormData={() => {return element.schedule}}
                                                setFormStates={setFormStates}
                                            />
                                            <CreateIncomeForm
                                                getFormData={() => {return element.income}}
                                                setFormStates={setFormStates}
                                            />
                                        </FlexBox>
                                    </Fragment>
                                })
                            }
                        </FlexBox>
                    }
                    <Bar
                        design={BarDesign.Footer}
                        endContent={
                            <Button onClick={onSubmitForm}>Запази</Button>
                        }
                    />
                </div>
            }
        </div>
    )
}

export default InsurancePage