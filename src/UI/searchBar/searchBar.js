import React from 'react';
import classes from './searchBar.module.scss';
import {AllianceTextField} from "../styles";
import AllianceButton from "../allianceCupButton/allianceButton";

function SearchBar({value, setValue, onSearch}) {
    const handleValue = (event) => {
        setValue(event.target.value)
    }

    return (
        <form className={classes.searchBar} onSubmit={onSearch}>
            <AllianceTextField value={value} onChange={handleValue} className={classes.searchBarInput}/>
            <AllianceButton type={"submit"} onSubmit={onSearch} onClick={onSearch}
                            variant={"text"}>Search</AllianceButton>
        </form>
    );
}

export default SearchBar;