import { configureStore } from "@reduxjs/toolkit";
import { playerInfoSlice } from "./playerSlicer";

export const store = configureStore({
  reducer: playerInfoSlice.reducer
});