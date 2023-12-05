import { Bar, Button, ButtonDesign, Title, TitleLevel } from "@ui5/webcomponents-react";
import { useNavigate } from "react-router-dom";
import { FC, Fragment } from "react";




interface PageBarProps {
    title: string
}


const PageBar: FC<PageBarProps> = ({ title }) => {
    const navigate = useNavigate();

    return (
        <div className="table-header-bar">
            <Bar
                startContent={
                    <Fragment>
                        <Button
                            design={ButtonDesign.Transparent}
                            icon="nav-back"
                            onClick={() => navigate(-1)}
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