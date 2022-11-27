import {useState, useCallback, useEffect} from 'react'
import {storageName} from "../http/http";

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(null)
    const [userRoleCode, setUserRoleCode] = useState(null)

    const login = useCallback((jwtToken, id, roleCode) => {
        setToken(jwtToken)
        setUserId(id)
        setUserRoleCode(roleCode)

        localStorage.setItem(storageName, JSON.stringify({
            userId: id,
            userRoleCode: roleCode,
            token: jwtToken,
        }))
    }, [])


    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)
        setUserRoleCode(null)

        localStorage.removeItem(storageName)
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))

        if (data && data.token) {
            login(data.token, data.userId, data.userRoleCode)
        }
    }, [login])


    return { login, logout, token, userId, userRoleCode }
}