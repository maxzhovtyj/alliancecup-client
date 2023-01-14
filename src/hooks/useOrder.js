import {ShoppingService} from "../service/ShoppingService";
import {useEffect, useState} from "react";
import {NovaPoshtaService} from "../service/NovaPoshtaService";

export const NovaOption = "Нова Пошта"
export const inTownOption = "Доставка AllianceCup по м. Рівне"

const useOrder = (setShowDialog) => {
    const [deliveryTypes, setDeliveryTypes] = useState([])
    const [paymentTypes, setPaymentTypes] = useState([])

    const [isNovaPoshta, setIsNovaPoshta] = useState(false)
    const [isInTown, setIsInTown] = useState(false)

    const [cities, setCities] = useState([])
    const [departments, setDepartments] = useState([])

    const [city, setCity] = useState(null)
    const [department, setDepartment] = useState(null)

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
        if (setShowDialog) {
            setShowDialog(true)
        }
    }

    const handleCities = (event) => {
        NovaPoshtaService.getCities(event.target.value).then(res => setCities(res))
        if (setShowDialog) {
            setShowDialog(true)
        }
    }

    const handleDepartments = (cityValueRef) => {
        NovaPoshtaService.getDepartments(cityValueRef).then(res => setDepartments(res))
        if (setShowDialog) {
            setShowDialog(true)
        }
    }

    const handleSetCityValue = (event, newValue) => {
        setDepartment(null)
        setDepartments([])
        setCity(newValue)

        handleDepartments(newValue?.Ref)
        if (setShowDialog) {
            setShowDialog(true)
        }
    }

    const handleSetDepartmentValue = (event, newValue) => {
        setDepartment(newValue)
        if (setShowDialog) {
            setShowDialog(true)
        }
    }

    return [deliveryTypes, paymentTypes, handleOrderInfo, handleCities, handleSetCityValue, handleSetDepartmentValue, orderInfo, isNovaPoshta, isInTown, cities, city, departments, department]
}

export default useOrder;