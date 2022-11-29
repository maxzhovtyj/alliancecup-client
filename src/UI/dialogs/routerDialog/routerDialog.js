import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import AllianceButton from "../../allianceCupButton/allianceButton";

function RouterDialog({showDialog, cancelNavigation, confirmNavigation}) {
    return (
        <Dialog open={showDialog}>
            <DialogTitle>
                Ви покидаєте сторінку
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Вами були внесені дані, що небудуть збережені, якщо ви зараз покинете сторінку
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <AllianceButton onClick={confirmNavigation} autoFocus>
                    Покинути сторінку
                </AllianceButton>
                <AllianceButton onClick={cancelNavigation}>Залишитися</AllianceButton>
            </DialogActions>
        </Dialog>
    );
}

export default RouterDialog;