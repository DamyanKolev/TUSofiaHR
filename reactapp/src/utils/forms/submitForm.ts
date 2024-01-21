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


export async function submitPutForm(tableURL: string, jsonObject: string, successCalback: () => void) {
    const response = await fetch(`${tableURL}/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: jsonObject,
    });

    if (response.ok) {
        successCalback()
    }
};