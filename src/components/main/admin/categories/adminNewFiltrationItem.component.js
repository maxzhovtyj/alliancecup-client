import {useSnackbar} from "../../../../hooks/useSnackbar";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useCallbackPrompt} from "../../../../hooks/useCallbackPrompt";
import {fetchCategories, fetchFiltrationItems} from "../../../../redux/shopRedux/shopFetch";

import {FormControl, FormControlLabel, MenuItem, Radio, RadioGroup} from "@mui/material";
import {AllianceInputLabel, AllianceSelect, AllianceTextField} from "../../../../UI/styles";
import AllianceButton from "../../../../UI/allianceCupButton/allianceButton";
import AllianceSnackbar from "../../../../UI/snackbar";
import RouterDialog from "../../../../UI/dialogs/routerDialog/routerDialog";

import classes from "../products/adminProduct.module.scss";
import {FiltrationService} from "../../../../service/FiltrationService";

function AdminNewFiltrationItemComponent() {
    const snackbar = useSnackbar()

    const [showDialog, setShowDialog] = useState(false)
    const [showPrompt, confirmNavigation, cancelNavigation] = useCallbackPrompt(showDialog)

    const dispatch = useDispatch()
    const categories = useSelector(state => state.shop.categories)
    const filtrationList = useSelector(state => state.shop.filtrationList)

    const [value, setValue] = useState("");

    const [filtrationForm, setFiltrationForm] = useState({
        categoryId: "",
        filtrationListId: "",
        filtrationTitle: "",
        filtrationDescription: "",
        imgUrl: "",
        searchKey: "",
        searchCharacteristic: "",
    })

    useEffect(() => {
        dispatch(fetchCategories())
        dispatch(fetchFiltrationItems())
    }, [dispatch])

    const [itemImg, setItemImg] = useState({})

    const handleFiltrationForm = (event) => {
        setFiltrationForm({...filtrationForm, [event.target.name]: event.target.value})
        setShowDialog(true)
    }

    const handleSetFiltrationItemImg = (event) => {
        setItemImg(event.target.files[0])
        setShowDialog(true)
    }

    const handleRadioChange = (event) => {
        setValue(event.target.value);
        setShowDialog(true)
    };

    const newFiltrationItem = () => {
        let form = new FormData()

        form.append("file", itemImg)

        form.append("categoryId", filtrationForm.categoryId)
        form.append("filtrationListId", filtrationForm.filtrationListId)
        form.append("filtrationTitle", filtrationForm.filtrationTitle)
        form.append("filtrationDescription", filtrationForm.filtrationDescription)
        form.append("imgUrl", filtrationForm.imgUrl)
        form.append("searchKey", filtrationForm.searchKey)
        form.append("searchCharacteristic", filtrationForm.searchCharacteristic)

        FiltrationService.addFiltrationItem(form).then(res => {
            snackbar.setMessage(res?.message)
            snackbar.handleClick()
            if (res?.status === 201 || res?.status === 200) {
                setShowDialog(false)
            }
        })
    }

    const parentRadioOption = () => {
        if (value === "categoryId") {
            return (
                <FormControl>
                    <AllianceInputLabel>Категорія</AllianceInputLabel>
                    <AllianceSelect
                        defaultValue={""}
                        name="categoryId"
                        label="Категорія"
                        value={filtrationForm.categoryId}
                        onChange={handleFiltrationForm}
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
        } else if (value === "filtrationListId") {
            return (
                <FormControl>
                    <AllianceInputLabel>Підкатегорія</AllianceInputLabel>
                    <AllianceSelect
                        label="Підкатегорія"
                        defaultValue={""}
                        name="filtrationListId"
                        value={filtrationForm.filtrationListId}
                        onChange={handleFiltrationForm}
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

            <p className={classes.newProductTitle}>Нова пошукова характеристика</p>

            <FormControl className={classes.newProductInfo}>
                <input type={"file"} onChange={handleSetFiltrationItemImg}/>
                <div>
                    <RadioGroup
                        value={value}
                        onChange={handleRadioChange}
                    >
                        <FormControlLabel value="categoryId" control={<Radio/>} label="Категорія"/>
                        <FormControlLabel value="filtrationListId" control={<Radio/>} label="Підкатегорія"/>
                    </RadioGroup>
                </div>

                {parentRadioOption()}
            </FormControl>

            <FormControl className={classes.newProductInfo} fullWidth>
                <AllianceTextField label="Назва"
                                   name={"filtrationTitle"}
                                   value={filtrationForm.filtrationTitle}
                                   onChange={handleFiltrationForm}
                />
                <AllianceTextField label="Опис"
                                   name={"filtrationDescription"}
                                   value={filtrationForm.filtrationDescription}
                                   onChange={handleFiltrationForm}
                                   multiline rows={4}
                />
                <AllianceTextField label="Посилання на фотографію"
                                   name={"imgUrl"}
                                   value={filtrationForm.imgUrl}
                                   onChange={handleFiltrationForm}
                />
                <AllianceTextField label="Пошуковий ключ"
                                   name={"searchKey"}
                                   value={filtrationForm.searchKey}
                                   onChange={handleFiltrationForm}
                />
                <AllianceTextField label="Пошукове значення"
                                   name={"searchCharacteristic"}
                                   value={filtrationForm.searchCharacteristic}
                                   onChange={handleFiltrationForm}
                />
            </FormControl>

            <AllianceButton onClick={newFiltrationItem} mt={"1rem"} mb={"1rem"}>Додати</AllianceButton>
            <AllianceSnackbar message={snackbar.message} handleClose={snackbar.handleClose} open={snackbar.open}/>
        </div>
    );
}

export default AdminNewFiltrationItemComponent;