import {createTheme} from "@mui/material/styles";
import {InputLabel, Select, styled, TextField} from "@mui/material";

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

export const AllianceTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: '#F7A500',
    },
    '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
            borderColor: '#F7A500',
        },
    },
});

export const AllianceInputLabel = styled(InputLabel)(() => ({
    "&.Mui-focused": {
        color: "#F7A500"
    }
}));

export const AllianceSelect = styled(Select)(() => ({
    "&.MuiOutlinedInput-root": {
        "&.Mui-focused fieldset": {
            borderColor: "#F7A500"
        }
    }
}));