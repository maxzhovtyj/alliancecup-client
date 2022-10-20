import {useState, useCallback, useEffect} from 'react'
import {storageName} from "../http/http";

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(null)
    const [userRoleId, setUserRoleId] = useState(null)

    const login = useCallback((jwtToken, id, roleId) => {
        setToken(jwtToken)
        setUserId(id)
        setUserRoleId(roleId)

        localStorage.setItem(storageName, JSON.stringify({
            userId: id,
            userRoleId: roleId,
            token: jwtToken,
        }))
    }, [])


    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)
        setUserRoleId(null)

        localStorage.removeItem(storageName)
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))

        if (data && data.token) {
            login(data.token, data.userId, data.userRoleId)
        }
    }, [login])


    return { login, logout, token, userId, userRoleId }
}