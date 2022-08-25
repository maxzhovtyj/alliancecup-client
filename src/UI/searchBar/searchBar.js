import React, {useState} from 'react';
import classes from "../../components/main/categories/products/products.module.scss";
import {Button} from "@mui/material";
import {AllianceTextField} from "../styles";

function SearchBar(props) {
    const [searchBar, setSearchBar] = useState("")

    function handleSearchBar(event) {
        setSearchBar(event.target.value)
    }

    function search(e) {
        e.preventDefault()
    }

    return (
        <form className={classes.searchBar}>
            <AllianceTextField value={searchBar} onChange={handleSearchBar} className={classes.searchBarInput}/>
            <Button type={"submit"} onSubmit={search} onClick={search} variant={"text"}>Search</Button>
        </form>
    );
}

export default SearchBar;