import { UserData } from './user-data.interface';

export interface UserFullData{
    errortext: string;
    token: string;
    result: string;
    result_code: number;
    user: UserData;
}