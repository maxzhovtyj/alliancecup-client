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
import AddIcon from "@mui/icons-material/Add";
import {FormControl, IconButton, MenuItem} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

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

    const [characteristics, setCharacteristics] = useState([{
        name: "", description: ""
    }])
    const [characteristicsErr, setCharacteristicsErr] = useState([{
        name: false, description: false
    }])

    const [packaging, setPackaging] = useState([{
        type: "", amount: 0,
    }])
    const [packagingErr, setPackagingErr] = useState([{
        type: false, amount: false,
    }])

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

    const handleCharacteristics = (event, index) => {
        const values = [...characteristics]
        values[index][event.target.name] = event.target.value
        setCharacteristics(values)
        setShowDialog(true)
    }

    const handleAddCharacteristic = () => {
        setCharacteristics([...characteristics, {name: "", description: ""}])
        setCharacteristicsErr([...characteristicsErr, {name: false, description: false}])
        setShowDialog(true)
    }

    const handleRemoveCharacteristics = (index) => {
        const values = [...characteristics]
        values.splice(index, 1)
        setCharacteristics(values)

        const valuesErr = [...characteristicsErr]
        valuesErr.splice(index, 1)
        setCharacteristicsErr(valuesErr)

        setShowDialog(true)
    }

    const handlePackaging = (event, index) => {
        const values = [...packaging]
        values[index][event.target.name] = event.target.value
        setPackaging(values)

        setShowDialog(true)
    }

    const handleAddPackaging = () => {
        setPackaging([...packaging, {type: "", amount: 0}])
        setPackagingErr([...packagingErr, {type: false, amount: false}])

        setShowDialog(true)
    }

    const handleRemovePackaging = (index) => {
        const values = [...packaging]
        values.splice(index, 1)
        setPackaging(values)

        const valuesErr = [...packagingErr]
        valuesErr.splice(index, 1)
        setPackagingErr(valuesErr)

        setShowDialog(true)
    }

    const validate = () => {
        let tmp = {}

        tmp.info = {
            article: !productForm.article,
            categoryTitle: !productForm.categoryTitle,
            productTitle: !productForm.productTitle,
            amountInStock: !(productForm.amountInStock >= 0),
            price: !parseFloat(productForm.price),
        }

        setProductFormErr({...tmp.info})

        const resProductChar = []
        const productCharacteristics = {}
        characteristics.forEach(item => {
            resProductChar.push({
                name: !(item.name && !(item.name in productCharacteristics)),
                description: !item.description,
            })
            productCharacteristics[`${item.name}`] = item.description
        })

        setCharacteristicsErr([...resProductChar])

        const resProductPackaging = []
        const productPackaging = {}
        packaging.forEach(item => {
            resProductPackaging.push({
                type: !(item.type && !(item.type in productPackaging)),
                amount: !item.amount,
            })
            productPackaging[`${item.type}`] = item.amount
        })

        setPackagingErr([...resProductPackaging])

        const validateProductInfo = Object.values(tmp.info).every(item => item === false)

        const validateCharacteristics = resProductChar
            .map(value => Object.values(value).every(el => el === false))
            .every(item => item === true)

        const validatePackaging = resProductPackaging
            .map(value => Object.values(value).every(el => el === false))
            .every(item => item === true)

        return validateProductInfo && validateCharacteristics && validatePackaging
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
        form.append("categoryTitle", "Одноразові стакани")
        form.append("article", productForm.article)
        form.append("productTitle", productForm.productTitle)
        form.append("imgUrl", productForm.imgUrl)
        form.append("characteristic", JSON.stringify(productCharacteristics))
        form.append("packaging", JSON.stringify(productPackaging))
        form.append("amountInStock", productForm.amountInStock)
        form.append("price", productForm.price)

        AdminService.addProduct(form).then(res => {
            snackbar.setMessage(res.message)
            snackbar.handleClick()
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
                        label="Категорія"
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
                <div className={classes.specifications}>
                    <div className={classes.specificationsTitle}>
                        <p>Характеристики</p>
                        <IconButton onClick={handleAddCharacteristic}>
                            <AddIcon/>
                        </IconButton>
                    </div>
                    <div className={classes.specificationsList}>
                        {characteristics.map((item, index) => {
                            return (
                                <div className={classes.specificationsItem} key={index}>
                                    <AllianceTextField
                                        label={"Назва"}
                                        name={"name"}
                                        value={item.name}
                                        onChange={(event) => handleCharacteristics(event, index)}
                                        error={characteristicsErr[index]["name"]}
                                    />
                                    <AllianceTextField
                                        label={"Опис"}
                                        name={"description"}
                                        value={item.description}
                                        onChange={(event) => handleCharacteristics(event, index)}
                                        error={characteristicsErr[index]["description"]}
                                    />
                                    <IconButton
                                        onClick={() => handleRemoveCharacteristics(index)}
                                    >
                                        <DeleteIcon/>
                                    </IconButton>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className={classes.specifications}>
                    <div className={classes.specificationsTitle}>
                        <p>Пакування</p>
                        <IconButton onClick={handleAddPackaging}>
                            <AddIcon/>
                        </IconButton>
                    </div>
                    <div className={classes.specificationsList}>
                        {packaging.map((item, index) => {
                            return (
                                <div className={classes.specificationsItem} key={index}>
                                    <AllianceTextField
                                        label={"Тип"}
                                        name={"type"}
                                        value={item.type}
                                        onChange={(event) => handlePackaging(event, index)}
                                        error={packagingErr[index]["type"]}
                                    />
                                    <AllianceTextField
                                        label={"Кількість"}
                                        name={"amount"}
                                        value={item.amount}
                                        onChange={(event) => handlePackaging(event, index)}
                                        error={packagingErr[index]["amount"]}
                                    />
                                    <IconButton
                                        onClick={() => handleRemovePackaging(index)}
                                    >
                                        <DeleteIcon/>
                                    </IconButton>
                                </div>
                            )
                        })}
                    </div>
                </div>

            </FormControl>

            <AllianceButton onClick={newProduct} mt={"1rem"} mb={"1rem"}>Додати</AllianceButton>

            <AllianceSnackbar open={snackbar.open} message={snackbar.message} handleClose={snackbar.handleClose}/>
        </div>
    );
}

export default AdminNewProductComponent;