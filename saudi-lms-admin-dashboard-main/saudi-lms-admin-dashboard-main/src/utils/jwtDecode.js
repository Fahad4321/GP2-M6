import jwt_decode from "jwt-decode";
export const jwtDecode = (token) => {
  if (token) {
    const tokenDecoded = jwt_decode(token);
    const expTime = new Date(tokenDecoded.exp * 1000);
    if (new Date() > expTime) {
      return null;
    }
    return tokenDecoded;
  }
};
