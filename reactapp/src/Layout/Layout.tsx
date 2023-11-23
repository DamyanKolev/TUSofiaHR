import { FC, useEffect, useState } from 'react';
import './Layout.css';
import NavBar from '../components/NavBar';
import { Outlet, useNavigate } from 'react-router-dom';
import '@ui5/webcomponents-icons/dist/menu';
import ShellBarMenu from '../components/ShellBarMenu';


const Layout: FC = () => {
    const [collapsed, setCollapsed] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token")

        fetch("/api/auth/validate-token", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(token)
        }).then(response => {
            if (true) {

            }
            else {
                navigate("/")
            }
        })
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