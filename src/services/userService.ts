import baseService from "./baseService";
import { User } from "../interfaces/userInterface";

export interface Data {
    username : string,
    password: string,
}

export const getUserList = async () => {
    return await baseService('/api/users',"get");
};

export const loginService = async (data : Data) => { 
    return await baseService('/api/auth/login',"post", data);
};

export const getUserById = async (id: string) => {
   return await baseService(`/api/users/${id}`, "get");
}

export const addNewUser = async (data: User) => {
    return  await baseService (`/api/users`,"post", data);
}

export const updateUser = async (data: User) => {
    return  await baseService (`/api/users/${data._id}`,"put", data);  
}

export const deleteUserById = async (id: string) => {
    return  await baseService(`/api/users/${id}`, "delete");   
}