export interface LoginRequest {
    username: string;
    password: string;
}

export const defaultLoginRequest: LoginRequest = {
    username: "",
    password: ""
};