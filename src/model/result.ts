import { ResultSetHeader as MySqlResHeader } from 'mysql2'

export interface Result {
    success: boolean;
    data: {} | undefined;
}

export interface ResultId {
    success: boolean;
    data: {} | undefined;
    id: string;
}

//Interface used to parse result obtained from POST - create and PUT - update requests
export interface ResultSetHeader extends MySqlResHeader {
    changedRows?: number,
}