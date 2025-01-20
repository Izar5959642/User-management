export interface AdminState{
    _id?: string;
    username?: string;
    fullName?: string;
    email?: string;
    password: string;
    createdAt?: string;
    token?: string | null;
}
