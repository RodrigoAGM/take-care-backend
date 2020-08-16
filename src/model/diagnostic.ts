import { Frequency } from "./frequency";
import { Level } from "./level";

export interface Diagnostic {
    id?: number,
    user_id: number,
    level_id: number,
    frequency_id: number,
    frequency?: Frequency,
    level?: Level,
    date: string,
    description?: string
}