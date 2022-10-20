import classes from './adminOrder.module.scss'
import OrderInfo from "../../orders/orderInfo";
import {ShoppingService} from "../../../../service/ShoppingService";
import {NovaPoshtaService} from "../../../../service/NovaPoshtaService";
import {inTownOption, NovaOption} from "../../orders/order.component";
import {useEffect, useState} from "react";
import {
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import {AllianceTextField} from "../../../../UI/styles";
import AutoCompleteSelect from "../../../../UI/autoCompleteSelect/autoCompleteSelect";
import {ProductService} from "../../../../service/ProductService";
import DeleteIcon from "@mui/icons-material/Delete";
import AllianceButton from "../../../../UI/allianceCupButton/allianceButton";

function AdminNewOrderComponent() {
    const [productsOptions, setProductsOptions] = useState([])
    const [products, setProducts] = useState([
        {
            productId: null,
            product: null,
            quantity: 0,
            price: 0,
            priceForQuantity: 0,
        }
    ])

    const [isNovaPoshta, setIsNovaPoshta] = useState(false)
    const [isInTown, setIsInTown] = useState(false)

    const [deliveryTypes, setDeliveryTypes] = useState([])
    const [paymentTypes, setPaymentTypes] = useState([])

    const [cities, setCities] = useState([])
    const [departments, setDepartments] = useState([])

    const [city, setCity] = useState(null)
    const [department, setDepartment] = useState(null)

    const [address, setAddress] = useState(null)

    const [orderInfo, setOrderInfo] = useState({
        lastName: "",
        firstName: "",
        middleName: "",
        phone: "",
        email: "",
        comment: "",
        deliveryTypeTitle: "",
        paymentTypeTitle: "",
    })

    const [errors, setErrors] = useState({
        lastName: false,
        firstName: false,
        middleName: false,
        phone: false,
        email: false,
        deliveryTypeTitle: false,
        paymentTypeTitle: false,
        novaPoshtaCity: false,
        novaPoshtaDepartment: false,
        deliveryAddress: false
    })

    useEffect(() => {
        ShoppingService.fetchDeliveryTypes().then((res) => {
            setDeliveryTypes(res.deliveryTypes)
            setPaymentTypes(res.paymentTypes)
        })
    }, [])

    const handleOrderInfo = (e) => {
        if (e.target.value === NovaOption) {
            setIsInTown(false)
            setIsNovaPoshta(true)
        } else if (e.target.value === inTownOption) {
            setIsNovaPoshta(false)
            setIsInTown(true)
        } else if (e.target.name === "deliveryTypeTitle") {
            setIsNovaPoshta(false)
            setIsInTown(false)
        }

        setOrderInfo({...orderInfo, [e.target.name]: e.target.value})
    }

    const handleSetProductIdValue = (index, newValue) => {
        let values = [...products]
        if (newValue?.id) {
            values[index]["product"] = newValue
            values[index]["productId"] = newValue.id
            values[index]["price"] = newValue.price
            values[index]["priceForQuantity"] = newValue.price * values[index]["quantity"]
            setProducts(values)
        } else {
            values[index]["product"] = null
            values[index]["productId"] = null
            values[index]["price"] = 0
            values[index]["priceForQuantity"] = 0
            setProducts(values)
        }
    }

    const handleProductsOptions = (event) => {
        ProductService.search(event.target.value).then(res => {
            if (res.data) {
                setProductsOptions(res.data)
            }
        })
    }

    const handleProduct = (event, index) => {
        let values = [...products]
        const quantity = parseFloat(event.target.value) || 0
        values[index][event.target.name] = quantity
        values[index]["priceForQuantity"] = quantity * values[index]["price"]
        setProducts(values)
    }

    const handleCities = (event) => {
        NovaPoshtaService.getCities(event.target.value).then(res => setCities(res))
    }
    const handleDepartments = (cityValueRef) => {
        NovaPoshtaService.getDepartments(cityValueRef).then(res => setDepartments(res))
    }

    const handleSetCityValue = (event, newValue) => {
        setDepartment(null)
        setDepartments([])
        setCity(newValue)

        handleDepartments(newValue?.Ref)
    }

    const handleSetDepartmentValue = (event, newValue) => {
        setDepartment(newValue)
    }

    const handleRemovePayment = (index) => {
        const values = [...products]
        values.splice(index, 1)
        setProducts(values)
    }

    const handleAddProduct = () => {
        setProducts([...products, {
            productId: null,
            product: null,
            quantity: 0,
            price: 0,
            priceForQuantity: 0,
        }])
    }

    function makeOrder() {

    }

    return (
        <div>
            <p className={classes.pageTitle}>Нове замовлення</p>
            <div className={classes.newOrderInfoWrapper}>
                <OrderInfo
                    orderInfo={orderInfo}
                    handleOrderInfo={handleOrderInfo}
                    errors={errors}
                    deliveryTypes={deliveryTypes}
                    paymentTypes={paymentTypes}
                    isNovaPoshta={isNovaPoshta}
                    isInTown={isInTown}
                    setAddress={setAddress}
                    selectCities={{cities, handleCities, city, handleSetCityValue}}
                    selectDepartments={{departments, department, handleSetDepartmentValue}}
                />
            </div>
            <AllianceButton
                onClick={handleAddProduct}
                mb={"2rem"}
                mt={"2rem"}
                align={"left"}
            >
                Додати товар
            </AllianceButton>
            <TableContainer component={Paper} sx={{margin: "2rem 0"}}>
                <Table sx={{minWidth: 200}}>
                    <TableHead>
                        <TableRow>
                            <TableCell align={"center"}>Id</TableCell>
                            <TableCell align={"center"}>Товар</TableCell>
                            <TableCell align={"center"}>Ціна</TableCell>
                            <TableCell align={"center"}>Кількість</TableCell>
                            <TableCell align={"center"}>Сума</TableCell>
                            <TableCell align={"center"}> </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            (products)
                                ?
                                products.map((row, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                    >
                                        <TableCell align={"center"}>{row.product?.id}</TableCell>
                                        <TableCell align={"center"}>
                                            <AutoCompleteSelect
                                                options={productsOptions}
                                                onChange={handleProductsOptions}
                                                setValue={(event, newValue) => handleSetProductIdValue(index, newValue)}
                                                getOptionLabel={option => option.productTitle}
                                                noOptionsText={"Товарів не знайдено"}
                                                IsOptionEqualToValue={(option, value) => option.productTitle === value.productTitle}
                                            />
                                        </TableCell>
                                        <TableCell align={"center"}>{row.product?.price || 0} грн</TableCell>
                                        <TableCell align={"center"}>
                                            <AllianceTextField
                                                name={"quantity"}
                                                value={row.quantity}
                                                onChange={(event) => handleProduct(event, index)}
                                            />
                                        </TableCell>
                                        <TableCell align={"center"}>{row.priceForQuantity}</TableCell>
                                        <TableCell align={"center"}>
                                            <IconButton onClick={() => handleRemovePayment(index)}>
                                                <DeleteIcon/>
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                                : " "
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <AllianceButton onClick={makeOrder} mb={"1rem"}>
                Виконати замовлення
            </AllianceButton>
        </div>
    );
}

export default AdminNewOrderComponent;