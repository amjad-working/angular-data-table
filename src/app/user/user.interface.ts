export interface IUser {
    id: number;
    user: string;
    language: string;
    gameOfChoice: string;
    totalRevenue: number;
    added: string;
    trend: string;
    lastUpdate: string;
}

export interface ISOption { // Interface for select option
    label: string,
    value: string
}