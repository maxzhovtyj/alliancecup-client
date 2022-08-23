import {useContext, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AuthContext} from "../../../context/AuthContext";

import {fetchUserCart} from "../../../redux/userCartRedux/fetchUserCart";

import CartItem from "./cartItem";
import AutoCompleteSelect from "../../../UI/autoCompleteSelect/autoCompleteSelect";
import SimpleSnackbar from "../../../UI/snackbar";

import classes from "./cart.module.scss";
import {FormControl, InputLabel, MenuItem, Select, TextField, ThemeProvider} from "@mui/material";
import Button from "@mui/material/Button";

import {muiTextBtnTheme, muiTextField} from "../../../UI/styles";
import {TextMaskCustom} from "../../../utils/TextMask";

import axios from "axios";
import {useSnackbar} from "../../../hooks/useSnackbar";

import {useNavigate} from "react-router-dom";
import {ShoppingService} from "../../../service/ShoppingService";

const novaAccessKey = "6e42ef74bae876c04fb84dcc2912126a"
const NovaOption = "Нова Пошта"
const inTownOption = "Доставка AllianceCup по м. Рівне"

const validate = (values, setErrors) => {
    let tmp = {}

    tmp.lastName = values.lastName ? "" : "This field is required"
    tmp.firstName = values.firstName ? "" : "This field is required"
    tmp.middleName = values.middleName ? "" : "This field is required"

    tmp.email = (/$|.+@.+..+/).test(values.email) ? "" : "Invalid email"
    tmp.phone = values.phone.length > 19 ? "" : "Invalid phone"

    setErrors({...tmp})

    return Object.values(tmp).every(value => value === "")
}

