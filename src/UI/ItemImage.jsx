import configData from "../config.json";

import NoImageItem from "../assets/NoImageItem.png"

import classes from "./ItemImage.module.scss"

const ItemImage = ({cls,  plug, alt = "item-image", item: {imgUrl, imgUUID}}) => {
    if (imgUUID) {
        const imgUrlUUID = `${configData.MINIO_URL}/images/${imgUUID}`
        return <img loading={"lazy"} src={imgUrlUUID} alt={alt} className={`${cls} ${classes.skeletonImage}`}/>
    } else if (imgUrl) {
        return <img loading={"lazy"} src={imgUrl} alt={alt} className={`${cls} ${classes.skeletonImage}`}/>
    } else if (plug) {
        return <img loading={"lazy"} src={NoImageItem} alt={"empty-img"} className={`${cls} ${classes.skeletonImage}`}/>
    }

    return <div className={cls}/>
}

export default ItemImage;
