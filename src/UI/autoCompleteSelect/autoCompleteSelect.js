import {Autocomplete} from "@mui/material";
import {AllianceTextField} from "../styles";

export default function AutoCompleteSelect({label, width, options, getOptionLabel, value, setValue, onChange, error}) {
    return (
        <Autocomplete
            sx={{width: width}}
            options={options}
            getOptionLabel={getOptionLabel}
            id="auto-complete"
            autoComplete
            value={value}
            onChange={setValue}
            includeInputInList
            renderInput={(params) => (
                <AllianceTextField {...params} error={error} onChange={onChange} label={label}/>
            )}
        />
    );
}