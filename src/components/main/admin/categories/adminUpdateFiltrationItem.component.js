import {useEffect, useState} from 'react';
import {useSnackbar} from "../../../../hooks/useSnackbar";
import {useParams} from "react-router-dom";
import {useCallbackPrompt} from "../../../../hooks/useCallbackPrompt";
import {FiltrationService} from "../../../../service/FiltrationService";
import {ShoppingService} from "../../../../service/ShoppingService";
import {FormControl, FormControlLabel, MenuItem, Radio, RadioGroup} from "@mui/material";
import AllianceButton from "../../../../UI/allianceCupButton/allianceButton";
import AllianceSnackbar from "../../../../UI/snackbar";
import RouterDialog from "../../../../UI/dialogs/routerDialog/routerDialog";

import classes from "./adminCategories.module.scss";
import {AllianceInputLabel, AllianceSelect, AllianceTextField} from "../../../../UI/styles";
import {useDispatch, useSelector} from "react-redux";
import {fetchCategories, fetchFiltrationItems} from "../../../../redux/shopRedux/shopFetch";

function AdminUpdateFiltrationItemComponent() {
    const snackbar = useSnackbar()

    const [showImgDialog, setShowImgDialog] = useState(false)
    const [showFormDialog, setShowFormDialog] = useState(false)
    const [showDialog, setShowDialog] = useState(false)
    const [showPrompt, confirmNavigation, cancelNavigation] = useCallbackPrompt(showDialog)

    const dispatch = useDispatch()
    const categories = useSelector(state => state.shop.categories)
    const filtrationList = useSelector(state => state.shop.filtrationList)

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
    const [image, setImage] = useState({})

    const params = useParams()

    useEffect(() => {
        FiltrationService.getFiltrationItem(params.id).then(res => {
            setFiltrationItem(res?.data)
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
        setRadioValue(event.target.value);
        setShowDialog(true)
    };

    function updateImage() {
        let form = new FormData()

        form.append("file", image)
        form.append("id", filtrationItem.id)

        FiltrationService.updateFiltrationItemImg(form).then(res => {
            if (res?.status === 200 || res?.status === 201) {
                snackbar.setMessage("Фотографію успішно оновлено")
                snackbar.handleClick()

                setShowImgDialog(false)
                setShowDialog(showImgDialog || showFormDialog)
            } else {
                snackbar.setMessage(res?.message)
                snackbar.handleClick()
            }
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

        FiltrationService.updateFiltrationItem(filtrationItem).then(res => {
            if (res.status === 200) {
                snackbar.setMessage("Успішно оновлено")
                snackbar.handleClick()

                setShowFormDialog(false)
                setShowDialog(showImgDialog || showFormDialog)
            } else {
                snackbar.setMessage(res?.message)
                snackbar.handleClick()
            }
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

            <AllianceSnackbar open={snackbar.open} message={snackbar.message} handleClose={snackbar.handleClose}/>

            <h1>Оновити фільтраційний предмет</h1>

            <FormControl className={classes.updateFiltrationImage}>
                <p>Фото</p>

                <img src={ShoppingService.getImage(filtrationItem)} alt="img"/>
                <input type="file" onClick={handleSetFiltrationItemImg}/>
            </FormControl>

            <AllianceButton onClick={updateImage} mt={"1rem"} mb={"1rem"}>Оновити фото</AllianceButton>

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
            <AllianceButton onClick={updateFiltrationItem} mt={"1rem"} mb={"1rem"}>Оновити</AllianceButton>
        </div>
    );
}

export default AdminUpdateFiltrationItemComponent;