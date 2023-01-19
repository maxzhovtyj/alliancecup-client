import ProductItem from "./productItem";
import AllianceButton from "../../../UI/allianceCupButton/allianceButton";

import classes from "./products.module.scss";

function ProductsListComponent({products, setMessage, handleClick, cannotLoadMore, loadMore}) {
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