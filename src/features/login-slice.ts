import { createSlice } from "@reduxjs/toolkit";

interface Initial {
    loginStatus: boolean,
    token: string | null;
};

interface Status {
    payload: Initial
}

const initialState: Initial = {
    loginStatus: false,
    token: null,
};

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        appLogin: (state, action: Status) => {
            state.loginStatus = action.payload.loginStatus;
            state.token = action.payload.token;
        },

    }
})

export const { appLogin } = loginSlice.actions;