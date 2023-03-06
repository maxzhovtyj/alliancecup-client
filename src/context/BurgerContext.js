import {createContext, useContext} from "react";
function noop() {}
const noopCallback = (prevState) => (prevState)

export const useBurgerContext = () => {
    return useContext(BurgerContext)
}

export const BurgerContext = createContext({
    showBurger: false,
    toggleBurger: noop(),
    setShowBurger: noopCallback,
})
