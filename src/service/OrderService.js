export class OrderService {
    static validate(orderInfo, isNovaPoshta, city, department, isInTown, address, setErrors) {
        let tmp = {}

        tmp.lastName = !orderInfo.lastName
        tmp.firstName = !orderInfo.firstName
        tmp.middleName = !orderInfo.middleName

        tmp.deliveryTypeTitle = !orderInfo.deliveryTypeTitle
        tmp.paymentTypeTitle = !orderInfo.paymentTypeTitle

        tmp.email = !(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g).test(orderInfo.email)
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
}