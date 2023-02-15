import classes from "../products.module.scss";
import RangeSliderComponent from "../rangeSlider.component";

function ProductsPageSidebar({
                                 rangePrice,
                                 onPriceRangeChange,
                                 onRangeCommitted,
                                 applyRangePrice,
                                 rangePriceForm,
                                 handlePriceRangeForm,
                                 getQueryParamMaxPrice,
                                 categories,
                                 handleSetCategoryId
                             }) {
    return (
        <div className={classes.sidebar}>
            <div className={classes.sidebarWrapper}>
                <div className={classes.sidebarContainer}>
                    <div className={classes.priceRange}>
                        <p className={classes.priceRangeTitle}>Ціна</p>
                        <RangeSliderComponent rangePrice={rangePrice}
                                              onPriceRangeChange={onPriceRangeChange}
                                              onRangeCommitted={onRangeCommitted}
                                              applyRangePrice={applyRangePrice}
                                              rangePriceForm={rangePriceForm}
                                              handlePriceRangeForm={handlePriceRangeForm}
                                              max={getQueryParamMaxPrice()}
                        />
                    </div>
                    <div className={classes.catalog}>
                        {
                            categories
                                .map(item =>
                                    <p key={item.id} onClick={() => handleSetCategoryId(item.id)}
                                       className={classes.catalogItem}>{item.categoryTitle}</p>
                                )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductsPageSidebar;