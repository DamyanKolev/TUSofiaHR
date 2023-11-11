import { useEffect, useState } from "react";
import SmartTable from "../../components/SmartTable"



export default function Contract() {
    const [tableTitle] = useState("Contracts");
    const [data, setData] = useState({
        items: []
    });

    useEffect(() => {
        fetch("/api/contracts")
            .then((response) => response.json())
            .then((data) => {
                setData(data);
            });
    }, []);

    const tableProps = {
        data,
        tableTitle
    };

    return (
        <div>
            <SmartTable props={tableProps} />
        </div>
    )
}