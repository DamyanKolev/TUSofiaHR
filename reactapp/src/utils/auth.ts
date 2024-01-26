export async function isJWTTokenValid(): Promise<boolean> {
    const token = localStorage.getItem("token")

    if(token != null) {
        const response = await fetch("/backend/api/auth/validate-token",{
            method: "POST",
            headers: { 
                "Content-Type": "application/json" 
            },
            body: JSON.stringify(token),
        })

        if(response.ok) {
            return await response.json()
        }
    }
    return false
}