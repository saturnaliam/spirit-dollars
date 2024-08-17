export interface Debt {
    id: string;
    debt: number;
};

export interface User {
    id: string;
    balance: number;
    debts: Debt[];
};