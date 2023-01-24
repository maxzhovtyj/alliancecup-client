import {useState} from "react";
import MenuItem from '@mui/material/MenuItem';
import {Divider, IconButton, ListItemIcon, ListItemText, Menu} from "@mui/material";

import {MoreVertRounded, Visibility, VisibilityOff} from "@mui/icons-material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import HideImageRoundedIcon from '@mui/icons-material/HideImageRounded';

import {useNavigate} from "react-router-dom";
import {ProductService} from "../../../../service/ProductService";

function IsActiveItem({isActive, handleHideProduct, handleShowProduct}) {
    if (isActive) {
        return (
            <MenuItem onClick={handleHideProduct}>
                <ListItemIcon>
                    <VisibilityOff fontSize="small"/>
                </ListItemIcon>
                <ListItemText>Приховати товар</ListItemText>
            </MenuItem>
        );
    } else {
        return (
            <MenuItem onClick={handleShowProduct}>
                <ListItemIcon>
                    <Visibility fontSize="small"/>
                </ListItemIcon>
                <ListItemText>Показати товар</ListItemText>
            </MenuItem>
        );
    }

}

export default function ContextMenuProduct({item, setSnackbarMessage, clickSnackbar}) {
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate()
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSetToUpdate = () => {
        setAnchorEl(null);
        navigate(`/user/admin/update-product/${item.id}`)
    }

    const handleDeleteImage = () => {
        ProductService.deleteProductImage(item.id).then(res => {
            if (res.status === 200) {
                setSnackbarMessage("Фото товару успішно видалено")
                clickSnackbar()
            } else {
                setSnackbarMessage(res?.message)
                clickSnackbar()
            }
        })
    }

    const handleDelete = () => {
        ProductService.deleteProduct(item.id).then(res => {
            setSnackbarMessage(res.message)
            clickSnackbar()
        })
        setAnchorEl(null);
    }

    const handleHideProduct = () => {
        ProductService.productVisibility(item.id, false).then(res => {
            if (res?.status === 200) {
                setSnackbarMessage("Товар приховано")
                clickSnackbar()
                setAnchorEl(null);
            } else {
                setSnackbarMessage(res?.message)
                clickSnackbar()
            }
        })
        setAnchorEl(null);
    }

    const handleShowProduct = () => {
        ProductService.productVisibility(item.id, true).then(res => {
            if (res?.status === 200) {
                setSnackbarMessage("Товар відкрито для придбання")
                clickSnackbar()
                setAnchorEl(null);
            } else {
                setSnackbarMessage(res?.message)
                clickSnackbar()
            }
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
                <MenuItem onClick={handleSetToUpdate}>
                    <ListItemIcon>
                        <EditIcon fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText>Змінити</ListItemText>
                </MenuItem>

                <IsActiveItem isActive={item.isActive} handleHideProduct={handleHideProduct}
                              handleShowProduct={handleShowProduct}/>

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
