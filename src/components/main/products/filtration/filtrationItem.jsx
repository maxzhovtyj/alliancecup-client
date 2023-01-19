import classes from './filtration.module.scss'
import {ShoppingService} from "../../../../service/ShoppingService";

function FiltrationItem({onClick, item: {filtrationTitle, imgUrl, imgUUID, searchKey, searchCharacteristic, id}}) {
    return (
        <div onClick={() => onClick(searchKey, searchCharacteristic, id)} className={classes.filtrationItem}>
            <img className={classes.filtrationItemImg} src={ShoppingService.getImage({imgUUID, imgUrl})} alt="img"/>
            <div className={classes.filtrationBgItem}/>
            <p>{filtrationTitle}</p>
        </div>
    );
}

export default FiltrationItem;