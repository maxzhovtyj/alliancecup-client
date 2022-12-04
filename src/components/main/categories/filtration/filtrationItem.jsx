import React from 'react';

import classes from './filtrationItem.module.scss'
import noopImg from "../../../../assets/noopProduct.svg";

function FiltrationItem({onClick, item: {filtrationTitle, imgUrl, imgUUID, searchKey, searchCharacteristic, id}}) {
    if (!imgUrl) {
        imgUrl = "https://www.fil.ion.ucl.ac.uk/wp-content/uploads/2019/05/grey-background-750x500.jpg"
    }

    const getProductImage = () => {
        if (imgUUID) {
            return `http://localhost:9000/images/${imgUUID}`
        } else if (imgUrl) {
            return imgUrl
        } else return noopImg
    }

    return (
        <div onClick={() => onClick(searchKey, searchCharacteristic, id)} className={classes.filtrationItem}>
            <img className={classes.filtrationItemImg} src={getProductImage()} alt="img"/>
            <div className={classes.filtrationBgItem}/>
            <p>{filtrationTitle}</p>
        </div>
    );
}

export default FiltrationItem;