import ProductItem from "./productItem";
import AllianceButton from "../../../UI/allianceCupButton/allianceButton";

import classes from "./products.module.scss";
import CircularIndeterminate from "../../../UI/CircularProgress";

function ProductsListComponent({products, setMessage, handleClick, cannotLoadMore, loadMore, isLoading}) {
    if (isLoading) {
        return <CircularIndeterminate/>
    }

    if (!products) {
        return <div className={classes.noItemsTitle}>Товарів не знайдено</div>
    } else return (
        <div>
            <div className={classes.productsList}>
                {
                    products.map(
                        item => <ProductItem
                            key={item.article}
                            product={item}
                            setMessage={setMessage}
                            handleClick={handleClick}
                        />
                    )
                }
            </div>
            <div className={classes.productsListLoadMoreBtn}>
                {
                    cannotLoadMore
                        ? ""
                        :
                        <AllianceButton onClick={loadMore}>
                            Завантажити ще
                        </AllianceButton>
                }
            </div>
        </div>
    );
}

export default ProductsListComponent;
