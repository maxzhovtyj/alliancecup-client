import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";

import SearchBar from "../../../UI/searchBar/searchBar";
import {IconButton} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

import classes from './navbar.module.scss'

function NavbarComponent() {
    const [dropDownSearchbar, setDropDownSearchbar] = useState(false)
    const [search, setSearch] = useState("")
    const navigate = useNavigate()

    const handleOnSearch = (e) => {
        e.preventDefault()
        navigate(`/products?search=${search}`)
    }

    const toggleDropDown = () => {
        setDropDownSearchbar(prevState => !prevState)
    }

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
                        <div className={classes.searchBarIconBtn}>
                            <IconButton onClick={toggleDropDown}>
                                <SearchIcon/>
                            </IconButton>
                        </div>
                    </div>
                </div>
                {
                    dropDownSearchbar
                        ? <SearchBar value={search} setValue={setSearch} onSearch={handleOnSearch}/>
                        : ""
                }
            </div>
        </nav>
    );
}

export default NavbarComponent;