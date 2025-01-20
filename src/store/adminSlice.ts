import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AdminState } from "../interfaces/adminInterface";

const initialState: AdminState ={
    ...({} as AdminState)
}

export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setAdminFromServer: (state, action: PayloadAction<AdminState> ) => {
            return {...state, ...action.payload}
        },
    }
});

export const {setAdminFromServer} = adminSlice.actions;
export default adminSlice.reducer;