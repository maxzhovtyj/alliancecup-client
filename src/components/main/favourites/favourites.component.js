import {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useSnackbarContext} from "../../../context/SnackbarContext";

import {fetchFavourites} from "../../../redux/userFavouritesRedux/favouritesFetch";
import ProductItem from "../products/productItem";

import classes from './favourites.module.scss'

function FavouritesComponent() {
    const dispatch = useDispatch()
    const favouritesList = useSelector(state => state.favouritesPage.favouritesList)

    const snackbar = useSnackbarContext()

    useEffect(() => {
        dispatch(fetchFavourites())
    }, [dispatch])

    return (
        <div className={classes.favouriteWrapper}>
            <h1 className={classes.pageTitle}>Обрані товари</h1>
            <div className={classes.favouriteList}>
                {
                    favouritesList?.length !== 0
                        ?
                        favouritesList.map(
                            item => <ProductItem
                                product={item}
                                setMessage={snackbar.setMessage}
                                handleClick={snackbar.handleClick}
                                key={item.article}
                                deleteFavourite
                            />
                        )
                        : <p className={classes.emptyTitle}>Товари в обраному відсутні</p>
                }
            </div>
        </div>
    );
}

export default FavouritesComponent;
