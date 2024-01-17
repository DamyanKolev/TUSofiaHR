import { FC } from 'react';
import "@ui5/webcomponents-icons/home"
import "@ui5/webcomponents-icons/settings"
import "@ui5/webcomponents-icons/chain-link"
import { SideNavigation, SideNavigationItem } from '@ui5/webcomponents-react';
import { useNavigate } from "react-router-dom";


interface NavBarProps {
    collapsed: boolean;
}

const NavBar: FC<NavBarProps> = ({ collapsed }) => {
    const navigate = useNavigate();

    return (
        <SideNavigation
            collapsed={collapsed}
            fixedItems={
                <>
                    <SideNavigationItem icon="chain-link" text="Useful Links" />
                    <SideNavigationItem icon="settings" text="Settings" onClick={() => navigate("/settings")}/>
                </>
            }
        >

            <SideNavigationItem
                icon="home"
                text="Home"
                onClick={() => navigate("/hr")}
            />

        </SideNavigation>
    )
}

export default NavBar;