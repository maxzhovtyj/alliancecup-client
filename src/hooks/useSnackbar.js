import {useState} from "react";

export const useSnackbar = () => {
    let [open, setOpen] = useState(false);
    let [message, setMessage] = useState("")

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return {open, message, setMessage, handleClick, handleClose}
}
