import React, {useContext, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchFavourites} from "../../../redux/userFavouritesRedux/favouritesFetch";
import ProductItemComponent from "../categories/products/productItem.component";
import {useSnackbar} from "../../../hooks/useSnackbar";

import classes from './favourites.module.scss'
import {AuthContext} from "../../../context/AuthContext";

function FavouritesComponent(props) {
    const {isAuth} = useContext(AuthContext)

    const dispatch = useDispatch()
    const favouritesList = useSelector(state => state.favouritesPage.favouritesList)

    const {setMessage, handleClick} = useSnackbar()
    useEffect(() => {
        dispatch(fetchFavourites(isAuth))
    }, [dispatch, isAuth])
    return (
        <>
            <h1 className={classes.pageTitle}>Обрані товари</h1>
            <div className={classes.favouriteList}>
                {
                    favouritesList.length !== 0
                        ?
                        favouritesList.map(
                            item => <ProductItemComponent
                                product={item}
                                setMessage={setMessage}
                                handleClick={handleClick}
                                key={item.article}
                                deleteFavourite
                            />
                        )
                        : <p className={classes.emptyTitle}>Товари в обраному відсутні</p>
                }
            </div>
        </>
    );
}

export default FavouritesComponent;