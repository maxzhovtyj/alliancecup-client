import {useContext, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AuthContext} from "../../../context/AuthContext";

import {fetchUserCart} from "../../../redux/userCartRedux/fetchUserCart";

import CartItem from "../cart/cartItem";
import AllianceSnackbar from "../../../UI/snackbar";

import cartClasses from "../cart/cart.module.scss";
import orderClasses from "./order.module.scss"

import {useSnackbar} from "../../../hooks/useSnackbar";

import {useNavigate} from "react-router-dom";
import {ShoppingService} from "../../../service/ShoppingService";
import {NovaPoshtaService} from "../../../service/NovaPoshtaService";
import OrderInfo from "./orderInfo";
import {OrderService} from "../../../service/OrderService";
import AllianceButton from "../../../UI/allianceCupButton/allianceButton";

export const NovaOption = "Нова Пошта"
export const inTownOption = "Доставка AllianceCup по м. Рівне"

function OrderComponent() {
    const navigate = useNavigate()

    const {isAuth} = useContext(AuthContext)

    const {open, message, handleClose, setMessage, handleClick} = useSnackbar()

    const dispatch = useDispatch()
    const cartProducts = useSelector(state => state.cartPage)

    const [deliveryTypes, setDeliveryTypes] = useState([])

    const [city, setCity] = useState(null)
    const [department, setDepartment] = useState(null)

    const [isInTown, setIsInTown] = useState(false)
    const [isNovaPoshta, setIsNovaPoshta] = useState(false)

    const [paymentTypes, setPaymentTypes] = useState([])

    const [cities, setCities] = useState([])
    const [departments, setDepartments] = useState([])


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

    useEffect(() => {
        dispatch(fetchUserCart(isAuth))
    }, [dispatch, isAuth])

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

    function makeNewOrder() {
        if (!OrderService.validate(orderInfo, isNovaPoshta, city, department, isInTown, address, setErrors)) {
            handleClick()
            setMessage("Ви не заповнили потрібні поля")
            return;
        }

        const makeOrderForm = {
            order: {
                userLastname: orderInfo.lastName,
                userFirstname: orderInfo.firstName,
                userMiddleName: orderInfo.middleName,
                userPhoneNumber: orderInfo.phone,
                userEmail: orderInfo.email,
                sumPrice: cartProducts.sum,
                deliveryTypeTitle: orderInfo.deliveryTypeTitle,
                paymentTypeTitle: orderInfo.paymentTypeTitle
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

    return (
        <div className={orderClasses.orderPage}>
            <div>
                <OrderInfo orderInfo={orderInfo}
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
                <AllianceButton onClick={makeNewOrder} disabled={disabled} mt={"1rem"}>
                    Зробити замовлення
                </AllianceButton>
            </div>
            <div className={cartClasses.productsList}>
                {
                    cartProducts?.cart?.map(item => <CartItem product={item} key={item.productId} order={true}/>)
                }
                <p className={cartClasses.orderSum}>Сума замовлення: {cartProducts.sum}</p>
            </div>

            <AllianceSnackbar open={open} message={message} handleClose={handleClose}/>
        </div>
    );
}

export default OrderComponent