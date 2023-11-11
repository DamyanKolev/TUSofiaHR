import './Table.css'
import { useEffect, useState } from "react";
import SmartTable from "../../components/SmartTable"
import { Bar, Button, FlexibleColumnLayout, InputType } from "@ui5/webcomponents-react";
import CreateEmployeeForm from '../../components/forms/create-forms/CreateEmployeeForm';



const data1 = 
    [
    {
        age: 80,
        friend: {
            age: 68,
            name: 'Carver Vance'
        },
        name: 'Allen Best',
        status: 'Success'
    },
    {
        age: 31,
        friend: {
            age: 70,
            name: 'Strickland Gallegos'
        },
        name: 'Combs Fleming',
        status: 'None'
    },
    {
        age: 57,
        friend: {
            age: 28,
            name: 'Velez Powell'
        },
        name: 'Gould Logan',
        status: 'Success'
    },
    {
        age: 27,
        friend: {
            age: 18,
            name: 'Ballard Talley'
        },
        name: 'Sally Garner',
        status: 'Warning'
    },
    {
        age: 74,
        friend: {
            age: 30,
            name: 'Cameron Reyes'
        },
        name: 'Esther Dillon',
        status: 'None'
    },
    {
        age: 84,
        friend: {
            age: 32,
            name: 'Booth Howard'
        },
        name: 'Sofia Crosby',
        status: 'Information'
    },
    {
        age: 75,
        friend: {
            age: 21,
            name: 'Jenifer James'
        },
        name: 'Sophie Keller',
        status: 'Error'
    },
            ]


export default function Employee() {

    return (
        <FlexibleColumnLayout
            startColumn={<div><StartColumn /></div>}
            midColumn={<div><MidColumn/></div>}
            endColumn={<div>erwewer</div>}
            layout="ThreeColumnsMidExpanded"
        />
    )
}


InputType

function StartColumn() {
    const [tableTitle] = useState("Employees");

    //const [data, setData] = useState({
    //    items: []
    //});

    //useEffect(() => {
    //    fetch("/api/employees")
    //        .then((response) => response.json())
    //        .then((data) => {
    //            setData(data);
    //        });
    //}, []);

    const tableProps = {
        data: data1,
        tableTitle
    };

    return (
        <div>
            <div className="table-header-bar">
                <Bar startContent={
                    <Button
                        design= "Transparent"
                        icon="nav-back"
                        onClick={() => window.location.href = "/api"}
                    >
                    </Button>
                }
                >
                </Bar>
            </div>
            <SmartTable props={tableProps} />
        </div>
    )
}


function MidColumn() {
    return (
        <div>
            <div className="table-header-bar">
                <Bar startContent={
                    <Button
                        design="Transparent"
                        icon="nav-back"
                        onClick={() => window.location.href = "/api"}
                    >
                    </Button>
                }
                >
                </Bar>
            </div>
            <CreateEmployeeForm/>
        </div>
    )
}