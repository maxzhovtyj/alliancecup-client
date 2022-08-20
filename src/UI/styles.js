import {createTheme} from "@mui/material/styles";

export const muiBtnStyle = {
    "& .MuiOutlinedInput-root": {
        borderRadius: "10px",
        "&.Mui-focused fieldset": {
            borderWidth: "1px",
            borderColor: "#F7A500"
        }
    }
}

export const muiTextBtnTheme = createTheme({
    palette: {
        alliance: {
            main: '#F7A500',
            contrastText: '#fff',
        },
    },
});

export const muiTextField = {
    "& .MuiOutlinedInput-root": {
        borderRadius: "10px",
        "&.Mui-focused fieldset": {
            borderWidth: "1px",
            borderColor: "#C5283D"
        }
    }
}
