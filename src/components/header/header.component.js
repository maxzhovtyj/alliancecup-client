import {useAuthContext} from "../../context/AuthContext";
import {useBurgerContext} from "../../context/BurgerContext";

import tgIcon from '../../assets/social/Telegram.svg'
import instIcon from '../../assets/social/Instagram.svg'
import vbIcon from '../../assets/social/Viber.svg'
import pin from '../../assets/svgs/pin.svg'
import cart from '../../assets/svgs/Bag.svg'
import user from '../../assets/svgs/profile.svg'
import star from '../../assets/svgs/star-24.svg'

import {Link, useNavigate} from "react-router-dom";
import AuthDialogs from "./authDialogs";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from '@mui/icons-material/Close';
import {IconButton} from "@mui/material";

import classes from './header.module.scss'

function HeaderComponent() {
    const {isAuth} = useAuthContext()
    const {showBurger, setShowBurger, toggleBurger} = useBurgerContext()

    const navigate = useNavigate()

    const handleNavigate = (link) => {
        return () => {
            setShowBurger(false)
            navigate(link)
        }
    }

    const BurgerIconButton = () => {
        if (!showBurger) {
            return (
                <IconButton onClick={toggleBurger} className={classes.burgerMenuBtn}>
                    <MenuIcon style={{color: "white"}}/>
                </IconButton>
            );
        }

        return (
            <IconButton onClick={toggleBurger} className={classes.burgerMenuBtn}>
                <CloseIcon style={{color: "white"}}/>
            </IconButton>
        )
    }

    return (
        <>
            <div className={classes.topBar}>
                <div className={classes.topBarInfo}>
                    <ul className={classes.socials}>
                        <li>
                            <a href={"https://www.instagram.com/alliance_cup/"} target={"_blank"} rel="noreferrer">
                                <img src={instIcon} alt="inst"/>
                            </a>
                        </li>
                        <li>
                            <a href={"https://www.instagram.com/alliance_cup/"} target={"_blank"} rel="noreferrer">
                                <img src={tgIcon} alt="tg"/>
                            </a>
                        </li>
                        <li>
                            <a href={"https://www.instagram.com/alliance_cup/"} target={"_blank"} rel="noreferrer">
                                <img src={vbIcon} alt="vb"/>
                            </a><
                        /li>
                    </ul>
                    <div className={classes.topBarAuth}>
                        <AuthDialogs/>
                    </div>
                </div>
                <div className={classes.authMenu}>
                    {
                        isAuth ?
                            <Link to={"/user"}>
                                <div className={classes.topItem}>
                                    <img src={user} alt="user"/>
                                    <span>Кабінет</span>
                                </div>
                            </Link>
                            :
                            <AuthDialogs/>
                    }
                </div>
                <BurgerIconButton/>
            </div>
            <header className={classes.headerWrapper}>
                <ul className={classes.headerList}>
                    <li className={classes.logo}>
                        <span onClick={handleNavigate("/")}>AllianceCup</span>
                    </li>
                    <li className={classes.slogan}>
                        <span>Надійний постачальник <br/> для вашого бізнесу</span>
                    </li>
                    <li className={classes.contactInfo}>
                        <span><img src={pin} alt="pin"/>м.Рівне</span>
                        <span>+38 (096) 612-15-16</span>
                        <span>allince.cup.ua@gmail.com</span>
                    </li>
                    <li className={classes.cart}>
                        <span onClick={handleNavigate("/cart")}>
                            <img src={cart} alt="cart"/>
                            Кошик
                        </span>
                    </li>
                    <li className={classes.favourites}>
                        <span onClick={handleNavigate("/favourites")}>
                            <img src={star} alt="star"/>
                            Обрані
                        </span>
                    </li>
                </ul>
            </header>
        </>
    );
}

export default HeaderComponent;
