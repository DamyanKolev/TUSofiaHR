import { parseObjectFields } from "@utils/parsers";

export async function submitPostForm<T extends object>(postUrl: string, data: T, successCalback: () => void) {
    const bodyData = parseObjectFields<T>(data)
    const token = sessionStorage.getItem("accessToken")
    const response = await fetch(postUrl, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(bodyData),
    });
    if (response.ok) {
        successCalback()
    }
    else {
        console.log(await response.json())
    }
}


export async function submitPutForm<T extends object>(tableURL: string, data: T, successCalback: () => void) {
    const token = sessionStorage.getItem("accessToken")
    const response = await fetch(`${tableURL}/update`, {
        method: "PUT",
        headers: { 
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
    });

    if (response.ok) {
        successCalback()
    }
};