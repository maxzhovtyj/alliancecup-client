import ProductItem from "./productItem";
import AllianceButton from "../../../../UI/allianceCupButton/allianceButton";

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
            {
                cannotLoadMore
                    ? ""
                    :
                    <AllianceButton onClick={loadMore} mt={"1rem"}>
                        Завантажити ще
                    </AllianceButton>
            }
        </div>
    );
}

export default ProductsListComponent;