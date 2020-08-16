export interface Result {
    success: boolean;
    data: {} | undefined;
}

export interface ResultId {
    success: boolean;
    data: {} | undefined;
    id: string;
}

//Interface used to parse result obtained from POST - create request
export interface ResultSetHeader {
    fieldCount: number,
    affectedRows: number,
    insertId: number,
    info: string,
    serverStatus: number,
    warningStatus: number
}