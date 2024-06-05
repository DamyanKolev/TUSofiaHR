export async function submitPostForm(postUrl: string, bodyData: string, successCalback: () => void) {
    const token = sessionStorage.getItem("accessToken")
    const response = await fetch(postUrl, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
        body: bodyData,
    });
    if (response.ok) {
        successCalback()
    }
    else {
        const json = await response.json()
        throw Error(json.message)
    }
}


export async function submitPutForm(tableURL: string, bodyData: string, successCalback: () => void) {
    const token = sessionStorage.getItem("accessToken")
    const response = await fetch(`${tableURL}/update`, {
        method: "PUT",
        headers: { 
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
        body: bodyData,
    });

    if (response.ok) {
        successCalback()
    }
};


export async function postRequest(reqURL: string, bodyData: string, successCalback: () => void) {
    const token = sessionStorage.getItem("accessToken")
    const response = await fetch(reqURL, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
        body: bodyData,
    })

    if (response.ok) {
        successCalback()
        const json = await response.json()
        return json.data
    }
    else {
        const json = await response.json()
        throw Error(json.message)
    }
}


export async function getRequest<T>(reqURL: string): Promise<T> {
        const token = sessionStorage.getItem("accessToken")
        const response = await fetch(reqURL, {
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
        throw Error(json.message)
    }
}