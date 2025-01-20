
export interface User{
    _id?: string;
    username: string;
    fullName: string;
    email: string;
    password: string;
    createdAt?: string;
}

export interface UserList{
    users: User[];
}