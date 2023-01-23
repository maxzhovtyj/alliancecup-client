import {useState} from "react";
import {useNavigate} from "react-router-dom";

import MenuItem from '@mui/material/MenuItem';
import {Divider, IconButton, ListItemIcon, ListItemText, Menu} from "@mui/material";
import {MoreVertRounded} from "@mui/icons-material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import HideImageRoundedIcon from '@mui/icons-material/HideImageRounded';

import {AdminService} from "../../../../service/AdminService";


export default function ContextMenuCategory({item, setMessage, handleClickSnackbar}) {
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
        setAnchorEl(null);
        navigate(`/user/admin/update-category/${item.id}`)
    }

    const handleDelete = () => {
        AdminService.deleteCategory(item.id).then(res => {
            if (res.status === 200) {
                setMessage("Категорію успішно видалено")
                handleClickSnackbar()
            } else {
                setMessage(res?.message)
                handleClickSnackbar()
            }
            setAnchorEl(null);
        })
    }

    const handleDeleteImage = () => {
        AdminService.deleteCategoryImage(item.id).then(res => {
            if (res.status === 200) {
                setMessage("Фотографію категорії успішно видалено")
                handleClickSnackbar()
            } else {
                setMessage(res?.message)
                handleClickSnackbar()
            }
            setAnchorEl(null);
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
