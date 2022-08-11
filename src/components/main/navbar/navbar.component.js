import React from 'react';
import {Link} from "react-router-dom";
import './navbar.scss'

function NavbarComponent(props) {
    return (
        <nav>
            <div className="navWrapper">
                <ul className="list">
                    <li className="listItem">
                        <Link to="#">Каталог</Link>
                    </li>
                    <li className="listItem">
                        <Link to="#">Доставка</Link>
                    </li>
                    <li className="listItem">
                        <Link to="#">Контакти</Link>
                    </li>
                    <li className="listItem">
                        <Link to="#">Для оптовиків</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default NavbarComponent;