export interface User {
    id?: number,
    name: string,
    last_name: string,
    second_last_name: string,
    address?: string,
    phone?: string,
    gender?: boolean,
    birthday?: string,
    mail: string,
    status?: string,
    password: string,
    username: string,
    image_url?: string,
    department_id?: number,
    province_id?: number,
    district_id?: number,
    rol_id?: number
}