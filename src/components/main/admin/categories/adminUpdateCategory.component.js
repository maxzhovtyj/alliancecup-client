import {useEffect, useState} from "react";
import {CategoryService} from "../../../../service/CategoryService";
import {useParams} from "react-router-dom";
import {ShoppingService} from "../../../../service/ShoppingService";
import AllianceButton from "../../../../UI/allianceCupButton/allianceButton";
import {Divider, FormControl} from "@mui/material";

import classes from "./adminCategories.module.scss"
import {AllianceTextField} from "../../../../UI/styles";
import {useSnackbar} from "../../../../hooks/useSnackbar";
import {useCallbackPrompt} from "../../../../hooks/useCallbackPrompt";
import AllianceSnackbar from "../../../../UI/snackbar";
import RouterDialog from "../../../../UI/dialogs/routerDialog/routerDialog";

function AdminUpdateCategoryComponent() {
    const params = useParams()

    const snackbar = useSnackbar()
    const [showDialog, setShowDialog] = useState(false)
    const [showPrompt, confirmNavigation, cancelNavigation] = useCallbackPrompt(showDialog)

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

    const [categoryImg, setCategoryImg] = useState({})

    useEffect(() => {
        CategoryService.getCategory(params.id).then(res => {
            setCategory(res?.data)
        })
    }, [params.id])

    const handleCategoryForm = (event) => {
        setCategory({...category, [event.target.name]: event.target.value})
        setShowDialog(true)
    }

    const handleSetCategoryImg = (event) => {
        setCategoryImg(event.target.files[0])
        setShowDialog(true)
    }

    function updateCategoryImage() {
        let form = new FormData()

        form.append("file", categoryImg)
        form.append("id", category.id)

        CategoryService.updateCategoryImage(form).then(res => {
            if (res?.status === 200 || res?.status === 201) {
                snackbar.setMessage("Фотографію успішно оновлено")
                snackbar.handleClick()
                setShowDialog(false)
            } else {
                snackbar.setMessage(res?.message)
                snackbar.handleClick()
            }
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

        CategoryService.updateCategory(category).then(res => {
            if (res?.status === 200) {
                snackbar.setMessage("Категорію успішно оновлено")
                snackbar.handleClick()
            } else {
                snackbar.setMessage(res?.message)
                snackbar.handleClick()
            }
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
                <input type={"file"} onClick={handleSetCategoryImg}/>
                <AllianceButton onClick={updateCategoryImage} mt={"1rem"} mb={"1rem"}>Оновити</AllianceButton>
            </div>

            <Divider/>

            <FormControl className={classes.updateCategoryForm} fullWidth>
                <p>Інформація</p>

                <AllianceTextField label="Назва" name={"categoryTitle"} value={category.categoryTitle}
                                   onChange={handleCategoryForm} error={categoryErr.categoryTitle}/>
                <AllianceTextField label="Посилання на фотографію" name={"imgUrl"} value={category.imgUrl || ""}
                                   onChange={handleCategoryForm} error={categoryErr.imgUrl}/>
                <AllianceTextField label="Опис" name={"description"} value={category.description || ""}
                                   onChange={handleCategoryForm} error={categoryErr.description} multiline rows={2}/>
            </FormControl>

            <AllianceButton onClick={updateCategory} mt={"1rem"} mb={"1rem"}>Оновити</AllianceButton>

            <AllianceSnackbar message={snackbar.message} handleClose={snackbar.handleClose} open={snackbar.open}/>
        </div>
    );
}

export default AdminUpdateCategoryComponent;