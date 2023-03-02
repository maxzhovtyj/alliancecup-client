import configData from "../config.json";

import NoImageItem from "../assets/NoImageItem.png"

const ItemImage = ({cls, alt = "item-image", item: {imgUrl, imgUUID}}) => {
    if (imgUUID) {
        const imgUrlUUID = `${configData.MINIO_URL}/images/${imgUUID}`
        return <img src={imgUrlUUID} alt={alt} className={cls}/>
    } else if (imgUrl) {
        return <img src={imgUrl} alt={alt} className={cls}/>
    } else {
        return <img src={NoImageItem} alt={"empty-img"} className={cls}/>
    }
}

export default ItemImage;
