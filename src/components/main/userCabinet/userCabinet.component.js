import React, {useContext} from 'react';
import Button from "@mui/material/Button";

import classes from './userCabinet.module.scss'
import {AuthContext} from "../../../context/AuthContext";
import $api from "../../../http/http";
import {NavLink} from "react-router-dom";

function UserCabinetComponent() {
    const {userRoleId, logout} = useContext(AuthContext)

    const userLogout = async () => {
        try {
            const response = await $api.delete('/api/client/logout').catch(function (error) {
                if (error.response.status === 400) {
                    throw new Error("Помилка: Хибні дані")
                }
                if (error.response.status === 401) {
                    throw new Error("Помилка: ви не авторизовані")
                }
                if (error.response.status === 500) {
                    throw new Error("Помилка: щось пішло не так")
                }
            })
            console.log(response)
            logout()
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className={classes.userPage}>
            <h1 className={classes.title}>Особистий кабінет</h1>
            <div className={classes.logoutBtn}>
                <Button onClick={userLogout}>Вийти</Button>
                {
                    (userRoleId !== 0 && userRoleId !== 1)
                        ?
                        <NavLink to={"admin"}>
                            <Button variant={"outlined"}>Панель адміністратора</Button>
                        </NavLink>
                        : ""
                }
            </div>
        </div>
    );
}

export default UserCabinetComponent;