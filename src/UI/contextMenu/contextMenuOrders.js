import MenuItem from '@mui/material/MenuItem';
import {Divider, IconButton, ListItemIcon, ListItemText, Menu} from "@mui/material";
import {MoreVertRounded} from "@mui/icons-material";
import DeleteIcon from '@mui/icons-material/Delete';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import InfoIcon from '@mui/icons-material/Info';

import {NavLink} from "react-router-dom";
import {useState} from "react";

export default function ContextMenuOrders({item}) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDelete = () => {
        setAnchorEl(null);
    }
    return (
        <div>
            <IconButton
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <MoreVertRounded/>
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <NavLink to={`/user/admin/orders/${item.id}`}>
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <InfoIcon fontSize="small"/>
                        </ListItemIcon>
                        <ListItemText>Повна інформація</ListItemText>
                    </MenuItem>
                </NavLink>

                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <FileDownloadIcon fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText>Накладна</ListItemText>
                </MenuItem>

                <Divider/>

                <MenuItem onClick={handleDelete}>
                    <ListItemIcon>
                        <DeleteIcon fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText>Видалити</ListItemText>
                </MenuItem>
            </Menu>
        </div>
    );
}
