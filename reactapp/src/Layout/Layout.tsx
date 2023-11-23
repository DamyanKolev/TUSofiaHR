import { FC, useEffect, useState } from 'react';
import './Layout.css';
import NavBar from '../components/NavBar';
import { Outlet } from 'react-router-dom';
import '@ui5/webcomponents-icons/dist/menu';
import ShellBarMenu from '../components/ShellBarMenu';


const Layout: FC = () => {
    const [collapsed, setCollapsed] = useState<boolean>(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const isLoginString = localStorage.getItem("isLogin")

        if (isLoginString != null) {
            const isLogin = isLoginString.localeCompare("true") == 0 ? true : false

            if (isLogin && token != null) {

            }
            else {

            }
        }
    }, [])

    const hideShowSideNav = () => {
        setCollapsed(!collapsed);
    };

    return (
        <>
            <ShellBarMenu hideShowSideNav={hideShowSideNav} />

            <div className="container">
                <NavBar collapsed={collapsed} />

                <div className="content-container">
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default Layout;