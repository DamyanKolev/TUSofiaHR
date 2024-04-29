import { Company } from "../HR/Company";
import { AuthTokens } from "./AuthTokens";

export interface UserData
{
    company: Company
    tokens: AuthTokens
}