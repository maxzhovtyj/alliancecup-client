import {useEffect, useState} from "react";
import {useSnackbarContext} from "../../../../../context/SnackbarContext";
import {UserService} from "../../../../../service/UserService";

import AllianceButton from "../../../../../UI/allianceCupButton/allianceButton";
import {AllianceTextField} from "../../../../../UI/styles";
import {TextMaskCustom} from "../../../../../utils/TextMask";

import classes from './personalInfo.module.scss'

function PersonalInfoComponent() {
    const snackbar = useSnackbarContext()

    const [changeStatus, setChangeStatus] = useState(false)
    const [changeInfo, setChangeInfo] = useState({
        email: "",
        lastname: "",
        firstname: "",
        middleName: "",
        phoneNumber: "",
    })
    const [userInfo, setUserInfo] = useState({})

    useEffect(() => {
        UserService.userInfo().then(res => {
            setUserInfo(res.data)
            setChangeInfo(res.data)
        })
    }, [])
    const toggleChangeStatus = () => {
        setChangeStatus(prevState => !prevState)
    }
    const saveInfo = () => {
        if (changeInfo !== userInfo) {
            UserService.updateUserInfo(changeInfo).then(res => {
                if (res.status === 200) {
                    snackbar.setMessage("Дані успішно збережено")
                    snackbar.handleClick()
                    setChangeStatus(false)
                    setUserInfo(changeInfo)
                }
            })
        } else {
            snackbar.setMessage("Дані не було змінено...")
            snackbar.handleClick()
        }
    }
    const handleUserInfo = (event) => {
        setChangeInfo({...changeInfo, [event.target.name]: event.target.value})
    }
    return (
        <div className={classes.wrapper}>
            <div>
                <p className={classes.title}>Email:</p>
                <p>{userInfo.email}</p>
            </div>
            <div>
                <p className={classes.title}>Прізвище:</p>
                {!changeStatus
                    ? <p>{userInfo.lastname}</p>
                    : <AllianceTextField name={"lastname"} value={changeInfo.lastname} onChange={handleUserInfo}/>}
            </div>
            <div>
                <p className={classes.title}>Ім'я:</p>
                {!changeStatus
                    ? <p>{userInfo.firstname}</p>
                    : <AllianceTextField name={"firstname"} value={changeInfo.firstname} onChange={handleUserInfo}/>}
            </div>
            <div>
                <p className={classes.title}>По-батькові:</p>
                {!changeStatus
                    ? <p>{userInfo.middleName}</p>
                    : <AllianceTextField name={"middleName"} value={changeInfo.middleName} onChange={handleUserInfo}/>}
            </div>
            <div>
                <p className={classes.title}>Номер телефону:</p>
                {
                    !changeStatus
                        ? <p>{userInfo.phoneNumber}</p>
                        : <AllianceTextField
                            value={changeInfo.phoneNumber}
                            onChange={handleUserInfo}
                            name="phoneNumber"
                            InputProps={{
                                inputComponent: TextMaskCustom
                            }}
                        />
                }
            </div>
            {
                !changeStatus
                    ?
                    <AllianceButton onClick={toggleChangeStatus} mt={"1rem"} mb={"1rem"}>Змінити</AllianceButton>
                    :
                    <div className={classes.changeInfoBtn}>
                        <AllianceButton onClick={toggleChangeStatus}>Скасувати</AllianceButton>
                        <AllianceButton onClick={saveInfo}>Зберегти</AllianceButton>
                    </div>
            }
        </div>
    );
}

export default PersonalInfoComponent;
