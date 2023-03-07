import React from 'react';

import classes from "./contacts.module.scss"

function ContactsComponent() {
    return (
        <div className={classes.contactsContainer}>
            <div>
                <ul>
                    <li><p>м.Рівне</p></li>
                    <li><p>+38 (096) 612-15-16</p></li>
                    <li><p>allince.cup.ua@gmail.com</p></li>
                </ul>
            </div>
            <div>
                <p>Графік роботи:</p>
                <p>Пн - Пт: з 9.00 до 18.00</p>
                <p>Сб - Нд: вихідні</p>
            </div>
        </div>
    );
}

export default ContactsComponent;
