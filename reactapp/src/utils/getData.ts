import { setNullValuesToEmtyString } from "./forms/formData";


export async function getUpdateData<T extends object, D>(data: D, postURL: string): Promise<T | null> {
    const token = localStorage.getItem("token")
    const response = await fetch(postURL, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
    })
    const json = await response.json()

    if (response.ok) {
        const data = setNullValuesToEmtyString<T>(json.data)
        return data
    }
    else {
        console.error(json.message)
        return null
    }
}



export async function getData<T>(postURL: string): Promise<T | null> {
    const token = localStorage.getItem("token")
    const response = await fetch(postURL, {
        method: "GET",
        headers: { 
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
    })
    const json = await response.json()

    if (response.ok) {
        return json.data
    }
    else {
        console.error(json.message)
        return null
    }
}