import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import useOrder from "../../../hooks/useOrder";
import {useSnackbarContext} from "../../../context/SnackbarContext";
import {useAuthContext} from "../../../context/AuthContext";

import {fetchUserCart} from "../../../redux/userCartRedux/fetchUserCart";

import cartClasses from "../cart/cart.module.scss";
import orderClasses from "./order.module.scss"

import {ShoppingService} from "../../../service/ShoppingService";
import {OrderService} from "../../../service/OrderService";

import OrderInfo from "./orderInfo";
import AllianceButton from "../../../UI/allianceCupButton/allianceButton";
import CartItem from "../cart/cartItem";

function OrderComponent() {
    const navigate = useNavigate()

    const {isAuth} = useAuthContext()

    const {setMessage, handleClick} = useSnackbarContext()

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
                paymentTypeTitle: orderInfo.paymentTypeTitle,
                delivery: {}
            }
        }

        if (isNovaPoshta) {
            if (city === "" || department === "") {
                handleClick()
                setMessage("Ви не заповнили усі поля")
                return
            }
            makeOrderForm.order.delivery["Місто"] = city.Description
            makeOrderForm.order.delivery["Відділення"] = department.Description
        }
        if (isInTown) {
            if (address === "") {
                handleClick()
                setMessage("Ви не заповнили усі поля")
                return
            }

            makeOrderForm.order.delivery["Адреса"] = address
        }

        makeOrderForm.products = cartProducts.cart

        setDisabled(true)
        ShoppingService.newOrder(makeOrderForm)
            .then((res) => {
                if (res?.status === 200 || res?.status === 201) {
                    navigate("/")
                } else {
                    setMessage(res?.message)
                    handleClick()
                    setDisabled(false)
                }
            })
    }

    return (
        <div className={orderClasses.orderPage}>
            <div className={orderClasses.orderPageInfo}>
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
                <p>Сума замовлення: {cartProducts.sum} грн</p>
            </div>
        </div>
    );
}

export default OrderComponent
