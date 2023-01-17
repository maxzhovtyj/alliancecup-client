import classes from "./products.module.scss";
import RangeSlider from "../../../../UI/rangeSlider/rangeSlider";

function RangeSliderComponent({
                         rangePrice,
                         onPriceRangeChange,
                         onRangeCommitted,
                         applyRangePrice,
                         rangePriceForm,
                         handlePriceRangeForm,
                     }) {
    return (
        <>
            <RangeSlider
                value={rangePrice}
                onChangeCallback={onPriceRangeChange}
                onCommitted={onRangeCommitted}
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

export default RangeSliderComponent;