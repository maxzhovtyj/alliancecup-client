import React from 'react';
import FiltrationItemSkeleton from "./filtrationItemSkeleton";
import classes from "./filtration.module.scss";

function ProductsSkeleton() {
    return (
        <div className={classes.filtrationListWrapper}>
            <div className={classes.filtrationList}>
                <FiltrationItemSkeleton/>
                <FiltrationItemSkeleton/>
                <FiltrationItemSkeleton/>
            </div>
        </div>
    );
}

export default ProductsSkeleton;
