import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    state: false,
    userID: "",

}

export const playerInfoSlice = createSlice({
    name: 'playerInfo',
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userID = action.payload.userID;
        },
    }
})




export const {login} = playerInfoSlice.actions
export default playerInfoSlice.reducer