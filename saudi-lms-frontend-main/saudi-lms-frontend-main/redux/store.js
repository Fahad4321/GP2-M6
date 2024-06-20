import { configureStore } from '@reduxjs/toolkit'
import { ShowLoader, HideLoader } from './slice/loadingSlice'
import loadingSlice from './slice/loadingSlice';
import authReducer from './slice/auth-slice';

const store = configureStore({
    reducer: {
        loader : loadingSlice,
        auth: authReducer,
    },
})


export {
    store,
    ShowLoader,
    HideLoader,
}