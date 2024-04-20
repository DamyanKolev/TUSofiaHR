import DataType from "@app-types/enums/DataType";
import PageBar from "@components/Bars/PageBar";
import CreateCompanyEmployeeTaxForm from "@components/Forms/companyEmployeTax/CreateCompanyEmployeeTaxForm";
import { ChangeData } from "@models/EventData/ChangeData";
import { CompanyEmployeeTax, createDefaultCompanyEmployeeTax } from "@models/HR/declarations/CompanyEmployeeTax";
import { EmployeeView } from "@models/TableViews/EmployeeView";
import { Bar, BarDesign, Button, ButtonDesign, FlexBox, FlexBoxDirection, MessageBox, Title} from "@ui5/webcomponents-react";
import { downloadFile, downloadFile2 } from "@utils/download";
import { getNewFormData } from "@utils/forms/formData";
import { getData } from "@utils/getData";
import { FC, useState } from "react";
import { createPortal } from "react-dom";




const DeclarationPage: FC = () => {
    const [employees, setEmployees] = useState<Array<EmployeeView>>([])
    const [formData, setFormData] = useState<Map<number, CompanyEmployeeTax>>(new Map())
    const [isD6, setIsD6] = useState<boolean>(false)
    const [isError, setIsError] = useState<boolean>(false)
    const [errorMsg, setErrorMsg] = useState<string>("")

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

    const createBodyData = (): Array<CompanyEmployeeTax> => {
        const array = new Array<CompanyEmployeeTax>()

        formData.forEach((value) => {
            array.push(value)
        })

        return array
    };

    const onClick = async () =>{
        const isPrepared = await getData<boolean>("/api/hr/references/declaration/prepared")
        if (isPrepared) {
            const fetchURL = "/api/hr/references/declaration-1"
            const filename = "declaration1"
            downloadFile(fetchURL, filename)
        }
        else {
            setIsError(true)
            setErrorMsg("За този месец не са въведени данни или вече са изпратени в НАП!")
        }
    }


    const onClickSave = async () =>{
        const isPrepared = await getData<boolean>("/api/hr/references/declaration/prepared")
        if (isPrepared) {
            const fetchURL = "/api/hr/references/declaration-6"
            const filename = "declaration6"
            downloadFile2(fetchURL, filename, createBodyData())
        }
        else {
            setIsError(true)
            setErrorMsg("За този месец не са въведени данни или вече са изпратени в НАП")
        }
    }


    const onClickD6 = async () => {
        const result = await getData<Array<EmployeeView>>("/api/hr/employees/all")
        if (result != null) {
            setEmployees(result)
            let newMap = new Map<number, CompanyEmployeeTax>();
            result.forEach(employee => {
                const companyEmployeeTax = createDefaultCompanyEmployeeTax(employee.employeeId)
                newMap.set(employee.employeeId, companyEmployeeTax)
            })

            setIsD6(true)
            setFormData(newMap)
        }
    }

    return (
        <div className="flexible-columns ui5-content-density-compact">
            <PageBar title="Декларации">
                <Button slot="endContent" design={ButtonDesign.Transparent} onClick={onClick}>Д1</Button>
                <Button slot="endContent" design={ButtonDesign.Transparent} onClick={onClickD6}>Д6</Button>
            </PageBar>

            {
                    isD6 &&
                    <div>
                    {
                        <FlexBox direction={FlexBoxDirection.Column} style={
                            {gap:"6rem", height:"calc(100vh - 12.78rem)", overflowY:"scroll", padding:"2rem"}
                        }>
                            {
                                Array.from(formData.values()).map((element, key) => {
                                return <FlexBox key={key} direction={FlexBoxDirection.Column} style={{gap:"2rem"}}>
                                        <Title>{
                                            employees.map((item) => {
                                                if(item.employeeId == element.employeeId){
                                                    return item.employeeName
                                                }
                                                else {
                                                    return ""
                                                }
                                            })
                                        }</Title>
                                        <FlexBox key={key}>
                                            <CreateCompanyEmployeeTaxForm
                                                getFormData={() => {return element}}
                                                setFormStates={setFormStates}
                                            />
                                        </FlexBox>
                                    </FlexBox>
                                })
                            }
                        </FlexBox>
                    }
                    <Bar
                        design={BarDesign.Footer}
                        endContent={
                            <Button onClick={onClickSave}>Запази</Button>
                        }
                    />
                </div>
                }

                {
                    createPortal(
                        <MessageBox
                            open={isError}
                            type="Error"
                            titleText="Грешка"
                            onClose={() => setIsError(false)}
                        >
                            <div style={{fontSize: "1rem", fontFamily: `"72", "72full", Arial, Helvetica, sans-serif`, margin:"1rem"}}>
                                {errorMsg}
                            </div>
                      </MessageBox>,
                      document.body
                    )
                }
        </div>
    )
}

export default DeclarationPage