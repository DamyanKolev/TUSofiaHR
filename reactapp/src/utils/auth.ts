export async function isJWTTokenValid(): Promise<boolean> {
    const token = sessionStorage.getItem("accessToken")

    if(token != null) {
        const response = await fetch("/auth/validate-token",{
            method: "GET",
            headers: { 
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
        })

        if(response.ok) {
            return true
        }
        else if (response.status === 401) {
            return await refresAccessToken()
        }
    }
    return false
}


async function refresAccessToken() : Promise<boolean> {
    let rememberMe = localStorage.getItem("rememberMe")
    let refreshToken = sessionStorage.getItem("refreshToken")
    if (rememberMe != null) {
        rememberMe = JSON.parse(rememberMe)
        if (rememberMe) {
            refreshToken = localStorage.getItem("refreshToken")
        }
    }

    const response = await fetch("/auth/refresh-token",{
        method: "GET",
        headers: { 
            "Content-Type": "application/json",
            'Authorization': `Bearer ${refreshToken}`
        },
    })

    if(response.ok) {
        const result = await response.json()
        sessionStorage.setItem("accessToken", result.data.token);
        return true
    }
    else {
        return false
    }
}
