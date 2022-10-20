import {createContext} from "react";
function noop() {}

export const AuthContext = createContext({
    token: null,
    userId: null,
    userRoleId: null,
    isAuth: false,
    login: noop,
    logout: noop,
})