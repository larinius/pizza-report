import { createSlice } from "@reduxjs/toolkit";

export interface AppState {}

const initialState: AppState = {};

export const appSlice = createSlice({
  initialState,
  name: "app",
  reducers: {},
});

export default appSlice.reducer;
