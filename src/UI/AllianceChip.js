import React from 'react';
import {Chip} from "@mui/material";

function AllianceChip({label, variant, name, onDelete}) {
    const deleteHandler = () => {
        onDelete(name)
    }
    return (
        <Chip label={label} variant={variant} onDelete={deleteHandler}/>
    );
}

export default AllianceChip;