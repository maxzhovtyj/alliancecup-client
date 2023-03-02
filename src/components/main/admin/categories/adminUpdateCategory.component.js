import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useCallbackPrompt} from "../../../../hooks/useCallbackPrompt";
import {useSnackbarContext} from "../../../../context/SnackbarContext";

import {CategoryService} from "../../../../service/CategoryService";
import {ShoppingService} from "../../../../service/ShoppingService";

import {Divider, FormControl} from "@mui/material";
import {AllianceTextField} from "../../../../UI/styles";
import AllianceButton from "../../../../UI/allianceCupButton/allianceButton";
import RouterDialog from "../../../../UI/dialogs/routerDialog/routerDialog";

import classes from "./adminCategories.module.scss"

function AdminUpdateCategoryComponent() {
    const params = useParams()

    const snackbar = useSnackbarContext()
    const [showImgDialog, setShowImgDialog] = useState(false)
    const [showFormDialog, setShowFormDialog] = useState(false)
    const [showDialog, setShowDialog] = useState(false)
    const [showPrompt, confirmNavigation, cancelNavigation] = useCallbackPrompt(showDialog)

    const [disabledBtn, setDisabledBtn] = useState(false)

    const [category, setCategory] = useState({
        categoryTitle: "",
        imgUrl: "",
        description: "",
    })

    const [categoryErr, setCategoryErr] = useState({
        categoryTitle: false,
        imgUrl: false,
        description: false,
    })

    const [categoryImg, setCategoryImg] = useState()

    useEffect(() => {
        CategoryService.getCategory(params.id).then(res => {
            setCategory(res?.data)
        })
    }, [params.id])

    const handleCategoryForm = (event) => {
        setCategory({...category, [event.target.name]: event.target.value})
        setShowFormDialog(true)
    }

    const handleSetCategoryImg = (event) => {
        setCategoryImg(event.target.files[0])
        setShowImgDialog(true)
    }

    function updateCategoryImage() {
        let form = new FormData()

        form.append("file", categoryImg)
        form.append("id", category.id)

        setDisabledBtn(true)
        CategoryService.updateCategoryImage(form).then(res => {
            if (res?.status === 200 || res?.status === 201) {
                snackbar.setMessage("Фото категорії успішно оновлено")
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

    const validateCategory = () => {
        let tmp = {
            categoryTitle: !category.categoryTitle,
            imgUrl: false,
            description: false
        }

        setCategoryErr(tmp)

        return Object.values(tmp).every(item => item === false)
    }

    function updateCategory() {
        if (!validateCategory()) {
            snackbar.setMessage("Поля не пройшли валідацію")
            snackbar.handleClick()
            return
        }

        setDisabledBtn(true)
        CategoryService.updateCategory(category).then(res => {
            if (res?.status === 200) {
                snackbar.setMessage("Категорію успішно оновлено")
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

    return (
        <div>
            <RouterDialog
                showDialog={showPrompt}
                confirmNavigation={confirmNavigation}
                cancelNavigation={cancelNavigation}
            />

            <div className={classes.updateCategoryImage}>
                <p>Фотографія</p>
                <img src={ShoppingService.getImage(category)} alt="img"/>
                <input type={"file"} onChange={handleSetCategoryImg}/>
                <AllianceButton onClick={updateCategoryImage} mt={"1rem"} mb={"1rem"}>Оновити</AllianceButton>
            </div>

            <Divider/>

            <FormControl className={classes.updateCategoryForm} fullWidth>
                <p>Інформація</p>

                <AllianceTextField label="Назва" name={"categoryTitle"} value={category.categoryTitle}
                                   onChange={handleCategoryForm} error={categoryErr.categoryTitle} required/>
                <AllianceTextField label="Посилання на фотографію" name={"imgUrl"} value={category.imgUrl || ""}
                                   onChange={handleCategoryForm} error={categoryErr.imgUrl}/>
                <AllianceTextField label="Опис" name={"description"} value={category.description || ""}
                                   onChange={handleCategoryForm} error={categoryErr.description} multiline rows={2}/>
            </FormControl>

            <AllianceButton onClick={updateCategory} disabled={disabledBtn} mt={"1rem"} mb={"1rem"}>Оновити</AllianceButton>
        </div>
    );
}

export default AdminUpdateCategoryComponent;
