import { SideNavigation, SideNavigationItem, SideNavigationSubItem } from "@ui5/webcomponents-react";
import { useNavigate } from "react-router-dom";
import "@ui5/webcomponents-icons/home"


export default function NavBar({ collapsed }: Boolean) {
    const navigate = useNavigate();

    return (
        <SideNavigation
            collapsed={collapsed}
            fixedItems={<><SideNavigationItem icon="chain-link" text="Useful Links" /><SideNavigationItem icon="history" text="History" /></>}
        >
            <SideNavigationItem
                icon="home"
                text="Home"
                onClick={() => navigate("/")}
            />
            <SideNavigationItem
                icon="employee"
                text="Employees"
                onClick={() => navigate("/employee")}
            />
            <SideNavigationItem
                expanded
                icon="group"
                text="People"
            >
                <SideNavigationSubItem text="From My Team" />
                <SideNavigationSubItem text="From Other Teams" />
            </SideNavigationItem>

            <SideNavigationItem
                icon="calendar"
                text="Events"
            >
                <SideNavigationSubItem text="Local" />
                <SideNavigationSubItem text="Others" />
            </SideNavigationItem>
        </SideNavigation>
    )
}