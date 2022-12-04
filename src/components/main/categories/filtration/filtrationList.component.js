import FiltrationItem from "./filtrationItem";

import classes from "../products/products.module.scss";

function FiltrationListComponent({filtrationList, handleCharacteristic}) {
    return (
        <>
            {
                filtrationList
                    ?
                    <div className={classes.filtrationList}>
                        {
                            filtrationList
                                .map((item, index) =>
                                    <FiltrationItem
                                        onClick={handleCharacteristic}
                                        key={index}
                                        item={item}
                                    />
                                )
                        }
                    </div>
                    : ""
            }
        </>
    );
}

export default FiltrationListComponent;