export interface LoginDTO {
    usernameOrEmail: string;
    password: string;
    rememberMe: boolean,
}

export const defaultLoginDTO: LoginDTO = {
    usernameOrEmail: "",
    password: "",
    rememberMe: false,
};