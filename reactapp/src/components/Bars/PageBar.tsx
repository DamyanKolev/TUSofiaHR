import { Bar, Button, ButtonDesign, Title, TitleLevel } from "@ui5/webcomponents-react";
import { FC, Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "@ui5/webcomponents-icons/nav-back"

interface PageBarProps {
    title?: string
}


const PageBar: FC<PageBarProps> = ({ title }) => {
    const navigate = useNavigate();
    const location = useLocation();

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
        <div className="table-header-bar">
            <Bar
                startContent={
                    <Fragment>
                        <Button
                            design={ButtonDesign.Transparent}
                            icon="nav-back"
                            onClick={() => navigate(getNavBackURL())}
                        />
                        <Title level={TitleLevel.H2}>{title}</Title>
                    </Fragment>
                }
            >
            </Bar>
        </div>
    )
}


export default PageBar