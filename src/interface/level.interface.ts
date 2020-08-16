import Base from "./base.interface";
import { Result } from "../model/result";

export interface Levels extends Base {
    getByFrequencyValue(frequency: number): Promise<Result>
}