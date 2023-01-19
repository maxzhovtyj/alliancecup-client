import {ProductService} from "../../../../service/ProductService";
import {ShoppingService} from "../../../../service/ShoppingService";
import {AdminService} from "../../../../service/AdminService";

import {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useSnackbar} from "../../../../hooks/useSnackbar";
import {useDispatch, useSelector} from "react-redux";
import {useCallbackPrompt} from "../../../../hooks/useCallbackPrompt";
import usePackaging from "../../../../hooks/usePackaging";
import useCharacteristics from "../../../../hooks/useCharacteristics";

import AllianceButton from "../../../../UI/allianceCupButton/allianceButton";
import {Divider, FormControl, MenuItem} from "@mui/material";
import {AllianceInputLabel, AllianceSelect, AllianceTextField} from "../../../../UI/styles";
import RouterDialog from "../../../../UI/dialogs/routerDialog/routerDialog";
import AllianceSnackbar from "../../../../UI/snackbar";
import {fetchCategories} from "../../../../redux/shopRedux/shopFetch";
import AdminProductCharacteristicsForm from "./adminProductCharacteristicsForm";
import AdminProductPackagingForm from "./adminProductPackagingForm";
import classes from "./adminProduct.module.scss"

function AdminUpdateProductComponent() {
    const dispatch = useDispatch()
    const params = useParams()
    const snackbar = useSnackbar()

    const [showDialog, setShowDialog] = useState(false)
    const [showPrompt, confirmNavigation, cancelNavigation] = useCallbackPrompt(showDialog)

    const categories = useSelector(state => state.shop.categories)
    const [product, setProduct] = useState({
        categoryTitle: "",
        imgUrl: "",
        price: "0.0",
        article: "",
        productTitle: ""
    })
    const [productErr, setProductErr] = useState({})

    const {
        characteristics,
        setCharacteristics,
        characteristicsErr,
        setCharacteristicsErr,
        handleAddCharacteristic,
        handleRemoveCharacteristics,
        handleCharacteristics
    } = useCharacteristics(setShowDialog)

    const {
        packaging,
        setPackaging,
        packagingErr,
        setPackagingErr,
        handlePackaging,
        handleAddPackaging,
        handleRemovePackaging,
    } = usePackaging(setShowDialog)

    const [productImg, setProductImg] = useState()

    useEffect(() => {
        ProductService.getProduct(params.id).then((res) => {
            setProduct(res?.data)

            const chars = Object.entries(res?.data?.characteristics).map(entry => ({name: entry[0], description: entry[1]}))
            const charsErr = Object.entries(res?.data?.characteristics).map(() => ({name: false, description: false}))
            setCharacteristics([...chars])
            setCharacteristicsErr([...charsErr])

            const packagingObj = Object.entries(res?.data?.packaging).map(entry => ({type: entry[0], amount: entry[1]}))
            const packagingObjErr = Object.entries(res?.data?.characteristics).map(() => ({type: false, amount: false}))
            setPackaging([...packagingObj])
            setPackagingErr([...packagingObjErr])
        })
    }, [params.id, setCharacteristics, setCharacteristicsErr, setPackaging, setPackagingErr])

    useEffect(() => {
        dispatch(fetchCategories())
    }, [dispatch])

    const handleSetProductImg = (event) => {
        setProductImg(event.target.files[0])
    }

    const handleProductPrice = (event) => {
        let productPrice = parseFloat(event.target.value).toFixed(2)
        setProduct({
            ...product,
            price: productPrice || ""
        })
        setShowDialog(true)
    }

    const handleProductForm = (event) => {
        setProduct({...product, [event.target.name]: event.target.value})
        setShowDialog(true)
    }

    const validateProduct = () => {
        let tmp = {}

        tmp.info = {
            article: !product.article,
            productTitle: !product.productTitle,
            price: !parseFloat(product.price),
        }

        setProductErr({...tmp.info})

        return Object.values(tmp.info).every(item => item === false) &&
            AdminService.validateCharacteristics(characteristics, setCharacteristicsErr) &&
            AdminService.validatePackaging(packaging, setPackagingErr)
    }

    function changeImage() {
        let form = new FormData()

        form.append("file", productImg)
        form.append("id", product.id)

        AdminService.updateProductImage(form).then(res => {
            if (res?.status === 200) {
                snackbar.setMessage("Фото успішно оновлено")
                snackbar.handleClick()
            } else {
                snackbar.setMessage(res?.message)
                snackbar.handleClick()
            }
        })
    }

    function updateProduct() {
        const productCharacteristics = {}
        characteristics.forEach(item => {
            productCharacteristics[`${item.name}`] = item.description
        })

        const productPackaging = {}
        packaging.forEach(item => {
            productPackaging[`${item.type}`] = item.amount
        })

        if (!validateProduct()) {
            snackbar.setMessage("Поля не пройшли валідацію")
            snackbar.handleClick()
            return
        }

        const productForm = {
            id: product.id,
            article: product.article,
            categoryTitle: product.categoryTitle,
            productTitle: product.productTitle,
            imgUrl: product.imgUrl,
            price: parseFloat(product.price),
            characteristics: productCharacteristics,
            packaging: productPackaging
        }

        AdminService.updateProduct(productForm).then(res => {
            if (res?.status === 200) {
                snackbar.setMessage("Товар успішно оновлено")
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

            <h1>Зміна товару</h1>

            <div>
                <p>Фотографія</p>
                <img src={ShoppingService.getImage(product)} alt="img" className={classes.updateProductImg}/>
                <input type={"file"} onChange={handleSetProductImg}/>
                <AllianceButton onClick={changeImage} mt={"1rem"} mb={"1rem"}>Зберегти фотографію</AllianceButton>
            </div>

            <Divider/>

            <div>
                <p className={classes.updateProductFormTitle}>Інформація</p>
                <FormControl className={classes.updateProductForm} fullWidth>
                    <FormControl sx={{minWidth: 200}}>
                        <AllianceInputLabel>Категорія</AllianceInputLabel>
                        <AllianceSelect
                            name="categoryTitle"
                            defaultValue={""}
                            value={product.categoryTitle || ""}
                            onChange={handleProductForm}
                            error={productErr.categoryTitle}
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
                    <AllianceTextField name={"article"}
                                       label={"Артикул"}
                                       value={product.article}
                                       onChange={handleProductForm}
                                       error={productErr.article}
                    />
                    <AllianceTextField name={"productTitle"}
                                       label={"Назва"}
                                       value={product.productTitle}
                                       fullWidth
                                       onChange={handleProductForm}
                                       error={productErr.productTitle}
                    />
                    <AllianceTextField name={"imgUrl"}
                                       label={"Посилання на фотографію"}
                                       value={product.imgUrl || ""}
                                       onChange={handleProductForm}
                    />
                    <AllianceTextField name={"price"}
                                       label={"Ціна"}
                                       value={product.price}
                                       onChange={handleProductPrice}
                                       error={productErr.price}
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
                <AllianceButton onClick={updateProduct} mt={"1rem"} mb={"1rem"}>Оновити товар</AllianceButton>
            </div>

            <AllianceSnackbar open={snackbar.open} message={snackbar.message} handleClose={snackbar.handleClose}/>
        </div>
    );
}

export default AdminUpdateProductComponent;