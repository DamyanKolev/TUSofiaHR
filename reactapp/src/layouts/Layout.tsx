import { FC, useState } from 'react';
import './Layout.css';
import { Outlet } from 'react-router-dom';
import '@ui5/webcomponents-icons/dist/menu';
import ShellBarMenu from '../components/Bars/ShellBarMenu';
import NavBar from '../components/Bars/NavBar';
import { FlexBox } from '@ui5/webcomponents-react';


const Layout: FC = () => {
    const [collapsed, setCollapsed] = useState<boolean>(true);
    const [width, setWidth] = useState<string>('calc(100vw - 5.21rem)');

    const hideShowSideNav = () => {
        setCollapsed(!collapsed);
        if (collapsed) {
            setWidth('calc(100vw - 17.71rem)')
        }
        else {
            setWidth('calc(100vw - 5.21rem)')
        }
    };

    return (
        <>
            <ShellBarMenu hideShowSideNav={hideShowSideNav} />

            <FlexBox style={{height:"calc(100vh - 3.25rem)"}}>
                <NavBar collapsed={collapsed} />
                <div className="content-container" style={{width:`${width}`}}>
                    <Outlet/> 
                </div>  
            </FlexBox>
        </>
    );
};

export default Layout;