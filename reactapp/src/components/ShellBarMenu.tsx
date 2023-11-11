import { Avatar, Button, Icon, Input, ShellBar, ShellBarItem, StandardListItem } from "@ui5/webcomponents-react";



export default function ShellBarMenu({ hideShowSideNav }) {
    

    return (
        <ShellBar
            logo={<img alt="SAP Logo" src="https://sap.github.io/ui5-webcomponents/assets/images/sap-logo-svg.svg" />}
            notificationsCount="10"
            onCoPilotClick={function Ta() { }}
            onLogoClick={function Ta() { }}
            onMenuItemClick={function Ta() { }}
            onNotificationsClick={function Ta() { }}
            onProfileClick={function Ta() { }}
            profile={<Avatar><img src="https://sap.github.io/ui5-webcomponents-react/assets/Person-eb847016.png" /></Avatar>}
            searchField={<Input icon={<Icon interactive name="search" />} showClearIcon />}
            showCoPilot
            showNotifications
        >
            <Button slot="startButton" icon="menu" onClick={hideShowSideNav} />
            <ShellBarItem
                count="3"
                icon="add"
                text="ShellBarItem" />
        </ShellBar>
    )
}