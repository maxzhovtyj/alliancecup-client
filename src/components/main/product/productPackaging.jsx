import classes from "./product.module.scss";

function ProductPackaging({packaging}) {
    return (
        <div className={classes.packagingList}>
            {
                packaging
                    ?
                    Object.entries(packaging).map(entry => {
                        const [key, value] = entry
                        return (
                            <div key={key} className={classes.packagingItem}>
                                <p>{value} {key}</p>
                            </div>);
                    })
                    : ""
            }
        </div>
    );
}

export default ProductPackaging;