import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import {createTheme, ThemeProvider} from "@mui/material/styles";

export default function RangeSlider({value, onChangeCallback, onCommitted}) {
    const theme = createTheme({
        components: {
            MuiSlider: {
                styleOverrides: {
                    root: {
                        color: '#F7A500',
                    },
                },
            },
        },
    });

    return (
        <Box sx={{padding: "0 1rem"}}>
            <ThemeProvider theme={theme}>
                <Slider
                    getAriaLabel={() => 'Price range'}
                    value={value}
                    onChange={onChangeCallback}
                    onChangeCommitted={onCommitted}
                    valueLabelDisplay="auto"
                    disableSwap
                />
            </ThemeProvider>
        </Box>
    );
}
