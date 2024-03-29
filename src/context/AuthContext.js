import {createContext, useContext} from "react";
function noop() {}

export const AuthContext = createContext({
    token: null,
    userId: null,
    userRoleCode: null,
    isAuth: false,
    isAdmin: false,
    isModerator: false,
    login: noop,
    logout: noop,
})

export const useAuthContext = () => {
    return useContext(AuthContext)
}
