import {ProductService} from "../../../../service/ProductService";

import {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useCallbackPrompt} from "../../../../hooks/useCallbackPrompt";
import usePackaging from "../../../../hooks/usePackaging";
import useCharacteristics from "../../../../hooks/useCharacteristics";
import {useSnackbarContext} from "../../../../context/SnackbarContext";

import AllianceButton from "../../../../UI/allianceCupButton/allianceButton";
import {Divider, FormControl, MenuItem} from "@mui/material";
import {AllianceInputLabel, AllianceSelect, AllianceTextField} from "../../../../UI/styles";
import RouterDialog from "../../../../UI/dialogs/routerDialog/routerDialog";
import {fetchCategories} from "../../../../redux/shopRedux/shopFetch";
import AdminProductCharacteristicsForm from "./adminProductCharacteristicsForm";
import AdminProductPackagingForm from "./adminProductPackagingForm";
import classes from "./adminProduct.module.scss"
import ItemImage from "../../../../UI/ItemImage";

function AdminUpdateProductComponent() {
    const dispatch = useDispatch()
    const params = useParams()
    const snackbar = useSnackbarContext()

    const [showImgDialog, setShowImgDialog] = useState(false)
    const [showFormDialog, setShowFormDialog] = useState(false)
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

    const [disabledBtn, setDisabledBtn] = useState(false)

    useEffect(() => {
        ProductService.getProduct(params.id).then((res) => {
            setProduct(res?.data)

            const chars = Object.entries(res?.data?.characteristics).map(entry => ({
                name: entry[0],
                description: entry[1]
            }))
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
        setShowImgDialog(true)
    }

    const handleProductPrice = (event) => {
        let productPrice = parseFloat(event.target.value).toFixed(2)
        setProduct({
            ...product,
            price: productPrice || ""
        })
        setShowFormDialog(true)
    }

    const handleProductForm = (event) => {
        setProduct({...product, [event.target.name]: event.target.value})
        setShowFormDialog(true)
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
            ProductService.validateCharacteristics(characteristics, setCharacteristicsErr) &&
            ProductService.validatePackaging(packaging, setPackagingErr)
    }

    function changeImage() {
        let form = new FormData()

        form.append("file", productImg)
        form.append("id", product.id)

        setDisabledBtn(true)
        ProductService.updateProductImage(form).then(res => {
            if (res?.status === 200) {
                snackbar.setMessage("Фото успішно оновлено")
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

        setDisabledBtn(true)
        ProductService.updateProduct(productForm).then(res => {
            if (res?.status === 200) {
                snackbar.setMessage("Товар успішно оновлено")
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

            <h1>Зміна товару</h1>

            <div>
                <p>Фотографія</p>
                <ItemImage item={product} alt={"product"} cls={classes.updateProductImg}/>
                <input type={"file"} onChange={handleSetProductImg}/>
                <AllianceButton onClick={changeImage} disabled={disabledBtn} mt={"1rem"} mb={"1rem"}>Зберегти
                    фотографію</AllianceButton>
            </div>

            <Divider/>

            <div>
                <p className={classes.updateProductFormTitle}>Інформація</p>
                <FormControl className={classes.updateProductForm} fullWidth>
                    <FormControl sx={{minWidth: 200}}>
                        <AllianceInputLabel id={"selectCategory"}>Категорія</AllianceInputLabel>
                        <AllianceSelect
                            labelId={"selectCategory"}
                            label={"Категорія"}
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
                                       error={productErr.article} required
                    />
                    <AllianceTextField name={"productTitle"}
                                       label={"Назва"}
                                       value={product.productTitle}
                                       fullWidth
                                       onChange={handleProductForm}
                                       error={productErr.productTitle} required
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
                                       error={productErr.price} required
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
                <AllianceButton onClick={updateProduct} disabled={disabledBtn} mt={"1rem"} mb={"1rem"}>Оновити
                    товар</AllianceButton>
            </div>
        </div>
    );
}

export default AdminUpdateProductComponent;
