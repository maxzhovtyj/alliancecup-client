import React from 'react';

import classes from './filtrationItem.module.scss'

function FiltrationItem({onClick, item: {filtrationTitle, imgUrl, infoDescription, id}}) {

    if (!imgUrl) {
        imgUrl = "https://www.fil.ion.ucl.ac.uk/wp-content/uploads/2019/05/grey-background-750x500.jpg"
    }
    return (
        <div onClick={() => onClick(infoDescription, id)} className={classes.filtrationItem}>
            <img src={imgUrl} alt="img"/>
            <div className={classes.filtrationBgItem}/>
            <p>{filtrationTitle}</p>
        </div>
    );
}

export default FiltrationItem;