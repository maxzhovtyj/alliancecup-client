import {useState} from "react";

const useBurgerMenu = () => {
    const [showBurger, setShowBurger] = useState(false)

    function toggleBurger() {
        setShowBurger(prevState => !prevState)
    }

    return {showBurger, setShowBurger, toggleBurger}
}

export default useBurgerMenu
