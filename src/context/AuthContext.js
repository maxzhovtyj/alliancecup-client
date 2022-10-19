import {createContext} from "react";
function noop() {}

export const AuthContext = createContext({
    token: null,
    userId: null,
    isAdmin: false,
    isModerator: false,
    isAuth: false,
    login: noop,
    logout: noop,
})