function NewOrderComponent() {
    const navigate = useNavigate()

    const {isAuth} = useContext(AuthContext)

    const {open, message, handleClose, setMessage, handleClick} = useSnackbar()

    const dispatch = useDispatch()
    const cartProducts = useSelector(state => state.cartPage)

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
    })

    const [disabled, setDisabled] = useState(false)

    const handleOrderInfo = (e) => {
        if (e.target.value === NovaOption) {
            setIsInTown(false)
            setIsNovaPoshta(true)
        } else if (e.target.value === inTownOption) {
            setIsNovaPoshta(false)
            setIsInTown(true)
        } else {
            setIsNovaPoshta(false)
            setIsInTown(false)
        }

        setOrderInfo({...orderInfo, [e.target.name]: e.target.value})
    }

    function makeNewOrder() {
        const makeOrderForm = {
            info: {
                user_lastname: orderInfo.lastName,
                user_firstname: orderInfo.firstName,
                user_middle_name: orderInfo.middleName,
                user_phone_number: orderInfo.phone,
                user_email: orderInfo.email,
                order_sum_price: cartProducts.sum,
                delivery_type_title: orderInfo.deliveryTypeTitle,
                payment_type_title: orderInfo.paymentTypeTitle
            }
        }

        if (isNovaPoshta) {
            if (city === "" || department === "") {
                handleClick()
                setMessage("Ви не заповнили усі поля")
                return
            }
            makeOrderForm.delivery = [
                {delivery_title: "Місто", delivery_description: city.Description},
                {delivery_title: "Відділення", delivery_description: department.Description},
            ]
        }
        if (isInTown) {
            if (address === "") {
                handleClick()
                setMessage("Ви не заповнили усі поля")
                return
            }
            makeOrderForm.delivery = [
                {delivery_description: "Адрес", delivery_title: address},
            ]
        }

        makeOrderForm.products = cartProducts.cart

        console.log(makeOrderForm)
        return;
        ShoppingService.newOrder(makeOrderForm, setMessage, handleClick)
            .then(() => {
                setMessage("Ваше замовлення надіслано")
                handleClick()
                setDisabled(true)
                navigate("/")
            })
    }

    async function getCities(findByString) {
        const response = await axios.post('https://api.novaposhta.ua/v2.0/json/', {
            apiKey: novaAccessKey,
            modelName: "Address",
            calledMethod: "getCities",
            methodProperties: {
                FindByString: findByString
            },
        })
        setCities(JSON.parse(JSON.stringify(response.data.data)))
    }

    async function getDepartments(cityRef) {
        const response = await axios.post('https://api.novaposhta.ua/v2.0/json/', {
            apiKey: novaAccessKey,
            modelName: "Address",
            calledMethod: "getWarehouses",
            methodProperties: {
                CityRef: cityRef
            }
        })
        setDepartments(JSON.parse(JSON.stringify(response.data.data)))
    }

    useEffect(() => {
        dispatch(fetchUserCart(isAuth))
    }, [dispatch, isAuth])

    useEffect(() => {
        if (!cartProducts.cart) {
            navigate("/")
        }
    }, [cartProducts.cart, navigate])

    useEffect(() => {
        ShoppingService.fetchDeliveryTypes().then((res) => {
            setDeliveryTypes(res.deliveryTypes)
            setPaymentTypes(res.paymentTypes)
        })
    }, [])

    const handleCities = (event) => {
        getCities(event.target.value).then((req, res) => {
            if (res) {
                console.log(res)
            }
        })
    }

    const handleDepartments = (cityValueRef) => {
        getDepartments(cityValueRef).then((req, res) => {
            if (res) {
                console.log()
            }
        })
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
    return (
        <div className={classes.orderPage}>
            <div className={classes.orderForm}>
                <div className={classes.orderPersonalInfo}>
                    <div className={classes.orderLFM}>
                        <TextField
                            className={classes.orderField}
                            name={"lastName"}
                            required
                            label="Призвіще"
                            value={orderInfo.lastName}
                            onChange={handleOrderInfo}
                            error={errors.lastName}
                        />
                        <TextField
                            className={classes.orderField}
                            name={"firstName"}
                            required
                            label="Ім'я"
                            value={orderInfo.firstName}
                            onChange={handleOrderInfo}
                            error={errors.firstName}
                        />
                        <TextField
                            className={classes.orderField}
                            name={"middleName"}
                            required
                            label="По батькові"
                            value={orderInfo.middleName}
                            onChange={handleOrderInfo}
                            error={errors.middleName}
                        />
                    </div>
                    <div className={classes.orderContactInfo}>
                        <TextField
                            required
                            name="phone"
                            id="phone"
                            label="Номер телефону"
                            InputProps={{
                                inputComponent: TextMaskCustom
                            }}
                            value={orderInfo.phone}
                            onChange={handleOrderInfo}
                            error={errors.phone}
                        />
                        <TextField
                            sx={{muiTextField}}
                            name={"email"}
                            required
                            label="Email"
                            value={orderInfo.email}
                            onChange={handleOrderInfo}
                            error={errors.email}
                        />
                    </div>
                </div>
                <FormControl className={classes.deliveryForm}>
                    <InputLabel id="demo-simple-select-label">Доставка</InputLabel>
                    <Select
                        required
                        name={"deliveryTypeTitle"}
                        labelId="delivery"
                        id="delivery-id"
                        label="Доставка"
                        value={orderInfo.deliveryTypeTitle}
                        onChange={handleOrderInfo}
                        error={errors.deliveryTypeTitle}
                    >
                        {
                            deliveryTypes?.map(item => <MenuItem value={item.delivery_type_title}
                                                                 key={item.id}>{item.delivery_type_title}</MenuItem>)
                        }
                    </Select>
                </FormControl>
                {
                    isNovaPoshta
                        ?
                        <div className={classes.novaPoshtaDelivery}>
                            <AutoCompleteSelect
                                label={"Місто"}
                                width={300}
                                options={cities}
                                onChange={handleCities}
                                value={city}
                                setValue={handleSetCityValue}
                                getOptionLabel={option => option.Description}
                            />
                            <AutoCompleteSelect
                                label={"Відділення"}
                                width={300}
                                options={departments}
                                value={department}
                                setValue={handleSetDepartmentValue}
                                getOptionLabel={option => option.Description}
                            />
                        </div>
                        : ""
                }
                {
                    isInTown
                        ?
                        <div>
                            <TextField
                                name={"address"}
                                label={"Адреса"}
                                sx={{marginBottom: "1rem", width: "80%"}}
                                onChange={event => setAddress(event.target.value)}
                            />
                        </div>
                        : ""
                }
                <FormControl className={classes.deliveryForm}>
                    <InputLabel id="payment-label-id">Спосіб оплати</InputLabel>
                    <Select
                        name={"paymentTypeTitle"}
                        labelId="payment"
                        id="payment-id"
                        label="Спосіб доставки"
                        value={orderInfo.paymentTypeTitle}
                        onChange={handleOrderInfo}
                        error={errors.paymentTypeTitle}
                    >
                        {
                            paymentTypes.map(item =>
                                <MenuItem value={item.payment_type_title} key={item.id}>
                                    {item.payment_type_title}
                                </MenuItem>)
                        }
                    </Select>
                </FormControl>
                <TextField
                    name={"comment"}
                    fullWidth
                    id="outlined-multiline-static"
                    label="Коментар"
                    multiline
                    rows={4}
                    defaultValue=""
                    onChange={handleOrderInfo}
                />
                <ThemeProvider theme={muiTextBtnTheme}>
                    <Button disabled={disabled} sx={{marginTop: "1rem"}} color={"alliance"} variant={"outlined"}
                            onClick={makeNewOrder}>Зробити замовлення</Button>
                </ThemeProvider>
            </div>
            <div className={classes.productsList}>
                {
                    cartProducts?.cart?.map(item => <CartItem product={item} key={item.product_id} order={true}/>)
                }
                <p className={classes.orderSum}>Сума замовлення: {cartProducts.sum}</p>
            </div>

            <SimpleSnackbar open={open} message={message} handleClose={handleClose}/>
        </div>
    );
}

export default NewOrderComponent;