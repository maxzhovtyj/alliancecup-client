import classes from './adminProduct.module.scss'
import {FormControl, MenuItem} from "@mui/material";
import {AllianceInputLabel, AllianceSelect, AllianceTextField} from "../../../../UI/styles";
import {useEffect, useState} from "react";
import {fetchCategories} from "../../../../redux/shopRedux/shopFetch";
import {useDispatch, useSelector} from "react-redux";
import AllianceButton from "../../../../UI/allianceCupButton/allianceButton";
import $api from "../../../../http/http";

function AdminNewProductComponent() {
    const dispatch = useDispatch()
    const categories = useSelector(state => state.shop.categories)

    const [productForm, setProductFrom] = useState({
        article: "",
        categoryTitle: "",
        productTitle: "",
        imgUrl: "",
        amountInStock: 0,
        price: 0,
    })

    useEffect(() => {
        dispatch(fetchCategories())
    }, [dispatch])

    const [characteristics, setCharacteristics] = useState([{}])
    const [packaging, setPackaging] = useState([{}])
    const [productImg, setProductImg] = useState({})

    const handleProductForm = (event) => {
        setProductFrom({...productForm, [event.target.name]: event.target.value})
    }

    const handleSetCategoryIdValue = (newValue) => {

    }

    const handleSetProductImg = (event) => {
        setProductImg(event.target.files[0])
    }

    const newProduct = () => {
        // TODO form data
        let form = new FormData()

        form.append("file", productImg)
        form.append("categoryTitle", "Одноразові стакани")
        form.append("article", productForm.article)
        form.append("productTitle", productForm.productTitle)
        form.append("imgUrl", productForm.imgUrl)
        form.append("amountInStock", productForm.amountInStock)
        form.append("price", productForm.price)

        for (let p of form) {
            console.log(p);
        }

        const addProduct = async () => {
            return await $api.post("api/admin/product", form)
        }

        addProduct().then(res => {
            console.log(res)
        })
    }
    return (
        <div>
            <p className={classes.newProductTitle}>Новий товар</p>
            <FormControl className={classes.newProductInfo}>
                <input type={"file"} onChange={handleSetProductImg}/>
                <FormControl>
                    <AllianceInputLabel>Категорія</AllianceInputLabel>
                    <AllianceSelect
                        defaultValue={""}
                        name={"categoryTitle"}
                        label={"Категорія"}
                        value={productForm.categoryTitle}
                        onChange={handleProductForm}
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
                <AllianceTextField label="Артикул" name={"article"} value={productForm.article}
                                   onChange={handleProductForm}/>
                <AllianceTextField label="Назва" name={"productTitle"} value={productForm.productTitle}
                                   onChange={handleProductForm}/>
                <AllianceTextField label="Посилання на фотографію" name={"imgUrl"} value={productForm.imgUrl}
                                   onChange={handleProductForm}/>
                <AllianceTextField label="Кількість на складі" name={"amountInStock"} value={productForm.amountInStock}
                                   onChange={handleProductForm}/>
                <AllianceTextField label="Ціна" name={"price"} value={productForm.price} onChange={handleProductForm}/>
            </FormControl>
            <AllianceButton onClick={newProduct} mt={"1rem"} mb={"1rem"}>Додати</AllianceButton>
        </div>
    );
}

export default AdminNewProductComponent;