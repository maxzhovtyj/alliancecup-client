import React from 'react';
import {Link} from "react-router-dom";
import './navbar.scss'

function NavbarComponent(props) {
    return (
        <nav>
            <div className="navWrapper">
                <ul className="list">
                    <li className="listItem">
                        <Link to="/categories">Каталог</Link>
                    </li>
                    <li className="listItem">
                        <Link to="/delivery">Доставка</Link>
                    </li>
                    <li className="listItem">
                        <Link to="/contacts">Контакти</Link>
                    </li>
                    <li className="listItem">
                        <Link to="/for-wholesalers">Для оптовиків</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default NavbarComponent;