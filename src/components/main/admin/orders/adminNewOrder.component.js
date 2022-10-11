import classes from './adminOrder.module.scss'
import OrderInfo from "../../orders/orderInfo";
import {ShoppingService} from "../../../../service/ShoppingService";
import {NovaPoshtaService} from "../../../../service/NovaPoshtaService";
import {inTownOption, NovaOption} from "../../orders/order.component";
import {useEffect, useState} from "react";

function AdminNewOrderComponent() {
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
        </div>
    );
}

export default AdminNewOrderComponent;