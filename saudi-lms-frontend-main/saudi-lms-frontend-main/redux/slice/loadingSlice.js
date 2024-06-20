import { createSlice } from "@reduxjs/toolkit";

export const loadingSlice = createSlice({
    name: 'loading',
    initialState: {
        loader: "none"
    },
    reducers: {
        ShowLoader: (state) => {
            state.loader = ""
        },
        HideLoader: (state) => {
            state.loader = "none"
        }
    }
})
export const { ShowLoader, HideLoader } = loadingSlice.actions;
export default loadingSlice.reducer;
