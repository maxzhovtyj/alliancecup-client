import configData from "../config.json";

import NoImageItem from "../assets/NoImageItem.png"

import ProgressiveImage from "react-progressive-graceful-image";
import {Skeleton} from "@mui/material";

const ItemImage = ({cls, plug, alt = "item-image", item: {imgUrl, imgUUID}}) => {
    if (imgUUID) {
        const imgUrlUUID = `${configData.MINIO_URL}/images/${imgUUID}`
        return (
            <ProgressiveImage src={imgUrlUUID} placeholder={alt}>
                {(src, loading) =>
                    loading ? <Skeleton className={cls} variant="rectangular"/> :
                        <img loading={"lazy"} src={src} className={cls} alt={alt}/>
                }
            </ProgressiveImage>
        )
    } else if (imgUrl) {
        return (
            <ProgressiveImage src={imgUrl} placeholder={alt}>
                {(src, loading) =>
                    loading ? <Skeleton className={cls} variant="rectangular"/> :
                        <img loading={"lazy"} src={src} className={cls} alt={alt}/>
                }
            </ProgressiveImage>
        )
    } else {
        return (
            <ProgressiveImage src={NoImageItem} placeholder={alt}>
                {(src, loading) =>
                    loading ? <Skeleton className={cls} variant="rectangular"/> :
                        <img loading={"lazy"} src={src} className={cls} alt={alt}/>
                }
            </ProgressiveImage>
        )
    }
}

export default ItemImage;
