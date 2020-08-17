export interface User {
    id?: number,
    name: string,
    last_name: string,
    age: number,
    gender?: boolean,
    mail: string,
    password: string,
    username: string,
    birthday: string,
    height?: number,
    weight?: number,
    rol_id?: number
}

const Roles = {
    'ADMIN': 1,
    'USER': 2
}

export { Roles }