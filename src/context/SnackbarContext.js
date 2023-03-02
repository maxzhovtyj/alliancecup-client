import {createContext, useContext} from "react";
function noop() {}
const noopCallback = (prevState) => (prevState)

export const useSnackbarContext = () => {
    return useContext(SnackbarContext)
}

export const SnackbarContext = createContext({
    setMessage: noopCallback,
    handleClick: noop,
})
