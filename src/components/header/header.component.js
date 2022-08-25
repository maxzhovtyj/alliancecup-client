import React, {useContext} from 'react';

import classes from './header.module.scss'

import tgIcon from '../../assets/social/Telegram.svg'
import instIcon from '../../assets/social/Instagram.svg'
import vbIcon from '../../assets/social/Viber.svg'
import pin from '../../assets/svgs/pin.svg'
import cart from '../../assets/svgs/Bag.svg'
import user from '../../assets/svgs/profile.svg'
import star from '../../assets/svgs/star-24.svg'

import {Link} from "react-router-dom";
import AuthDialogs from "./authDialogs";
import {AuthContext} from "../../context/AuthContext";

function HeaderComponent() {
    const {isAuth} = useContext(AuthContext)

    return (
        <header className={classes.headerWrapper}>
            <div className={classes.container}>
                <div className={classes.topBar}>
                    <div>
                        <ul className={classes.socials}>
                            <li><a href={"google.com"}><img src={instIcon} alt="inst"/></a></li>
                            <li><a href={"google.com"}><img src={tgIcon} alt="tg"/></a></li>
                            <li><a href={"google.com"}><img src={vbIcon} alt="vb"/></a></li>
                        </ul>
                    </div>
                    <div>
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
                </div>
                <ul className={classes.headerList}>
                    <li className={classes.logo}>
                        <Link to="/">
                            <span>AllianceCup</span>
                        </Link>
                    </li>
                    <li className={classes.slogan}>
                        Якийсь дуже<br/>крутий слоган
                    </li>
                    <li className={classes.contactInfo}>
                        <span><img src={pin} alt="pin"/>м.Рівне</span>
                        <span>+38(096) 612-15-16</span>
                        <span>allince.cup.ua@gmail.com</span>
                    </li>
                    <li className={classes.cart}>
                        <Link to={"/cart"}>
                            <span><img src={cart} alt="cart"/>Кошик</span>
                        </Link>
                    </li>
                    <li className={classes.cart}>
                        <Link to={"/favourites"}>
                            <span><img src={star} alt="star"/>Обрані</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </header>
    );
}

export default HeaderComponent;