import {useDispatch, useSelector} from "react-redux";
import {fetchCategories} from "../../../../redux/shopRedux/shopFetch";
import classes from "../products/adminProduct.module.scss";
import {FormControl} from "@mui/material";
import AllianceButton from "../../../../UI/allianceCupButton/allianceButton";
import {useEffect, useState} from "react";
import {AdminService} from "../../../../service/AdminService";
import {useSnackbar} from "../../../../hooks/useSnackbar";
import {AllianceTextField} from "../../../../UI/styles";
import AllianceSnackbar from "../../../../UI/snackbar";

function AdminNewCategory() {
    const snackbar = useSnackbar()

    const dispatch = useDispatch()
    const categories = useSelector(state => state.shop.categories)

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
    }

    const handleSetCategoryImg = (event) => {
        setCategoryImg(event.target.files[0])
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
        })
    }
    return (
        <div>
            <p className={classes.newProductTitle}>Нова категорія</p>
            <FormControl className={classes.newProductInfo}>
                <input type={"file"} onChange={handleSetCategoryImg}/>
                <AllianceTextField label="Назва" name={"title"} value={categoryForm.title}
                                   onChange={handleCategoryForm}/>
                <AllianceTextField label="Посилання на фотографію" name={"imgUrl"} value={categoryForm.imgUrl}
                                   onChange={handleCategoryForm}/>
                <AllianceTextField label="Опис" name={"description"} value={categoryForm.description}
                                   onChange={handleCategoryForm}/>
            </FormControl>
            <AllianceButton onClick={newCategory} mt={"1rem"} mb={"1rem"}>Додати</AllianceButton>
            <AllianceSnackbar message={snackbar.message} handleClose={snackbar.handleClose} open={snackbar.open}/>
        </div>
    );
}

export default AdminNewCategory;