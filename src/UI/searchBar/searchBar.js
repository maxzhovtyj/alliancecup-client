import React from 'react';
import classes from './searchBar.module.scss';
import {Button} from "@mui/material";
import {AllianceTextField} from "../styles";

function SearchBar({value, setValue, onSearch}) {
    const handleValue = (event) => {
        setValue(event.target.value)
    }

    return (
        <form className={classes.searchBar}>
            <AllianceTextField value={value} onChange={handleValue} className={classes.searchBarInput}/>
            <Button type={"submit"} onSubmit={onSearch} onClick={onSearch} variant={"text"}>Search</Button>
        </form>
    );
}

export default SearchBar;