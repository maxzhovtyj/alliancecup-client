import {useEffect, useState} from "react";
import {UserService} from "../../../../../service/UserService";

import classes from './personalInfo.module.scss'

function PersonalInfoComponent() {
    const [userInfo, setUserInfo] = useState({})

    useEffect(() => {
        UserService.userInfo().then(res => setUserInfo(res.data))
    }, [])
    return (
        <div className={classes.wrapper}>
            <div>
                <p className={classes.title}>Email:</p>
                <p>{userInfo.email}</p>
            </div>
            <div>
                <p className={classes.title}>Ім'я:</p>
                <p>{userInfo.name}</p>
            </div>
            <div>
                <p className={classes.title}>Номер телефону:</p>
                <p>{userInfo.phoneNumber}</p>
            </div>
        </div>
    );
}

export default PersonalInfoComponent;