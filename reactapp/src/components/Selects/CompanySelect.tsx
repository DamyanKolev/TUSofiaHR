import { Database } from "@models/Auth/Database";
import { FlexBox, FlexBoxAlignItems, FlexBoxJustifyContent, Select, SelectDomRef, StandardListItem, Title, TitleLevel, Ui5CustomEvent } from "@ui5/webcomponents-react";
import { SelectChangeEventDetail } from "@ui5/webcomponents/dist/Select.js";
import { getData } from "@utils/getData";
import { FC, useEffect, useState } from "react";




const CompanySelect: FC = () => {
    const [companies, setCompanies] = useState<Array<Database>>([])
    const getURL = "/api/auth/company/all"
    const storageCompany = localStorage.getItem("company")
    const currentCompany:Database| null = storageCompany? JSON.parse(storageCompany) : null



    const init = async () => {
        const allCompanies = await getData<Array<Database>>(getURL)
        if (allCompanies != null) {
            setCompanies(allCompanies)
        }
    }

    useEffect(() => {
        init()
    },[])


    const onChange = (event: Ui5CustomEvent<SelectDomRef, SelectChangeEventDetail>) => {
        const selectedOption = event.detail.selectedOption
        const companyId = selectedOption.dataset.companyId
        if (companyId) {
            const newCompany = companies.map(company => {if(company.id == Number(companyId)) {return company}})
            if(newCompany) {
                localStorage.setItem('company',JSON.stringify(newCompany));
            }
        }
    }

    if(companies.length > 1) {
        return (
            <FlexBox style={{padding:"0 3rem"}} alignItems={FlexBoxAlignItems.Center} justifyContent={FlexBoxJustifyContent.SpaceBetween}>
                <Title level={TitleLevel.H4}>Избор на Фирма</Title>
                <Select onChange={onChange} style={{width: "15rem"}}>
                    {
                        companies.map((company: Database, key: number) => {
                            const selected = (currentCompany?.id === company.id)? true : false

                            return (
                                <StandardListItem key={key} additionalText={company.companyEic} selected={selected}>
                                    {company.companyName}
                                </StandardListItem>
                            )
                        })
                    }
                </Select>
            </FlexBox>
        )
    }
    else {
        return (
            <></>
        )
    }
}

export default CompanySelect