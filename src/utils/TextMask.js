import {IMaskInput} from "react-imask";
import PropTypes from "prop-types";
import {forwardRef} from "react";

export const TextMaskCustom = forwardRef(function TextMaskCustom(props, ref) {
    const {onChange, ...other} = props;
    return (
        <IMaskInput
            {...other}
            mask="+38# (00) 000-00-00"
            definitions={{
                "#": /[0]/,
            }}
            inputRef={ref}
            onAccept={(value) => onChange({target: {name: props.name, value}})}
            overwrite
        />
    );
});

TextMaskCustom.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

