import { FC } from 'react';
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
                    <SideNavigationItem icon="settings" text="Настройки" onClick={() => navigate("/settings")}/>
                </>
            }
        >

            <SideNavigationItem
                icon="home"
                text="Home"
                onClick={() => navigate("")}
            />
        </SideNavigation>
    )
}

export default NavBar;