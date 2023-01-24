import {useState} from "react";

import MenuItem from '@mui/material/MenuItem';
import {Divider, IconButton, ListItemIcon, ListItemText, Menu} from "@mui/material";
import {MoreVertRounded} from "@mui/icons-material";
import DeleteIcon from '@mui/icons-material/Delete';
import {useNavigate} from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import HideImageRoundedIcon from "@mui/icons-material/HideImageRounded";
import {FiltrationService} from "../../../../service/FiltrationService";

export default function ContextMenuFiltrationItem({item, setMessage, handleClickSnackBar}) {
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
        navigate(`/user/admin/update-filtration/${item.id}`)
    }

    const handleDelete = () => {
        FiltrationService.deleteFiltrationItem(item.id).then(res => {
            if (res.status === 200) {
                setMessage("Фільтрацію успішно видалено")
                handleClickSnackBar()
            } else {
                setMessage(res?.message)
                handleClickSnackBar()
            }
        })
        setAnchorEl(null);
    }

    const handleDeleteImage = () => {
        FiltrationService.deleteFiltrationItemImage(item.id).then(res => {
            if (res.status === 200) {
                setMessage("Фотографію успішно видалено")
                handleClickSnackBar()
            } else {
                setMessage(res?.message)
                handleClickSnackBar()
            }
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
                <MenuItem onClick={handleUpdate}>
                    <ListItemIcon>
                        <EditIcon fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText>Змінити</ListItemText>
                </MenuItem>

                <Divider/>

                <MenuItem onClick={handleDeleteImage}>
                    <HideImageRoundedIcon>
                        <DeleteIcon fontSize="small"/>
                    </HideImageRoundedIcon>
                    <ListItemText>Видалити фото</ListItemText>
                </MenuItem>

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
