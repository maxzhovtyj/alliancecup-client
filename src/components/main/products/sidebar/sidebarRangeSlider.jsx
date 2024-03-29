import RangeSlider from "../../../../UI/rangeSlider/rangeSlider";
import classes from "./productsPageSidebar.module.scss";

function SidebarRangeSlider({
                         rangePrice,
                         onPriceRangeChange,
                         onRangeCommitted,
                         applyRangePrice,
                         rangePriceForm,
                         handlePriceRangeForm,
                         min, max,
                     }) {
    return (
        <>
            <RangeSlider
                value={rangePrice}
                onChangeCallback={onPriceRangeChange}
                onCommitted={onRangeCommitted}
                min={min}
                max={max}
            />
            <form className={classes.rangePricesForm} onSubmit={applyRangePrice}>
                <div className={classes.rangePricesInputs}>
                    <input name={"min"} value={rangePriceForm[0]}
                           onChange={handlePriceRangeForm}/>
                    <input name={"max"} value={rangePriceForm[1]}
                           onChange={handlePriceRangeForm}/>
                </div>
                <input className={classes.rangePriceSubmitBtn} type={"submit"} value={"OK"}/>
            </form>
        </>
    );
}

export default SidebarRangeSlider;
