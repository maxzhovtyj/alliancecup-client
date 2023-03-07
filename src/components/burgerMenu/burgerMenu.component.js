import {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useBurgerContext} from "../../context/BurgerContext";

import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import {IconButton} from "@mui/material";
import {AllianceTextField} from "../../UI/styles";

import classes from "./burgerMenu.module.scss"

const BurgerMenuComponent = () => {
    const {showBurger, toggleBurger} = useBurgerContext()
    const [search, setSearch] = useState("")
    const [dropDownSearchbar, setDropDownSearchbar] = useState(false)
    const navigate = useNavigate()

    const onNavigation = (path) => {
        return (e) => {
            e.preventDefault()
            toggleBurger()
            navigate(path)
        }
    }

    const handleValue = (event) => {
        setSearch(event.target.value)
    }

    const toggleDropDown = () => {
        setDropDownSearchbar(prevState => !prevState)
    }

    const HandleSearchBtn = () => {
        if (!dropDownSearchbar) {
            return (
                <IconButton onClick={toggleDropDown}>
                    <SearchIcon style={{color: "black"}}/>
                </IconButton>
            );
        }

        return (
            <IconButton onClick={toggleDropDown}>
                <CloseIcon style={{color: "black"}}/>
            </IconButton>
        )
    }

    return (
        <div className={[classes.burgerContainer, (showBurger) ? classes.isActive : ""].join(" ")}>
            {
                dropDownSearchbar
                    ?
                    <form className={classes.searchBar} onSubmit={onNavigation(`/products?search=${search}`)}>
                        <AllianceTextField value={search} onChange={handleValue} className={classes.searchBarInput}/>
                    </form>
                    : ""
            }
            <ul className={classes.sidebarList}>
                <div className={classes.searchIconBtn}>
                    <HandleSearchBtn/>
                </div>
                <li className={classes.sidebarItem} onClick={onNavigation("/categories")}>
                    Каталог
                </li>
                <li className={classes.sidebarItem} onClick={onNavigation("/user")}>
                    Кабінет
                </li>
                <li className={classes.sidebarItem} onClick={onNavigation("/about-us")}>
                    Про нас
                </li>
                <li className={classes.sidebarItem} onClick={onNavigation("/delivery")}>
                    Доставка
                </li>
                <li className={classes.sidebarItem} onClick={onNavigation("/contacts")}>
                    Контакти
                </li>
                <li className={classes.sidebarItem} onClick={onNavigation("/for-wholesalers")}>
                    Для оптовиків
                </li>
            </ul>
        </div>
    );
};

export default BurgerMenuComponent;
