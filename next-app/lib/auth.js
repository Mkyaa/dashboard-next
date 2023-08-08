//set cookies for authentication 
import { setCookie } from "nookies"

//check if user is authenticated by checking cookies
export const isAuth = (cookies) => {
    if (cookies.has("access_token")) {
        return true
    }
    return false
}

//add access token to cookies and set expiry date to 1 day for login
export const setAuthCookies = (cookies, token) => {
    setCookie(cookies, "access_token", token, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
    })
}