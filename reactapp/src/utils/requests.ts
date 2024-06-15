

export async function getUpdateData<T extends object, D>(data: D, postURL: string): Promise<T> {
    const token = sessionStorage.getItem("accessToken")
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
        return json.data
    }
    else {
        throw Error(json.errors)
    }
}



export async function getRequest<T>(postURL: string): Promise<T> {
    const token = sessionStorage.getItem("accessToken")
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
        throw Error(json.errors)
    }
}



export async function postGetRequest(reqURL: string, bodyData: string, successCalback: () => void) {
    const token = sessionStorage.getItem("accessToken")
    const response = await fetch(reqURL, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
        body: bodyData,
    })
    const json = await response.json()

    if (response.ok) {
        successCalback()
        return json.data
    }
    else {
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
    else {
        const json = await response.json()
        throw Error(json.errors)
    }
};





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
        const json = await response.json()
        console.log(json)
        successCalback()
    }
    else {
        const json = await response.json()
        console.log(json)
        throw Error(json.errors)
    }
}


