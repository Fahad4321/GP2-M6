import {createSlice} from "@reduxjs/toolkit";
import {jwtDecode} from "../../helper/jwtDecode.js";
import {getToken, setToken} from "../../helper/sessionStorage";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        currentUser: jwtDecode(getToken()),
    },
    reducers: {
        setAuth: (state, action)=>{
            setToken(action.payload)
        },
    }
});

export const {setAuth} = authSlice.actions;
export default authSlice.reducer