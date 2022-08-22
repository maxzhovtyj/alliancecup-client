import {Autocomplete, TextField} from "@mui/material";

export default function AutoCompleteSelect({label, width, options, getOptionLabel, value, setValue, onChange}) {
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
                <TextField {...params} onChange={onChange} label={label}/>
            )}
        />
    );
}