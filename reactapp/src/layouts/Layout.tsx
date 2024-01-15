import { FC, useState } from 'react';
import './Layout.css';
import { Outlet } from 'react-router-dom';
import '@ui5/webcomponents-icons/dist/menu';
import ShellBarMenu from '../components/Bars/ShellBarMenu';
import NavBar from '../components/Bars/NavBar';


const Layout: FC = () => {
    const [collapsed, setCollapsed] = useState<boolean>(true);
    // const navigate = useNavigate();

    //useEffect(() => {
    //    const token = localStorage.getItem("token")

    //    fetch("/backend/api/auth/validate-token", {
    //        method: "POST",
    //        headers: { "Content-Type": "application/json" },
    //        body: JSON.stringify(token)
    //    }).then(response => {
    //        if (response.ok) {
    //            navigate("/")
    //        }
    //        else {
    //            navigate("/login")
    //        }
    //    })
    //}, [])

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