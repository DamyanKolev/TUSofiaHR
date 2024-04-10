import { Database } from "@models/Auth/Database";
import { InitAccountModel } from "@pages/auth/Login";
import { Dialog, FlexBox, FlexBoxDirection, List, ListDomRef, StandardListItem, Title, TitleLevel, Ui5CustomEvent } from "@ui5/webcomponents-react";
import { ListItemClickEventDetail } from "@ui5/webcomponents/dist/List.js";
import { Dispatch, FC} from "react";
import { useNavigate } from "react-router-dom";


interface CompanyDialogProps {
    getSelected: () => boolean,
    setIsSelected: Dispatch<React.SetStateAction<InitAccountModel>>,
    getCompanies: () => Array<Database>,
    getIsCreated: () => boolean
}


const CompanyDialog: FC<CompanyDialogProps> = ({getSelected, setIsSelected, getCompanies, getIsCreated}) => {
    const navigate = useNavigate();
    
    const onItemClick = (event: Ui5CustomEvent<ListDomRef, ListItemClickEventDetail>) => {
        const companyId = event.detail.item.id
        const selectedCompany = getCompanies().map(company => {
            if(company.id == Number(companyId)) {
                return company
            }
        })
        localStorage.setItem("company", JSON.stringify(selectedCompany))
        if (!getIsCreated()) {
            setIsSelected({isCreated: true, isSelectedCompany: false})
        }
        else {
            setIsSelected({isCreated: false, isSelectedCompany: false})
            navigate("/")
        }
    }

    return (
        <Dialog open={getSelected()} headerText="Фирми" >
            <FlexBox direction={FlexBoxDirection.Column} style={{gap:"1rem", padding: "1rem 2rem"}}>
                <FlexBox>
                    <Title level={TitleLevel.H4}>Моля избере фирма преди да започнете </Title>
                </FlexBox>
                <List
                    onItemClick={onItemClick}
                    headerText="Фирми"
                    >
                    {
                        getCompanies().map((company: Database, key: number) => {
                            return (
                                <StandardListItem key={key} additionalText={company.company_eic} id={company.id.toString()}>
                                    {company.company_name}
                                </StandardListItem>
                            )
                        })
                    }
                </List>
            </FlexBox>
        </Dialog>
    )
}

export default CompanyDialog