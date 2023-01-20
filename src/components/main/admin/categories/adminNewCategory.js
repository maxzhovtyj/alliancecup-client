import {useDispatch} from "react-redux";
import {fetchCategories} from "../../../../redux/shopRedux/shopFetch";
import classes from "../products/adminProduct.module.scss";
import {FormControl} from "@mui/material";
import AllianceButton from "../../../../UI/allianceCupButton/allianceButton";
import {useEffect, useState} from "react";
import {AdminService} from "../../../../service/AdminService";
import {useSnackbar} from "../../../../hooks/useSnackbar";
import {AllianceTextField} from "../../../../UI/styles";
import AllianceSnackbar from "../../../../UI/snackbar";
import RouterDialog from "../../../../UI/dialogs/routerDialog/routerDialog";
import {useCallbackPrompt} from "../../../../hooks/useCallbackPrompt";

function AdminNewCategory() {
    const snackbar = useSnackbar()
    const [showDialog, setShowDialog] = useState(false)
    const [showPrompt, confirmNavigation, cancelNavigation] = useCallbackPrompt(showDialog)

    const dispatch = useDispatch()

    const [categoryForm, setCategoryForm] = useState({
        title: "",
        imgUrl: "",
        description: "",
    })

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

    const newCategory = () => {
        let form = new FormData()

        form.append("file", categoryImg)
        form.append("categoryTitle", categoryForm.title)
        form.append("imgUrl", categoryForm.imgUrl)
        form.append("description", categoryForm.description)

        AdminService.addCategory(form).then(res => {
            snackbar.setMessage(res?.message)
            snackbar.handleClick()

            if (res?.status === 200 || res?.status === 201) {
                setShowDialog(false)
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
            <p className={classes.newProductTitle}>Нова категорія</p>
            <FormControl className={classes.newProductInfo} fullWidth>
                <input type={"file"} onChange={handleSetCategoryImg}/>
                <AllianceTextField label="Назва" name={"title"} value={categoryForm.title}
                                   onChange={handleCategoryForm}/>
                <AllianceTextField label="Посилання на фотографію" name={"imgUrl"} value={categoryForm.imgUrl}
                                   onChange={handleCategoryForm}/>
                <AllianceTextField label="Опис" name={"description"} value={categoryForm.description}
                                   onChange={handleCategoryForm} multiline rows={4}/>
            </FormControl>
            <AllianceButton onClick={newCategory} mt={"1rem"} mb={"1rem"}>Додати</AllianceButton>
            <AllianceSnackbar message={snackbar.message} handleClose={snackbar.handleClose} open={snackbar.open}/>
        </div>
    );
}

export default AdminNewCategory;