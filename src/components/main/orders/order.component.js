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
import OrderInfo from "./orderInfo";
import {OrderService} from "../../../service/OrderService";
import AllianceButton from "../../../UI/allianceCupButton/allianceButton";
import useOrder from "../../../hooks/useOrder";

function OrderComponent() {
    const navigate = useNavigate()

    const {isAuth} = useContext(AuthContext)

    const {open, message, handleClose, setMessage, handleClick} = useSnackbar()

    const dispatch = useDispatch()
    const cartProducts = useSelector(state => state.cartPage)

    const [deliveryTypes, paymentTypes, handleOrderInfo, handleCities, handleSetCityValue, handleSetDepartmentValue, orderInfo, isNovaPoshta, isInTown, cities, city, departments, department] = useOrder()

    const [address, setAddress] = useState(null)

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
        dispatch(fetchUserCart())
    }, [dispatch, isAuth])

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

        setDisabled(true)
        ShoppingService.newOrder(makeOrderForm, setMessage, handleClick)
            .then((res) => {
                console.log(res)
                if (res?.status === 200 || res?.status === 201) {
                    setDisabled(true)
                    navigate("/")
                } else {
                    setMessage(res?.message)
                    handleClick()
                }
            })
        setDisabled(false)
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
                    cartProducts?.cart?.map(item => <CartItem product={item} key={item.id} order={true}/>)
                }
                <p className={cartClasses.orderSum}>Сума замовлення: {cartProducts.sum}</p>
            </div>

            <AllianceSnackbar open={open} message={message} handleClose={handleClose}/>
        </div>
    );
}

export default OrderComponent