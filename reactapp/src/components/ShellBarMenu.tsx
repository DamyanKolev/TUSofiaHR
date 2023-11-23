import { FC } from 'react';
import { Avatar, Button, ShellBar } from "@ui5/webcomponents-react";

interface ShellBarMenuProps {
    hideShowSideNav: () => void;
}

const ShellBarMenu: FC<ShellBarMenuProps> = ({ hideShowSideNav }) => {

    const onProfileClick = () => {
        () => window.location.href = "/"
    }

    return (
        <ShellBar
            logo={<img alt="SAP Logo" src="https://sap.github.io/ui5-webcomponents/assets/images/sap-logo-svg.svg" />}
            onProfileClick={onProfileClick}
            profile={
                <Avatar
                    colorScheme="Accent6"
                    icon="employee"
                    shape="Circle"
                    size="S"
                />
            }
            showCoPilot
        >
            <Button slot="startButton" icon="menu" onClick={hideShowSideNav} />
            {/*<ShellBarItem*/}
            {/*    count="3"*/}
            {/*    icon="add"*/}
            {/*    text="ShellBarItem" />*/}
        </ShellBar>
    );
}

export default ShellBarMenu;