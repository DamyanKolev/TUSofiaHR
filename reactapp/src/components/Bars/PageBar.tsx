import { Bar, Button, ButtonDesign, Title, TitleLevel } from "@ui5/webcomponents-react";
import { FC, Fragment, ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface PageBarProps {
    title?: string
    url?: string,
    children?: ReactNode,
}


const PageBar: FC<PageBarProps> = ({ title, url, children }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const getNavBackURL = (): string => {
        const url = location.pathname;
        const lastIndex = url.lastIndexOf("/");
        const newURL = url.slice(0, lastIndex)

        if (newURL) {
            return newURL;
        }
        return "/"
    }

    return (
        <Bar
            startContent={
                <Fragment>
                    <Button
                        className="table-header-bar"
                        design={ButtonDesign.Transparent}
                        icon="nav-back"
                        onClick={() => navigate(url? url : getNavBackURL())}
                    />
                    <Title level={TitleLevel.H3}>{title}</Title>
                </Fragment>
            }
        >
            {children}
        </Bar>
    )
}


export default PageBar