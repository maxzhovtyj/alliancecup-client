import React from 'react';
import {Skeleton} from "@mui/material";

import classes from "../products.module.scss"

function ProductItemSkeleton() {
    return (
        <Skeleton className={classes.productItem} variant="rectangular"/>
    );
}

export default ProductItemSkeleton;
