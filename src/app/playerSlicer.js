import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    fetchData: false
}

export const playerInfoSlice = createSlice({
    name: 'playerInfo',
    initialState,
    reducers: {
        fetchCartData: (state, action) => {
            state.fetchData = !state.fetchData;
        },
    }
})




export const {fetchCartData} = playerInfoSlice.actions
export default playerInfoSlice.reducer