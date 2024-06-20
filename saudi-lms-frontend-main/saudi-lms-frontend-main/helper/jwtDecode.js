import jwt_decode from 'jwt-decode';
import {logOut} from "./sessionStorage";
export const jwtDecode = (token) =>{
   /* if (token){
        const tokenDecoded = jwt_decode(token);
        const expTime = new Date(tokenDecoded.exp*1000);
        if(new Date() > expTime){
            return null;
        }
        return tokenDecoded;
    }*/

    try {
        if (token) {
            const decodedToken = jwt_decode(token);
            const expTime = new Date(decodedToken.exp*1000);
            if(new Date() > expTime){
                logOut()
            }
            return decodedToken;
        }
    } catch (error) {
        logOut()
    }

}