import { FC, useRef, useState } from 'react';
import { ActionSheet, Avatar, Button, Popover, PopoverDomRef, ShellBar } from "@ui5/webcomponents-react";
import "@ui5/webcomponents-icons/journey-arrive"
import { useNavigate, useLocation } from 'react-router-dom';
import HRProductSwitch from "@components/Menus/HRProductSwitch"
import { useAppDispatch, useAppSelector } from '@/store/storeHooks';
import { loginToggle } from '@/store/slices/loginSlice';

interface ShellBarMenuProps {
    hideShowSideNav: () => void;
}

const ShellBarMenu: FC<ShellBarMenuProps> = ({ hideShowSideNav }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isProfileClick, setIsProfileClick] = useState<boolean>(false)

    const onProfileClick = () => { 
        setIsProfileClick(true)        
    }

    const onLogoutClick = () => {
        const isLoggedIn = useAppSelector((state) => state.isLoggedIn.value)
        const dispatchIsLoggedIn = useAppDispatch()
        let rememberMe = localStorage.getItem("rememberMe")
        
        if (rememberMe != null) {
            rememberMe = JSON.parse(rememberMe)
            if (rememberMe) {
                localStorage.removeItem("refreshToken")
            }
        }
        else {
            sessionStorage.removeItem("refreshToken")
        }
        sessionStorage.removeItem("accessToken")
        

        if (isLoggedIn) {
            dispatchIsLoggedIn(loginToggle())
          }
        if (location.pathname != "/login") {
            navigate("/login")
        }
    }

    const popoverRef = useRef<PopoverDomRef>(null);
    const handleShellBarItemClick = (e: any) => {
      if (popoverRef.current != null) {
        popoverRef.current.showAt(e.detail.targetRef);
      }
    };

    return (
        <>
            <ShellBar
                onProductSwitchClick={handleShellBarItemClick}
                onProfileClick={onProfileClick}
                profile={
                    <Avatar
                        id="actionSheetOpener"
                        colorScheme="Accent6"
                        icon="employee"
                        shape="Circle"
                        size="XS"
                    />
                }
                showProductSwitch
            >
                <Button slot="startButton" icon="menu" onClick={hideShowSideNav} />
                {/* <ShellBarItem
                    count="3"
                    icon="add"
                    text="ShellBarItem" /> */}
            </ShellBar>

            

            <ActionSheet 
                open={isProfileClick} 
                opener="actionSheetOpener"
                placementType="Bottom"
                verticalAlign="Center"
                horizontalAlign="Center"
                hideArrow
                onAfterClose={() => setIsProfileClick(false)}
            >
                <Button icon='journey-arrive' onClick={onLogoutClick}>
                    Изход
                </Button>
            </ActionSheet>


            <Popover
                ref={popoverRef}
                placementType="Bottom"
                horizontalAlign="Center"
                verticalAlign="Center"
            >
                <HRProductSwitch/>
            </Popover>
        </>
    );
}

export default ShellBarMenu;