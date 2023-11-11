import './Layout.css'
import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";
import "@ui5/webcomponents-icons/dist/menu";
import { useState } from "react";
import ShellBarMenu from "../components/ShellBarMenu";


export default function Layout() {

    const [collapsed, setCollapsed] = useState<Boolean>(true);

    const hideShowSideNav = () => {
        setCollapsed(!collapsed);
    };

    return (
        <>
            <ShellBarMenu hideShowSideNav={hideShowSideNav}/>

            <div className="container">
                <NavBar collapsed={collapsed} />

                <div className="content-container">
                    <Outlet />
                </div>

            </div>

        </>
    )
}

