import React from 'react';
import ProductItemSkeleton from "./productItemSkeleton";

import classes from "../products.module.scss"

function ProductsSkeleton() {
    return (
        <div>
            <div className={classes.productsListWrapper}>
                <div className={classes.productsList}>
                    <ProductItemSkeleton/>
                    <ProductItemSkeleton/>
                    <ProductItemSkeleton/>
                    <ProductItemSkeleton/>
                    <ProductItemSkeleton/>
                    <ProductItemSkeleton/>
                </div>
            </div>
        </div>
    );
}

export default ProductsSkeleton;
