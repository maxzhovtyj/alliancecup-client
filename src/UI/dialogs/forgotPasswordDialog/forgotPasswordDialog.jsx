import {IconButton} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import {AllianceTextField} from "../../styles";

import classes from '../authDialogs/authDialogs.module.scss'
import AllianceButton from "../../allianceCupButton/allianceButton";

function ForgotPasswordDialog({
                                  open,
                                  handleOpen,
                                  handleClose,
                                  handleForgotPassword,
                                  formHandler,
                                  errors
                              }) {
    return (
        <Dialog open={open} onClose={handleOpen}>
            <div className={classes.dialogWrapper}>
                <div className={classes.topWrapper}>
                    <p className={classes.topTitle}>Відновлення пароля</p>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon/>
                    </IconButton>
                </div>
                <DialogContent className={classes.authInputs}>
                    <AllianceTextField
                        className={classes.formInput}
                        name={"email"}
                        onChange={formHandler}
                        required
                        label="Email"
                        error={errors?.email}
                    />
                </DialogContent>

                <p className={classes.forgotPasswordText}>
                    Подальші інстрункції щодо відновлення пароля будуть надіслані вам на пошту, що була вказана при
                    реєстрації
                </p>

                <div className={classes.forgotPasswordBtn}>
                    <AllianceButton
                        onClick={handleForgotPassword}
                        variant={"outlined"}
                        size={"large"}
                        mt={"1rem"}
                    >Надіслати</AllianceButton>
                </div>
            </div>
        </Dialog>
    );
}

export default ForgotPasswordDialog;