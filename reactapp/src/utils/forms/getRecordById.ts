import { Dispatch, SetStateAction } from "react";
import { setNullValuesToEmtyString } from "./setNullValuesToEmtyString";


export async function getRecordById<T extends object>(currentId: int, tableURL: string, setFormData: Dispatch<SetStateAction<T>>) {
    const response = await fetch(`${tableURL}/find-by-id`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentId),
    })
    const json = await response.json()

    if (response.ok) {
        const data = setNullValuesToEmtyString<T>(json.data)
        setFormData(data)
    }
    else {
        console.error(json.message)
    }
}
