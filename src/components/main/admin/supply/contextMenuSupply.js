import * as React from 'react';

import MenuItem from '@mui/material/MenuItem';
import {Divider, IconButton, ListItemIcon, ListItemText, Menu} from "@mui/material";
import {MoreVertRounded} from "@mui/icons-material";
import DeleteIcon from '@mui/icons-material/Delete';
import InventoryIcon from '@mui/icons-material/Inventory';

import {NavLink} from "react-router-dom";
import {SupplyService} from "../../../../service/SupplyService";

export default function ContextMenuSupply({item, snackbar}) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDelete = () => {
        handleClose()
        SupplyService.deleteSupply(item.id).then(res => {
            if (res?.status === 200) {
                snackbar.setMessage("Поставку успішно видалено")
            } else {
                snackbar.setMessage(res?.message)
            }

            snackbar.handleClick()
        })
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
                <NavLink to={`/user/admin/supply/${item.id}`}>
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <InventoryIcon fontSize="small"/>
                        </ListItemIcon>
                        <ListItemText>Товари</ListItemText>
                    </MenuItem>
                </NavLink>

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
