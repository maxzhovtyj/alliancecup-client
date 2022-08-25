import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import {createTheme, ThemeProvider} from "@mui/material/styles";

export default function RangeSlider({value, setValue, onCommitted}) {
    const theme = createTheme({
        components: {
            // Name of the component
            MuiSlider: {
                styleOverrides: {
                    // Name of the slot
                    root: {
                        // Some CSS
                        color: '#F7A500',
                    },
                },
            },
        },
    });
    return (
        <Box sx={{width: 300, padding: "0 1rem"}}>
            <ThemeProvider theme={theme}>
                <Slider
                    getAriaLabel={() => 'Price range'}
                    value={value}
                    onChange={(event, newValue) => setValue(newValue)}
                    onChangeCommitted={onCommitted}
                    valueLabelDisplay="auto"
                />
            </ThemeProvider>
        </Box>
    );
}
