import classes from './adminProduct.module.scss'
import {FormControl, MenuItem} from "@mui/material";
import {AllianceSelect, AllianceTextField} from "../../../../UI/styles";
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
        categoryId: "",
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
        
        form.append("form", "some form data")

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
                <input type={"file"} onChange={handleSetProductImg} />
                <AllianceSelect
                    defaultValue={""}
                    name={"categoryId"}
                    label="Категорія"
                    value={productForm.categoryId}
                    onChange={handleProductForm}
                >
                    <MenuItem value=""><em>None</em></MenuItem>
                    {
                        categories?.map(item =>
                            <MenuItem value={item.id} key={item.id}>
                                {item.categoryTitle}
                            </MenuItem>)
                    }
                </AllianceSelect>
                <AllianceTextField name={"article"} value={productForm.article} onChange={handleProductForm}/>
                <AllianceTextField name={"productTitle"} value={productForm.productTitle} onChange={handleProductForm}/>
                <AllianceTextField name={"imgUrl"} value={productForm.imgUrl} onChange={handleProductForm}/>
                <AllianceTextField name={"amountInStock"} value={productForm.amountInStock} onChange={handleProductForm}/>
                <AllianceTextField name={"price"} value={productForm.price} onChange={handleProductForm}/>
            </FormControl>
            <AllianceButton onClick={newProduct}>Додати</AllianceButton>
        </div>
    );
}

export default AdminNewProductComponent;