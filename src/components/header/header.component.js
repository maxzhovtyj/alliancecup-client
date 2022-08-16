import React from 'react';

import classes from './header.module.scss'

import tgIcon from '../../assets/social/telegram-icon.svg'
import instIcon from '../../assets/social/instagram-icon.svg'
import vbIcon from '../../assets/social/viber-icon.svg'
import pin from '../../assets/svgs/pin.svg'
import cart from '../../assets/svgs/Bag.svg'
import user from '../../assets/svgs/user.svg'

import {Link} from "react-router-dom";
import AuthDialogs from "../../UI/authDialogs/authDialogs";


function HeaderComponent() {
    let isAuth = false

    return (
        <header className={classes.headerWrapper}>
            <ul className={classes.container}>
                <li className={classes.logo}>
                    <Link to="/">
                        <span>AllianceCup</span>
                    </Link>
                </li>
                <li className={classes.socials}>
                    <a href="https://www.instagram.com/alliance_cup/">
                        <img src={instIcon} alt="INST-icon"/>
                    </a>

                    <a href="https://www.instagram.com/alliance_cup/">
                        <img src={tgIcon} alt="TG-icon"/>
                    </a>

                    <a href="https://www.instagram.com/alliance_cup/">
                        <img src={vbIcon} alt="VB-icon"/>
                    </a>
                </li>
                <li className={classes.contactInfo}>
                    <span><img src={pin} alt="pin"/>м.Рівне</span>
                    <span>+38(096) 612-15-16</span>
                    <span>allince.cup.ua@gmail.com</span>
                </li>
                <li className={classes.cart}>
                    <Link to={"/cart"}>
                        <span><img src={cart} alt="pin"/>Кошик</span>
                    </Link>
                </li>
                <li className={classes.auth}>
                    { isAuth ?
                        <Link to={"/user"}>
                            <span><img src={user} alt="pin"/>Кабінет</span>
                        </Link>
                        :
                        <AuthDialogs/>}
                </li>
            </ul>
        </header>
    );
}

export default HeaderComponent;