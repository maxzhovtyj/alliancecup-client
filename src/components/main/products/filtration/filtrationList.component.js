import FiltrationItem from "./filtrationItem";

import classes from "./filtration.module.scss"

function FiltrationListComponent({filtrationList, handleCharacteristic}) {
    if (!filtrationList) {
        return ""
    } else return (
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
    );
}

export default FiltrationListComponent;