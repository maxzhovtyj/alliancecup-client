import {useState} from "react";

const useBurgerMenu = () => {
    const [toggleBurger, setToggleBurger] = useState(false)

    function handleToggleBurger() {
        setToggleBurger(prevState => !prevState)
    }

    return {toggleBurger, handleToggleBurger}
}

export default useBurgerMenu
