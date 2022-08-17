import React from 'react';
import Button from "@mui/material/Button";

import classes from './userCabinet.module.scss'

function UserCabinetComponent() {
    return (
        <div className={classes.logoutBtn}>
            <Button variant={"outlined"}>Logout</Button>
        </div>
    );
}

export default UserCabinetComponent;