import React from 'react';
import {Skeleton} from "@mui/material";

import classes from "./filtration.module.scss"

function FiltrationItemSkeleton() {
    return (
        <div className={classes.filtrationItem}>
            <Skeleton className={classes.filtrationItemImg} variant="rectangular"/>
        </div>
    );
}

export default FiltrationItemSkeleton;
