import SidebarRangeSlider from "./sidebarRangeSlider";
import classes from "./productsPageSidebar.module.scss";

function ProductsPageSidebar({
                                 rangePrice,
                                 onPriceRangeChange,
                                 onRangeCommitted,
                                 applyRangePrice,
                                 rangePriceForm,
                                 handlePriceRangeForm,
                                 getQueryParamMaxPrice,
                                 categories,
                                 handleSetCategoryId,
                                 currentCategoryId,
                             }) {
    currentCategoryId = Number(currentCategoryId)

    return (
        <div className={classes.sidebar}>
            <div className={classes.sidebarWrapper}>
                <div className={classes.sidebarContainer}>
                    <h4 className={classes.categoriesTitle}>Ціна</h4>
                    <div className={classes.priceRange}>
                        <SidebarRangeSlider rangePrice={rangePrice}
                                     onPriceRangeChange={onPriceRangeChange}
                                     onRangeCommitted={onRangeCommitted}
                                     applyRangePrice={applyRangePrice}
                                     rangePriceForm={rangePriceForm}
                                     handlePriceRangeForm={handlePriceRangeForm}
                                     max={getQueryParamMaxPrice()}
                        />
                    </div>
                    <h4 className={classes.categoriesTitle}>Категорії</h4>
                    <div className={classes.catalog}>
                        {
                            categories
                                .map(item =>
                                    <p key={item.id}
                                       onClick={() => handleSetCategoryId(item.id)}
                                       className={
                                           [
                                               classes.catalogItem,
                                               (currentCategoryId === item.id) ? classes.activeCategory : ""
                                           ].join(" ")
                                       }
                                    >
                                        {item.categoryTitle}
                                    </p>
                                )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductsPageSidebar;
