import {useCallback, useEffect, useState} from "react";

const storageName = 'userData'

export const useAuth = () => {
    const [accessToken, setAccessToken] = useState()


    const signIn = useCallback(() => {
        localStorage.setItem(storageName, accessToken)
    }, [])

    const logout = useCallback(() => {
        setAccessToken(null)
        localStorage.removeItem(storageName)
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))
    }, [])

    return {signIn, logout}
}