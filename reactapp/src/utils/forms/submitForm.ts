export async function submitPostForm(postURL: string, jsonObject: string, successCalback: () => void) {
    const response = await fetch(postURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: jsonObject,
    });
    if (response.ok) {
        successCalback()
    }
}


export async function submitPutForm<T extends object>(tableURL: string, data: T, successCalback: () => void) {
    const bodyData = parseUpdateDTO(data)
    const token = localStorage.getItem("token")
    const response = await fetch(`${tableURL}/update`, {
        method: "PUT",
        headers: { 
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(bodyData),
    });

    if (response.ok) {
        successCalback()
    }
};