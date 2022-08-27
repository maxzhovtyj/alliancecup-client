import {useContext, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AuthContext} from "../../../context/AuthContext";

import {fetchUserCart} from "../../../redux/userCartRedux/fetchUserCart";

import CartItem from "./cartItem";
import AutoCompleteSelect from "../../../UI/autoCompleteSelect/autoCompleteSelect";
import SimpleSnackbar from "../../../UI/snackbar";

import classes from "./cart.module.scss";
import {FormControl, MenuItem, ThemeProvider} from "@mui/material";
import Button from "@mui/material/Button";

import {
    AllianceInputLabel,
    AllianceSelect,
    AllianceTextField,
    muiTextBtnTheme,
} from "../../../UI/styles";
import {TextMaskCustom} from "../../../utils/TextMask";

import {useSnackbar} from "../../../hooks/useSnackbar";

import {useNavigate} from "react-router-dom";
import {ShoppingService} from "../../../service/ShoppingService";
import {NovaPoshtaService} from "../../../service/NovaPoshtaService";

const NovaOption = "Нова Пошта"
const inTownOption = "Доставка AllianceCup по м. Рівне"

function OrderComponent() {
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
        novaPoshtaCity: false,
        novaPoshtaDepartment: false,
        deliveryAddress: false
    })

    const [disabled, setDisabled] = useState(false)

    const validate = () => {
        let tmp = {}

        tmp.lastName = !orderInfo.lastName
        tmp.firstName = !orderInfo.firstName
        tmp.middleName = !orderInfo.middleName

        tmp.deliveryTypeTitle = !orderInfo.deliveryTypeTitle
        tmp.paymentTypeTitle = !orderInfo.paymentTypeTitle

        tmp.email = !(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g).test(orderInfo.email)
        tmp.phone = orderInfo.phone?.length < 19

        if (isNovaPoshta) {
            tmp.novaPoshtaCity = !city
            tmp.novaPoshtaDepartment = !department
        }
        if (isInTown) {
            tmp.deliveryAddress = !address
        }

        setErrors({
            ...tmp
        })

        return Object.values(tmp).every(value => value === false)
    }

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

    function makeNewOrder() {
        if (!validate(orderInfo, setErrors)) {
            handleClick()
            setMessage("Ви не заповнили потрібні поля")
            return;
        }

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

        ShoppingService.newOrder(makeOrderForm, setMessage, handleClick)
            .then(() => {
                setMessage("Ваше замовлення надіслано")
                handleClick()
                setDisabled(true)
                navigate("/")
            })
    }

    useEffect(() => {
        dispatch(fetchUserCart(isAuth))
    }, [dispatch, isAuth])

    useEffect(() => {
        ShoppingService.fetchDeliveryTypes().then((res) => {
            setDeliveryTypes(res.deliveryTypes)
            setPaymentTypes(res.paymentTypes)
        })
    }, [])

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

    // TODO NOVA POSHTA ORDER CITY AND DEPARTMENT

    return (
        <div className={classes.orderPage}>
            <div className={classes.orderForm}>
                <div className={classes.orderPersonalInfo}>
                    <div className={classes.orderLFM}>
                        <AllianceTextField
                            className={classes.orderField}
                            name={"lastName"}
                            required
                            label="Призвіще"
                            value={orderInfo.lastName}
                            onChange={handleOrderInfo}
                            error={errors.lastName}
                        />
                        <AllianceTextField
                            className={classes.orderField}
                            name={"firstName"}
                            required
                            label="Ім'я"
                            value={orderInfo.firstName}
                            onChange={handleOrderInfo}
                            error={errors.firstName}
                        />
                        <AllianceTextField
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
                        <AllianceTextField
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
                        <AllianceTextField
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
                    <AllianceInputLabel error={errors.deliveryTypeTitle}
                                        id="demo-simple-select-label">Доставка</AllianceInputLabel>
                    <AllianceSelect
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
                    </AllianceSelect>
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
                                error={errors.novaPoshtaCity}
                            />
                            <AutoCompleteSelect
                                label={"Відділення"}
                                width={300}
                                options={departments}
                                value={department}
                                setValue={handleSetDepartmentValue}
                                getOptionLabel={option => option.Description}
                                error={errors.novaPoshtaDepartment}
                            />
                        </div>
                        : ""
                }
                {
                    isInTown
                        ?
                        <div>
                            <AllianceTextField
                                name={"address"}
                                label={"Адреса"}
                                sx={{marginBottom: "1rem", width: "80%"}}
                                onChange={event => setAddress(event.target.value)}
                                error={errors.deliveryAddress}
                            />
                        </div>
                        : ""
                }
                <FormControl className={classes.deliveryForm}>
                    <AllianceInputLabel error={errors.paymentTypeTitle} id="payment-label-id">
                        Спосіб оплати
                    </AllianceInputLabel>
                    <AllianceSelect
                        name={"paymentTypeTitle"}
                        labelId="payment"
                        id="payment-id"
                        label="Спосіб оплати"
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
                    </AllianceSelect>
                </FormControl>
                <AllianceTextField
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
                    <Button disabled={disabled}
                            sx={{marginTop: "1rem"}}
                            color={"alliance"}
                            variant={"outlined"}
                            onClick={makeNewOrder}
                    >
                        Зробити замовлення
                    </Button>
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

export default OrderComponent