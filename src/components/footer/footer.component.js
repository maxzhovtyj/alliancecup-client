import React from 'react';

import instIcon from "../../assets/social/instagram-icon.svg";
import tgIcon from "../../assets/social/telegram-icon.svg";
import vbIcon from "../../assets/social/viber-icon.svg";
import copyright from "../../assets/svgs/copyright.svg"
import pin from "../../assets/svgs/pin.svg"
import phone from "../../assets/svgs/phone.svg"
import mail from "../../assets/svgs/mail.svg"


import classes from './footer.module.scss'

function FooterComponent() {
    return (<footer>
        <div className={classes.wrapper}>
            <div className={classes.generalInfo} >
                <p className={classes.logo}>AllianceCup</p>
                <p className={classes.text}>Продаж паперових<br/>стаканчиків<br/>і не тільки</p>
                <span className={classes.copyright}>
                    <img src={copyright} alt="copyright"/>
                    AllianceCup. All rights reserved
                </span>
                <ul className={classes.socials}>
                    <li>
                        <a href="https://www.instagram.com/alliance_cup/">
                            <img src={instIcon} alt="INST-icon"/>
                        </a>
                    </li>
                    <li>
                        <a href="https://www.instagram.com/alliance_cup/">
                            <img src={tgIcon} alt="TG-icon"/>
                        </a>
                    </li>
                    <li>
                        <a href="https://www.instagram.com/alliance_cup/">
                            <img src={vbIcon} alt="VB-icon"/>
                        </a>
                    </li>
                </ul>
            </div>
            <div className={classes.contactWrapper}>
                <ul className={classes.contactInfo}>
                    <li><p><img src={pin} alt="pin"/>м.Рівне</p></li>
                    <li><p><img src={phone} alt="phone"/>+38(096) 612-15-16</p></li>
                    <li><p><img src={mail} alt="mail"/>allince.cup.ua@gmail.com</p></li>
                </ul>
            </div>
            <div className={classes.schedule}>
                <p>Графік роботи:</p>
                <p>Пн - Пт: з 9.00 до 18.00</p>
                <p>Сб - Нд: вихідні</p>
            </div>
            <div className={classes.deliveryTown}>
                <p>Графік доставки по м.Рівне:</p>
                <p>Вівторок, Четвер, Субота</p>
            </div>
        </div>
    </footer>);
}

export default FooterComponent;