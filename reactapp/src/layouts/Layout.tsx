import { FC, Fragment, useState } from 'react';
import './Layout.css';
import { Outlet } from 'react-router-dom';
import '@ui5/webcomponents-icons/dist/menu';
import ShellBarMenu from '@components/Bars/ShellBarMenu';
import NavBar from '@components/Bars/NavBar';
import { FlexBox } from '@ui5/webcomponents-react';


const Layout: FC = () => {
    const [collapsed, setCollapsed] = useState<boolean>(true);

    const hideShowSideNav = () => {
        setCollapsed(!collapsed);
    };

    return (
        <Fragment key={'app.container'}>
            <ShellBarMenu hideShowSideNav={hideShowSideNav} />

            <FlexBox style={{height:"calc(100vh - 3.73rem)", marginBlockStart: ".5rem", gap: ".5rem"}}>
                <NavBar collapsed={collapsed} />
                <div className='content-container'>
                    <Outlet/> 
                </div>  
            </FlexBox>
        </Fragment>
    );
};

export default Layout;