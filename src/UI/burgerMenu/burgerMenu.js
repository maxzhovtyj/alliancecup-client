import {useContext, useState} from "react";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';

import classes from './burgerMenu.module.scss'
import {IconButton} from "@mui/material";
import {AuthContext} from "../../context/AuthContext";
import {NavLink} from "react-router-dom";

export default function BurgerMenu() {
    const {isAuth} = useContext(AuthContext)

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={classes.show}>
            <IconButton
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <MenuIcon style={{color: "white"}}/>

            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {
                    isAuth
                        ?
                        <MenuItem onClick={handleClose}>
                            <NavLink to="/user">Кабінет</NavLink>
                        </MenuItem>
                        : ""
                }
                <MenuItem onClick={handleClose}>
                    <NavLink to="/categories">Каталог</NavLink>
                </MenuItem>

                <MenuItem onClick={handleClose}>
                    <NavLink to="/about-us">Про нас</NavLink>
                </MenuItem>

                <MenuItem onClick={handleClose}>
                    <NavLink to="/delivery">Доставка</NavLink>
                </MenuItem>

                <MenuItem onClick={handleClose}>
                    <NavLink to="/contacts">Контакти</NavLink>
                </MenuItem>

                <MenuItem onClick={handleClose}>
                    <NavLink to="/for-wholesalers">Для оптовиків</NavLink>
                </MenuItem>

                <MenuItem onClick={handleClose}>
                    <NavLink to="/for-wholesalers">Відгуки</NavLink>
                </MenuItem>
            </Menu>
        </div>
    );
}
