import ProductItem from "./productItem";
import AllianceButton from "../../../../UI/allianceCupButton/allianceButton";

import classes from "./products.module.scss";

function ProductsListComponent({products, setMessage, handleClick, cannotLoadMore, loadMore}) {
    return (
        <div>
            {
                !products
                    ?
                    <div className={classes.noItemsTitle}>Товарів не знайдено</div>
                    :
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
            }
        </div>
    );
}

export default ProductsListComponent;