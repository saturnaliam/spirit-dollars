export interface Debt {
    id: number;
    debt: number;
};

export interface User {
    id: number;
    balance: number;
    debts: Debt[];
};