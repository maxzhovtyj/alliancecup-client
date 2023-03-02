import {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useCallbackPrompt} from "../../../../hooks/useCallbackPrompt";
import {useSnackbarContext} from "../../../../context/SnackbarContext";

import {useDispatch, useSelector} from "react-redux";
import {fetchCategories, fetchFiltrationItems} from "../../../../redux/shopRedux/shopFetch";

import {FiltrationService} from "../../../../service/FiltrationService";
import {ShoppingService} from "../../../../service/ShoppingService";

import {FormControl, FormControlLabel, MenuItem, Radio, RadioGroup} from "@mui/material";
import {AllianceInputLabel, AllianceSelect, AllianceTextField} from "../../../../UI/styles";
import AllianceButton from "../../../../UI/allianceCupButton/allianceButton";
import RouterDialog from "../../../../UI/dialogs/routerDialog/routerDialog";

import classes from "./adminCategories.module.scss";

function AdminUpdateFiltrationItemComponent() {
    const snackbar = useSnackbarContext()

    const [showImgDialog, setShowImgDialog] = useState(false)
    const [showFormDialog, setShowFormDialog] = useState(false)
    const [showDialog, setShowDialog] = useState(false)
    const [showPrompt, confirmNavigation, cancelNavigation] = useCallbackPrompt(showDialog)

    const dispatch = useDispatch()
    const categories = useSelector(state => state.shop.categories)
    const filtrationList = useSelector(state => state.shop.filtrationList)

    const [disabledBtn, setDisabledBtn] = useState(false)

    const [radioValue, setRadioValue] = useState("");

    const [filtrationItem, setFiltrationItem] = useState({
        id: "",
        categoryId: "",
        filtrationListId: "",
        filtrationTitle: "",
        filtrationDescription: "",
        imgUrl: "",
        searchKey: "",
        searchCharacteristic: "",
    })
    const [filtrationItemErrors, setFiltrationItemErrors] = useState({
        filtrationTitle: false,
        searchKey: false,
        searchCharacteristic: false,
    })
    const [image, setImage] = useState()

    const params = useParams()

    useEffect(() => {
        FiltrationService.getFiltrationItem(params.id).then(res => {
            setFiltrationItem(res?.data)
            setRadioValue(res?.data?.categoryId ? "categoryId" : "filtrationListId")
        })
    }, [params.id])

    useEffect(() => {
        dispatch(fetchCategories())
        dispatch(fetchFiltrationItems())
    }, [dispatch])

    const handleSetFiltrationItemImg = (event) => {
        setImage(event.target.files[0])
        setShowImgDialog(true)
    }

    const handleFiltrationItem = (event) => {
        setFiltrationItem({...filtrationItem, [event.target.name]: event.target.value})
        setShowFormDialog(true)
    }

    const handleRadioChange = (event) => {
        if (event.target.value === "categoryId") {
            filtrationItem.filtrationListId = ""
        } else if (event.target.value === "filtrationListId") {
            filtrationItem.categoryId = ""
        }
        setRadioValue(event.target.value);
        setShowFormDialog(true)
    };

    function updateImage() {
        let form = new FormData()

        form.append("id", filtrationItem.id)
        form.append("file", image)

        setDisabledBtn(true)
        FiltrationService.updateFiltrationItemImg(form).then(res => {
            if (res?.status === 200 || res?.status === 201) {
                snackbar.setMessage("Фотографію успішно оновлено")
                snackbar.handleClick()

                setShowImgDialog(false)
                setShowDialog(showFormDialog)
            } else {
                snackbar.setMessage(res?.message)
                snackbar.handleClick()
            }
            setDisabledBtn(false)
        })
    }

    const validateFiltrationItem = () => {
        let tmp = {
            filtrationTitle: filtrationItem.filtrationTitle === "",
            searchKey: filtrationItem.searchKey === "",
            searchCharacteristic: filtrationItem.searchCharacteristic === "",
        }

        setFiltrationItemErrors(tmp)

        return Object.values(tmp).every(item => item === false)
    }

    function updateFiltrationItem() {
        if (!validateFiltrationItem()) {
            snackbar.setMessage("Поля не пройшли валідацію")
            snackbar.handleClick()
            return
        }

        setDisabledBtn(true)
        FiltrationService.updateFiltrationItem(filtrationItem).then(res => {
            if (res.status === 200) {
                snackbar.setMessage("Успішно оновлено")
                snackbar.handleClick()

                setShowFormDialog(false)
                setShowDialog(showImgDialog)
            } else {
                snackbar.setMessage(res?.message)
                snackbar.handleClick()
            }
            setDisabledBtn(false)
        })
    }

    const parentRadioOption = () => {
        if (radioValue === "categoryId") {
            return (
                <FormControl fullWidth>
                    <AllianceInputLabel>Категорія</AllianceInputLabel>
                    <AllianceSelect
                        defaultValue={""}
                        name="categoryId"
                        label="Категорія"
                        value={filtrationItem.categoryId}
                        onChange={handleFiltrationItem}
                    >
                        <MenuItem value=""><em>None</em></MenuItem>
                        {
                            categories?.map(item =>
                                <MenuItem value={item.id} key={item.id}>
                                    {item.categoryTitle}
                                </MenuItem>)
                        }
                    </AllianceSelect>
                </FormControl>
            );
        } else if (radioValue === "filtrationListId") {
            return (
                <FormControl fullWidth>
                    <AllianceInputLabel>Підкатегорія</AllianceInputLabel>
                    <AllianceSelect
                        label="Підкатегорія"
                        defaultValue={""}
                        name="filtrationListId"
                        value={filtrationItem.filtrationListId || ""}
                        onChange={handleFiltrationItem}
                    >
                        <MenuItem value=""><em>None</em></MenuItem>
                        {
                            filtrationList?.map(item =>
                                <MenuItem value={item.id} key={item.id}>
                                    {item.id} - {item.filtrationTitle}
                                </MenuItem>)
                        }
                    </AllianceSelect>
                </FormControl>
            );
        }
    }

    return (
        <div>
            <RouterDialog
                showDialog={showPrompt}
                confirmNavigation={confirmNavigation}
                cancelNavigation={cancelNavigation}
            />

            <h1>Оновити фільтраційний предмет</h1>

            <FormControl className={classes.updateFiltrationImage}>
                <p>Фото</p>

                <img src={ShoppingService.getImage(filtrationItem)} alt="img"/>
                <input type="file" onChange={handleSetFiltrationItemImg}/>
            </FormControl>

            <AllianceButton onClick={updateImage} disabled={disabledBtn} mt={"1rem"} mb={"1rem"}>Оновити
                фото</AllianceButton>

            <FormControl className={classes.updateFiltrationForm} fullWidth>
                <p>Інформація</p>

                <div>
                    <RadioGroup
                        value={radioValue}
                        onChange={handleRadioChange}
                    >
                        <FormControlLabel value="categoryId" control={<Radio/>} label="Категорія"/>
                        <FormControlLabel value="filtrationListId" control={<Radio/>} label="Підкатегорія"/>
                    </RadioGroup>
                </div>

                {parentRadioOption()}

                <AllianceTextField label="Назва"
                                   name={"filtrationTitle"}
                                   value={filtrationItem.filtrationTitle}
                                   onChange={handleFiltrationItem}
                                   error={filtrationItemErrors.filtrationTitle}
                                   fullWidth
                />
                <AllianceTextField label="Опис"
                                   name={"filtrationDescription"}
                                   value={filtrationItem.filtrationDescription || ""}
                                   onChange={handleFiltrationItem}
                                   multiline rows={4}
                                   fullWidth
                />
                <AllianceTextField label="Посилання на фотографію"
                                   name={"imgUrl"}
                                   value={filtrationItem.imgUrl || ""}
                                   onChange={handleFiltrationItem}
                                   fullWidth
                />
                <AllianceTextField label="Пошуковий ключ"
                                   name={"searchKey"}
                                   value={filtrationItem.searchKey}
                                   onChange={handleFiltrationItem}
                                   error={filtrationItemErrors.searchKey}
                                   fullWidth
                />
                <AllianceTextField label="Пошукове значення"
                                   name={"searchCharacteristic"}
                                   value={filtrationItem.searchCharacteristic}
                                   onChange={handleFiltrationItem}
                                   error={filtrationItemErrors.searchCharacteristic}
                                   fullWidth
                />
            </FormControl>
            <AllianceButton onClick={updateFiltrationItem} disabled={disabledBtn} mt={"1rem"}
                            mb={"1rem"}>Оновити</AllianceButton>
        </div>
    );
}

export default AdminUpdateFiltrationItemComponent;
