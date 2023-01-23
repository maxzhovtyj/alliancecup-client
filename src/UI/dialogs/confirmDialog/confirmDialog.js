import React from 'react';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import AllianceButton from "../../allianceCupButton/allianceButton";

function ConfirmDialog({children, showDialog, confirm, cancel, title, confirmButtonText}) {
    return (
        <Dialog open={showDialog}>
            <DialogTitle>
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {children}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <AllianceButton onClick={confirm} autoFocus>
                    Відмінити
                </AllianceButton>
                <AllianceButton onClick={cancel}>{confirmButtonText}</AllianceButton>
            </DialogActions>
        </Dialog>
    );
}

export default ConfirmDialog;