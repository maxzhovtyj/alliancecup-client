import {Link} from "react-router-dom";
import classes from './navbar.module.scss'

function NavbarComponent() {
    return (
        <nav>
            <div className={classes.navWrapper}>
                <div className={classes.list}>
                    <div className={classes.catalogItem}>
                        <Link to="/categories">
                            <span className={classes.listItem}>Каталог</span>
                        </Link>
                    </div>
                    <div className={classes.navInfoWrapper}>
                        <div className={classes.listItem}>
                            <Link to="/about-us">Про нас</Link>
                        </div>
                        <div className={classes.listItem}>
                            <Link to="/delivery">Доставка</Link>
                        </div>
                        <div className={classes.listItem}>
                            <Link to="/contacts">Контакти</Link>
                        </div>
                        <div className={classes.listItem}>
                            <Link to="/for-wholesalers">Для оптовиків</Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavbarComponent;