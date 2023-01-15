import {useState} from "react";

import MenuItem from '@mui/material/MenuItem';
import {IconButton, ListItemIcon, ListItemText, Menu} from "@mui/material";
import {MoreVertRounded} from "@mui/icons-material";
import DeleteIcon from '@mui/icons-material/Delete';
import {AdminService} from "../../../../service/AdminService";
import {useNavigate} from "react-router-dom";

export default function ContextMenuCharacteristics({item, setMessage, handleClickSnackBar}) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const navigate = useNavigate()

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleUpdate = () => {
        navigate(`/user/admin/update-characteristic/${item.id}`)
    }

    const handleDelete = () => {
        AdminService.deleteFiltrationItem(item.id).then(res => {
            setMessage(res.message)
            handleClickSnackBar()
        })
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
