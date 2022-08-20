import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

export default function RangeSlider({value, setValue}) {
    return (
        <Box sx={{ width: 300 }}>
            <Slider
                getAriaLabel={() => 'Price range'}
                value={value}
                onChange={setValue}
                valueLabelDisplay="auto"
            />
        </Box>
    );
}
