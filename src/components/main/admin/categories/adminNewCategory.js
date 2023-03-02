import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {useCallbackPrompt} from "../../../../hooks/useCallbackPrompt";
import {fetchCategories} from "../../../../redux/shopRedux/shopFetch";
import {CategoryService} from "../../../../service/CategoryService";
import {FormControl} from "@mui/material";
import {AllianceTextField} from "../../../../UI/styles";
import AllianceButton from "../../../../UI/allianceCupButton/allianceButton";
import RouterDialog from "../../../../UI/dialogs/routerDialog/routerDialog";

import classes from "../products/adminProduct.module.scss";
import {useSnackbarContext} from "../../../../context/SnackbarContext";

function AdminNewCategory() {
    const snackbar = useSnackbarContext()
    const [showDialog, setShowDialog] = useState(false)
    const [showPrompt, confirmNavigation, cancelNavigation] = useCallbackPrompt(showDialog)

    const [disabledBtn, setDisabledBtn] = useState(false)

    const dispatch = useDispatch()

    const [categoryForm, setCategoryForm] = useState({
        title: "",
        imgUrl: "",
        description: "",
    })
    const [categoryFormErr, setCategoryFormErr] = useState({title: false})

    useEffect(() => {
        dispatch(fetchCategories())
    }, [dispatch])

    const [categoryImg, setCategoryImg] = useState({})

    const handleCategoryForm = (event) => {
        setCategoryForm({...categoryForm, [event.target.name]: event.target.value})
        setShowDialog(true)
    }

    const handleSetCategoryImg = (event) => {
        setCategoryImg(event.target.files[0])
        setShowDialog(true)
    }

    const validate = () => {
        let tmp = {
            title: !categoryForm.title
        }

        setCategoryFormErr(tmp)

        return Object.values(tmp).every(item => item === false)
    }

    const newCategory = () => {
        if (!validate()) {
            snackbar.setMessage("Поля не пройшли валідацію")
            snackbar.handleClick()
        }

        let form = new FormData()

        form.append("file", categoryImg)
        form.append("categoryTitle", categoryForm.title)
        form.append("imgUrl", categoryForm.imgUrl)
        form.append("description", categoryForm.description)

        setDisabledBtn(true)
        CategoryService.addCategory(form).then(res => {
            if (res?.status === 200 || res?.status === 201) {
                snackbar.setMessage("Категорію успішно додано")
                snackbar.handleClick()
                setShowDialog(false)
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
            <p className={classes.newProductTitle}>Нова категорія</p>
            <FormControl className={classes.newProductInfo} fullWidth>
                <input type={"file"} onChange={handleSetCategoryImg}/>
                <AllianceTextField label="Назва" name={"title"} value={categoryForm.title}
                                   onChange={handleCategoryForm} required error={categoryFormErr.title}/>
                <AllianceTextField label="Посилання на фотографію" name={"imgUrl"} value={categoryForm.imgUrl}
                                   onChange={handleCategoryForm}/>
                <AllianceTextField label="Опис" name={"description"} value={categoryForm.description}
                                   onChange={handleCategoryForm} multiline rows={4}/>
            </FormControl>
            <AllianceButton onClick={newCategory} mt={"1rem"} mb={"1rem"} disabled={disabledBtn}>Додати</AllianceButton>
        </div>
    );
}

export default AdminNewCategory;
