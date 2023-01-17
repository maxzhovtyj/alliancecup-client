import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useSnackbar} from "../../../../hooks/useSnackbar";
import {useCallbackPrompt} from "../../../../hooks/useCallbackPrompt";

import {fetchCategories} from "../../../../redux/shopRedux/shopFetch";
import {AdminService} from "../../../../service/AdminService";

import classes from './adminProduct.module.scss'
import RouterDialog from "../../../../UI/dialogs/routerDialog/routerDialog";
import AllianceButton from "../../../../UI/allianceCupButton/allianceButton";
import AllianceSnackbar from "../../../../UI/snackbar";
import {AllianceInputLabel, AllianceSelect, AllianceTextField} from "../../../../UI/styles";
import {FormControl, MenuItem} from "@mui/material";
import usePackaging from "../../../../hooks/usePackaging";
import useCharacteristics from "../../../../hooks/useCharacteristics";
import AdminProductCharacteristicsForm from "./adminProductCharacteristicsForm";
import AdminProductPackagingForm from "./adminProductPackagingForm";

function AdminNewProductComponent() {
    const snackbar = useSnackbar()
    const [showDialog, setShowDialog] = useState(false)
    const [showPrompt, confirmNavigation, cancelNavigation] = useCallbackPrompt(showDialog)

    const dispatch = useDispatch()
    const categories = useSelector(state => state.shop.categories)

    const [productForm, setProductForm] = useState({
        article: "",
        categoryTitle: "",
        productTitle: "",
        imgUrl: "",
        amountInStock: 0,
        price: "0.0",
    })

    const [productFormErr, setProductFormErr] = useState({
        article: false,
        categoryTitle: false,
        productTitle: false,
        amountInStock: false,
        price: false,
    })

    const {
        characteristics,
        characteristicsErr,
        setCharacteristicsErr,
        handleAddCharacteristic,
        handleRemoveCharacteristics,
        handleCharacteristics
    } = useCharacteristics(setShowDialog)

    const {
        packaging,
        packagingErr,
        setPackagingErr,
        handlePackaging,
        handleAddPackaging,
        handleRemovePackaging,
    } = usePackaging(setShowDialog)

    const [productImg, setProductImg] = useState({})

    useEffect(() => {
        dispatch(fetchCategories())
    }, [dispatch])

    const handleProductForm = (event) => {
        setProductForm({...productForm, [event.target.name]: event.target.value})
        setShowDialog(true)
    }

    const handleProductAmountInStock = (event) => {
        setProductForm({...productForm, amountInStock: parseInt(event.target.value)})
        setShowDialog(true)
    }

    const handleProductPrice = (event) => {
        let productPrice = parseFloat(event.target.value).toFixed(2)
        setProductForm({
            ...productForm,
            price: productPrice || ""
        })
        setShowDialog(true)
    }

    const handleSetProductImg = (event) => {
        setProductImg(event.target.files[0])
        setShowDialog(true)
    }

    const validate = () => {
        let tmp = {
            article: !productForm.article,
            categoryTitle: !productForm.categoryTitle,
            productTitle: !productForm.productTitle,
            amountInStock: !(productForm.amountInStock >= 0),
            price: !parseFloat(productForm.price),
        }

        setProductFormErr(tmp)

        return Object.values(tmp).every(item => item === false) &&
            AdminService.validateCharacteristics(characteristics, setCharacteristicsErr) &&
            AdminService.validatePackaging(packaging, setPackagingErr)
    }

    const newProduct = () => {
        const productCharacteristics = {}
        characteristics.forEach(item => {
            productCharacteristics[`${item.name}`] = item.description
        })

        const productPackaging = {}
        packaging.forEach(item => {
            productPackaging[`${item.type}`] = item.amount
        })

        if (!validate()) {
            snackbar.setMessage("Поля не пройшли валідацію")
            snackbar.handleClick()
            return
        }

        let form = new FormData()

        form.append("file", productImg)
        form.append("categoryTitle", productForm.categoryTitle)
        form.append("article", productForm.article)
        form.append("productTitle", productForm.productTitle)
        form.append("imgUrl", productForm.imgUrl)
        form.append("characteristic", JSON.stringify(productCharacteristics))
        form.append("packaging", JSON.stringify(productPackaging))
        form.append("amountInStock", productForm.amountInStock)
        form.append("price", productForm.price)

        AdminService.addProduct(form).then(res => {
            if (res?.status === 200 || res?.status === 201) {
                snackbar.setMessage("Товар успішно додано")
                snackbar.handleClick()
                setShowDialog(false)
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

            <p className={classes.newProductTitle}>Новий товар</p>

            <FormControl className={classes.newProductInfo}>
                <input type={"file"} onChange={handleSetProductImg}/>
                <FormControl sx={{minWidth: 200}}>
                    <AllianceInputLabel>Категорія</AllianceInputLabel>
                    <AllianceSelect
                        defaultValue={""}
                        name="categoryTitle"
                        value={productForm.categoryTitle}
                        onChange={handleProductForm}
                        error={productFormErr.categoryTitle}
                    >
                        <MenuItem value=""><em>None</em></MenuItem>
                        {
                            categories?.map(item =>
                                <MenuItem value={item.categoryTitle} key={item.id}>
                                    {item.categoryTitle}
                                </MenuItem>)
                        }
                    </AllianceSelect>
                </FormControl>
                <AllianceTextField label="Артикул" name={"article"}
                                   value={productForm.article}
                                   onChange={handleProductForm}
                                   error={productFormErr.article}
                />
                <AllianceTextField label="Назва" name={"productTitle"}
                                   value={productForm.productTitle}
                                   onChange={handleProductForm}
                                   error={productFormErr.productTitle}
                />
                <AllianceTextField label="Посилання на фотографію" name={"imgUrl"}
                                   value={productForm.imgUrl}
                                   onChange={handleProductForm}
                />
                <AllianceTextField label="Кількість на складі" name={"amountInStock"}
                                   value={productForm.amountInStock}
                                   onChange={handleProductAmountInStock}
                                   error={productFormErr.amountInStock}
                />
                <AllianceTextField label={"Ціна"}
                                   name={"price"}
                                   value={productForm.price}
                                   onChange={handleProductPrice}
                                   error={productFormErr.price}
                />

                <AdminProductCharacteristicsForm
                    characteristics={characteristics}
                    characteristicsErr={characteristicsErr}
                    handleCharacteristics={handleCharacteristics}
                    handleRemoveCharacteristics={handleRemoveCharacteristics}
                    handleAddCharacteristic={handleAddCharacteristic}
                />

                <AdminProductPackagingForm
                    packaging={packaging}
                    handlePackaging={handlePackaging}
                    handleAddPackaging={handleAddPackaging}
                    handleRemovePackaging={handleRemovePackaging}
                    packagingErr={packagingErr}
                />

            </FormControl>

            <AllianceButton onClick={newProduct} mt={"1rem"} mb={"1rem"}>Додати</AllianceButton>

            <AllianceSnackbar open={snackbar.open} message={snackbar.message} handleClose={snackbar.handleClose}/>
        </div>
    );
}

export default AdminNewProductComponent;