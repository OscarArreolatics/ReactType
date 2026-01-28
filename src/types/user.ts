export interface UserCoI {
    _id: string;
    name: string;
    email: string;
    role: string;
    status: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface UserCoIParams {
    name: string;
    email: string;
    password: string;
    role: string;
}