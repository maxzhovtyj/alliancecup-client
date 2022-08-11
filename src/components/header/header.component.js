import React from 'react';

import classes from './header.module.scss'

import tgIcon from '../../assets/social/telegram-icon.svg'
import instIcon from '../../assets/social/instagram-icon.svg'
import vbIcon from '../../assets/social/viber-icon.svg'
import pin from '../../assets/svgs/pin.svg'
import cart from '../../assets/svgs/Bag.svg'
import enter from '../../assets/svgs/enter.svg'
import {Link} from "react-router-dom";

// import user from '../../assets/svgs/user.svg'

function HeaderComponent(props) {
    return (
        <header className={classes.headerWrapper}>
            <ul className={classes.container}>
                <li className={classes.logo}><span>AllianceCup</span></li>
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
                    <Link to={"/"}>
                        <span><img src={cart} alt="pin"/>Кошик</span>
                    </Link>
                </li>
                <li className={classes.auth}>
                    <Link to={"/"}>
                        <span><img src={enter} alt="pin"/>Авторизація</span>
                    </Link>
                </li>
            </ul>

        </header>
    );
}

export default HeaderComponent;