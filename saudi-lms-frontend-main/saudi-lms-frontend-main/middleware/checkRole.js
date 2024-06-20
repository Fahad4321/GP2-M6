import {store} from "../redux/store.js";

export const checkRole = (permission)=>{
    const auth = store.getState().auth;
    /*if (auth.currentUser?.role?.name === 'superadmin'){
        return true
    }*/
    // console.log('auth', auth)

    // return permissionArray.some(item => item.name === permission);
    return auth.currentUser?.role?.name === permission
}