import {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useSnackbar} from "../../../hooks/useSnackbar";

import {fetchFavourites} from "../../../redux/userFavouritesRedux/favouritesFetch";
import ProductItem from "../categories/products/productItem";

import classes from './favourites.module.scss'

function FavouritesComponent() {
    const dispatch = useDispatch()
    const favouritesList = useSelector(state => state.favouritesPage.favouritesList)

    const {setMessage, handleClick} = useSnackbar()

    useEffect(() => {
        dispatch(fetchFavourites())
    }, [dispatch])

    return (
        <div className={classes.favouriteWrapper}>
            <h1 className={classes.pageTitle}>Обрані товари</h1>
            <div className={classes.favouriteList}>
                {
                    favouritesList.length !== 0
                        ?
                        favouritesList.map(
                            item => <ProductItem
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
        </div>
    );
}

export default FavouritesComponent;