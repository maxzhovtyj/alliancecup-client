import {useSnackbar} from "../../../../hooks/useSnackbar";
import {useDispatch, useSelector} from "react-redux";
import {fetchCategories, fetchFiltrationItems} from "../../../../redux/shopRedux/shopFetch";
import classes from "../products/adminProduct.module.scss";
import {FormControl, FormControlLabel, MenuItem, Radio, RadioGroup} from "@mui/material";
import {AllianceInputLabel, AllianceSelect, AllianceTextField} from "../../../../UI/styles";
import AllianceButton from "../../../../UI/allianceCupButton/allianceButton";
import AllianceSnackbar from "../../../../UI/snackbar";
import {useEffect, useState} from "react";
import {AdminService} from "../../../../service/AdminService";

function AdminNewCharacteristicComponent() {
    const snackbar = useSnackbar()

    const dispatch = useDispatch()
    const categories = useSelector(state => state.shop.categories)
    const filtrationList = useSelector(state => state.shop.filtrationList)

    const [value, setValue] = useState('');

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
    }

    const handleSetFiltrationItemImg = (event) => {
        setItemImg(event.target.files[0])
    }

    const handleRadioChange = (event) => {
        setValue(event.target.value);
    };

    const newFiltrationItem = () => {
        console.log(filtrationForm)
        let form = new FormData()

        form.append("file", itemImg)

        form.append("categoryId", filtrationForm.categoryId)
        form.append("filtrationListId", filtrationForm.filtrationListId)
        form.append("filtrationTitle", filtrationForm.filtrationTitle)
        form.append("filtrationDescription", filtrationForm.filtrationDescription)
        form.append("imgUrl", filtrationForm.imgUrl)
        form.append("searchKey", filtrationForm.searchKey)
        form.append("searchCharacteristic", filtrationForm.searchCharacteristic)

        AdminService.addFiltrationItem(form).then(res => {
            snackbar.setMessage(res?.message)
            snackbar.handleClick()
        })
    }

    const parentRadioOption = () => {
        if (value === "categoryId") {
            return (
                <FormControl sx={{minWidth: 200}}>
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
                                <MenuItem value={item.categoryId} key={item.id}>
                                    {item.categoryTitle}
                                </MenuItem>)
                        }
                    </AllianceSelect>
                </FormControl>
            );
        } else if (value === "filtrationListId") {
            return (
                <FormControl sx={{minWidth: 200}}>
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
                                    {item.filtrationTitle}
                                </MenuItem>)
                        }
                    </AllianceSelect>
                </FormControl>
            );
        }
    }

    return (
        <div>
            <p className={classes.newProductTitle}>Нова пошукова характеристика</p>

            <FormControl className={classes.newProductInfo}>
                <input type={"file"} onChange={handleSetFiltrationItemImg}/>
                <div>
                    <RadioGroup
                        name="quiz"
                        value={value}
                        onChange={handleRadioChange}
                    >
                        <FormControlLabel value="categoryId" control={<Radio/>} label="Категорія"/>
                        <FormControlLabel value="filtrationListId" control={<Radio/>} label="Підкатегорія"/>
                    </RadioGroup>
                </div>

                {parentRadioOption()}

                <AllianceTextField label="Назва"
                                   name={"filtrationTitle"}
                                   value={filtrationForm.filtrationTitle}
                                   onChange={handleFiltrationForm}
                />
                <AllianceTextField label="Опис"
                                   name={"filtrationDescription"}
                                   value={filtrationForm.filtrationDescription}
                                   onChange={handleFiltrationForm
                                   }/>
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

export default AdminNewCharacteristicComponent;