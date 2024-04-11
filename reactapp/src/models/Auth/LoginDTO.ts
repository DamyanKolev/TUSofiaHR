export interface LoginDTO {
    username: string;
    password: string;
    rememberMe: boolean,
}

export const defaultLoginDTO: LoginDTO = {
    username: "",
    password: "",
    rememberMe: false,
};