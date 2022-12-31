import classes from './product.module.scss'

function ProductCharacteristics({characteristics}) {
    if (!characteristics || characteristics.length === 0) {
        return ""
    } else return (
        <div className={classes.characteristics}>
            <p className={classes.characteristicsTitle}>Характеристики</p>
            <dl className={classes.characteristicsList}>
                {
                    Object.entries(characteristics).map(entry => {
                        const [key, value] = entry
                        return (
                            <div key={key} className={classes.characteristicsItem}>
                                <dt><p>{key}</p></dt>
                                <dd><p>{value}</p></dd>
                            </div>
                        );
                    })
                }
            </dl>
        </div>
    );
}

export default ProductCharacteristics