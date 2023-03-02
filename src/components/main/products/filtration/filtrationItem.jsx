import ItemImage from "../../../../UI/ItemImage";
import classes from './filtration.module.scss'

function FiltrationItem({onClick, item: {filtrationTitle, imgUrl, imgUUID, searchKey, searchCharacteristic, id}}) {
    return (
        <div onClick={() => onClick(searchKey, searchCharacteristic, id)} className={classes.filtrationItem}>
            <ItemImage cls={classes.filtrationItemImg} item={{imgUUID, imgUrl}} alt={"filtration-image"}/>
            <p className={classes.filtrationItemTitle}>{filtrationTitle}</p>
        </div>
    );
}

export default FiltrationItem;
