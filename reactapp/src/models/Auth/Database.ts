
export interface Database {
    id: int,
    companyName: string,
    companyEic: string,
}


export interface DatabaseDTO {
    companyName: string,
    companyEic: string,
    databaseName: string,
	dbPassword: string,
}

export const defaultDatabaseDTO: DatabaseDTO = {
    companyName: "",
    companyEic: "",
    databaseName: "",
	dbPassword: "",
}