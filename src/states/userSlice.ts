import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserState } from '../types/auth.types';

const initialState: UserState = {
    currentUser: null,
    loading: false,
    error: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
        },
        signInSuccess: (state, action: PayloadAction<User>) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = false;
        },
        signInFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateUserStart: (state) => {
            state.loading = true;
        },
        updateUserSuccess: (state, action: PayloadAction<User>) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = false;
        },
        updateUserFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        signOut: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = false;
        },
    },
});

export const {
    signInStart,
    signInSuccess,
    signInFailure,
    updateUserFailure,
    updateUserStart,
    updateUserSuccess,
    signOut,
} = userSlice.actions;

export default userSlice.reducer;
