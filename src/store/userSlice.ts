import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserList } from '../interfaces/userInterface';

const initialState: UserList = {
    users: [],
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUsers: (state, action: PayloadAction<User[]>) => {
            state.users = action.payload;
        },
        addUserStore(state, action: PayloadAction<User>){
            state.users.push(action.payload)
        },
        removeUserStore(state, action: PayloadAction<string>) {
            state.users = state.users.filter(user => user._id !== action.payload);
        },
        updateUserStore(state, action: PayloadAction<User>) {
            const index = state.users.findIndex(user => user._id === action.payload._id)
            if (index !== -1) {
                state.users[index] = action.payload;
            }
        },   
    }
});

export const {addUserStore, removeUserStore , updateUserStore, setUsers} =  userSlice.actions;
export default userSlice.reducer;